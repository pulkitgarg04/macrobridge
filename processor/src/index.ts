import { Kafka } from "kafkajs";
import prisma from "./db";
import { TOPIC_NAME } from "./constants";

const kafka = new Kafka({
    clientId: "outbox-processor",
    brokers: ["localhost:9092"]
});

async function main() {
    const producer = kafka.producer();
    await producer.connect();

    while (1) {
        const pendingRows = await prisma.zapRunOutbox.findMany({
          where: {},
          take: 10,
        });
    
        pendingRows.forEach((r) => {
          producer.send({
            topic: TOPIC_NAME,
            messages: pendingRows.map((r) => ({
              value: JSON.stringify({ zapRunId: r.zapRunId, stage: 0})
            })),
          });
        });
    
        await prisma.zapRunOutbox.deleteMany({
            where: {
                id: {
                    in: pendingRows.map(r => r.id)
                }
            }
        })
      }
}