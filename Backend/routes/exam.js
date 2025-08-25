const express = require("express");
const router = express();
const { getQuiz, submitExam, viewResults } = require("../controllers/exam");

router.post("/:quizid", getQuiz);

router.post("/submitExam/:quizid", submitExam);

router.get("/results/:quizid", viewResults);
module.exports = router;
