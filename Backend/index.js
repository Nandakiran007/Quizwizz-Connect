const express = require("express");
const app = express();
const { connectDB } = require("./connection");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const quizRouter = require("./routes/quiz");
const examRouter = require("./routes/exam");
const cors = require("cors");
const errorMiddleware = require("./middlewares/errorMware");
const { loginRestricted } = require("./middlewares/auth");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const MONGODB_URL = process.env.MONGODB_URL;
// console.log(MONGODB_URL);

connectDB(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to mongodb succesfully");
  })
  .catch((err) => {
    console.log(`not connected${err}`);
  });

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("welcome to quizwizz server");
});
app.use("/auth", authRouter);
app.use("/quiz", loginRestricted, quizRouter);
app.use("/exam", loginRestricted, examRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`server started on port:${PORT}`);
});
