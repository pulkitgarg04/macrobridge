import express from "express";
import userRouter from "./router/user";
import zapRouter from "./router/zap";
import triggerRouter from "./router/trigger";
import actionRouter from "./router/action";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cors({
  origin: "https://macrobridge.vercel.app",
  credentials: true,
}));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send({
    message: "Hi There! Welcome to Marcobridge",
  });
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/zap", zapRouter);
app.use("/api/v1/trigger", triggerRouter);
app.use("/api/v1/action", actionRouter);

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong in the server!" });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
