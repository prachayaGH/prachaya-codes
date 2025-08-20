import express from "express";
import cors from "cors";
import postRouter from "./route/postRouter.mjs";
import authRouter from "./route/authRouter.mjs";
import cookieParser from "cookie-parser"; 

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://prachaya-codes.vercel.app",
      "https://prachaya-codes-ijvipucob-prachayas-projects-273f8736.vercel.app"
    ],
    credentials: true, // ⬅️ สำคัญมาก
  })
);
app.use(express.json());
app.use("/posts", postRouter);
app.use("/auth", authRouter)

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
