const express = require("express");
const router = express();
const { getQuiz, submitExam, viewResults } = require("../controllers/exam");

router.get("/:quizid", getQuiz);

router.post("/submitExam/:quizid", submitExam);

router.get("/results/:quizid", viewResults);
module.exports = router;
