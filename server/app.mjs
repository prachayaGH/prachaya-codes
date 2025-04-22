import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/profiles", (req, res) => {
  try {
    return res.status(200).json({
      data: {
        name: "John",
        age: 20,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
