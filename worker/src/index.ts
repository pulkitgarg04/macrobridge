require("dotenv").config();

import prisma from "./utils/db";
import { Kafka } from "kafkajs";
import { JsonObject } from "../generated/prisma/runtime/library";
import { parse } from "./parser";

import { TOPIC_NAME } from "./constants";
import { sendEmail } from "./email";
import { sendSol } from "./solana";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

async function main() {
  const consumer = kafka.consumer({ groupId: "main-worker" });
  await consumer.connect();
  const producer = kafka.producer();
  await producer.connect();

  await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });

      const value = message.value?.toString();
      if (!value) {
        console.warn("No value found");
        await consumer.commitOffsets([
          { topic, partition, offset: message.offset },
        ]);
        return;
      }

      let parsedValue;
      try {
        parsedValue = JSON.parse(value);
      } catch (err) {
        console.warn("Invalid JSON in message!");
        await consumer.commitOffsets([
          { topic, partition, offset: message.offset },
        ]);
        return;
      }

      const zapRunId = parsedValue.zapRunId;
      const stage = parsedValue.stage;

      if (!zapRunId || typeof stage !== "number") {
        console.warn("Missing zapRunId or stage!");
        await consumer.commitOffsets([
          { topic, partition, offset: message.offset },
        ]);
        return;
      }

      const zapRun = await prisma.zapRun.findUnique({
        where: {
          id: zapRunId,
        },
        include: {
          zap: {
            include: {
              actions: { include: { type: true } },
            },
          },
        },
      });

      if (!zapRun?.zap?.actions) {
        console.warn(`No zap or actions found for zapRunId ${zapRunId}`);
        await consumer.commitOffsets([
          { topic, partition, offset: message.offset },
        ]);
        return;
      }

      const currentAction = zapRun.zap.actions.find(
        (x) => x.sortingOrder === stage
      );
      if (!currentAction) {
        console.warn(`No action found at stage ${stage}`);
        await consumer.commitOffsets([
          { topic, partition, offset: message.offset },
        ]);
        return;
      }

      const zapRunMetadata = zapRun.metadata;

      console.log("Action type: ", currentAction.type.name);

      try {
        if (currentAction.type.name === "SendEmail") {
          console.log("working");
          const body = parse(
            (currentAction.metadata as JsonObject)?.body as string,
            zapRunMetadata
          );
          const to = parse(
            (currentAction.metadata as JsonObject)?.email as string,
            zapRunMetadata
          );
          if (!to || !body) throw new Error("Invalid email action fields");

          await sendEmail(to, body);
        }

        if (currentAction.type.name === "SendSol") {
          const amount = parse(
            (currentAction.metadata as JsonObject)?.amount as string,
            zapRunMetadata
          );
          const to = parse(
            (currentAction.metadata as JsonObject)?.to as string,
            zapRunMetadata
          );
          if (!to || !amount) throw new Error("Invalid solana action fields");

          await sendSol(to, amount);
        }
      } catch (err) {
        console.error("Error processing action:", err);
        await consumer.commitOffsets([
          { topic, partition, offset: message.offset },
        ]);
        return;
      }

      await new Promise((r) => setTimeout(r, 500));

      const lastStage = (zapRun.zap.actions.length || 1) - 1;
      if (stage < lastStage) {
        await producer.send({
          topic,
          messages: [
            {
              value: JSON.stringify({
                zapRunId,
                stage: stage + 1,
              }),
            },
          ],
        });
      }

      await consumer.commitOffsets([
        { topic, partition, offset: message.offset },
      ]);
    },
  });
}

main().catch(console.error);
