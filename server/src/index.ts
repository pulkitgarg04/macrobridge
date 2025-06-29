import express from "express";
import userRouter from "./router/user";
import zapRouter from "./router/zap";
import triggerRouter from "./router/trigger";
import actionRouter from "./router/action";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send({
        "message": "Hi There! Welcome to Marcobridge"
    })
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/zap", zapRouter);
app.use("/api/v1/trigger", triggerRouter);
app.use("/api/v1/action", actionRouter);

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}

export { app };