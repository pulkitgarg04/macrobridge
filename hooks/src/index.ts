import express, { RequestHandler } from "express";
import prisma from "./db";

const app = express();
app.use(express.json());

const webhookHandler: RequestHandler = async (req, res) => {
  try {
    const { userId, zapId } = req.params as { userId: string; zapId: string };
    const body = req.body;

    await prisma.$transaction(async (tx) => {
      const run = await tx.zapRun.create({
        data: {
          zapId,
          metadata: body,
        },
      });

      await tx.zapRunOutbox.create({
        data: {
          zapRunId: run.id,
        },
      });
    });

    res.json({
      message: "Webhook received",
    });
  } catch (error) {
    console.error("Error handling webhook:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

app.post("/hooks/catch/:userId/:zapId", webhookHandler);

app.listen(8002, () => {
  console.log("Server is listening on port 8002");
});