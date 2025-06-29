import express, { Request, Response } from "express";
import { PrismaClient } from "@macrobridge/db";

const app = express();
app.use(express.json())

const client = new PrismaClient();

app.post(
  "/hooks/catch/:userId/:zapId",
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;

    await client.$transaction(async (tx) => {
      const run = await tx.zapRun.create({
        data: {
          zapId,
          metadata: body
        },
      });

      await tx.zapRunOutbox.create({
        data: {
          zapRunId: run.id,
        },
      });
    });

    return res.json({
      message: "Webhook recieved"
    })
  }
);

app.listen(8002, () => {
    console.log("Server is listening on port 8002")
})