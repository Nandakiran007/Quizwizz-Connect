const Exam = require("../models/exam");
const Quiz = require("../models/quiz");
const User = require("../models/user");
async function getQuiz(req, res, next) {
  // console.log("in get quiz");
  //implement attempted count
  const quizid = req.params.quizid;
  const userid = req.user.userid;
  // const username=req.body.username;
  const quiz = await Quiz.findOne({ quizid: quizid });
  const exam = await Exam.findOne({ userid: userid, quizid: quizid });

  // console.log(`hi${quiz}`)
  // console.log(quizid)
  // console.log("hello")
  //if quiz is completed or not published or quiz not uploaded
  if (!quiz) return res.status(404).json({ message: "No such quiz exists" });
  if (quiz.createdBy === userid)
    return res
      .status(401)
      .json({ message: "you are trying to access your own quiz" });
  if (!quiz.multiple_responses && exam && exam.attempted)
    return res.status(403).json({ message: "already taken the quiz" });
  if (quiz.isEnded) return res.status(400).json({ message: "quiz completed" });
  if (!quiz.isStarted)
    return res.status(400).json({ message: "quiz not accepting responses" });

  return res.json(quiz);
}
//*************************** *//
// if user submits,then
// update quizzes participated in user profile
//update quiz participants in quizdb
//update attempted count in result
//update scores in result
//*************************** *//
async function submitExam(req, res, next) {
  try {
    const quizid = req.params.quizid;
    console.log("in submit exam with quizid:", quizid);

    const quiz = await Quiz.findOne({ quizid: quizid });
    console.log(quiz);
    if (quiz.isEnded)
      return res.status(400).json({ message: "quiz stopped taking responses" });
    const { userid, username, attempted_list } = req.body;
    const questions_list = quiz.questions_list;
    const answer_list = {};
    const marks_list = {};
    let total_marks = 0;
    let total_mcq_marks = 0;
    let scored_marks = 0;
    questions_list.forEach((question, index) => {
      if (question.qtype === "MCQ") {
        answer_list[index] = question.answer;
        marks_list[index] = question.mark;
        total_mcq_marks = total_mcq_marks + question.mark;
        if (answer_list[index] === attempted_list[index]) {
          scored_marks = scored_marks + question.mark;
        }
      }
      total_marks = total_marks + question.mark;
    });
    let non_mcq = true;
    if (total_marks === total_mcq_marks) {
      non_mcq = false;
    }
    let response = await Exam.create({
      userid: userid,
      quizid: quizid,
      username: username,
      attempted_list: attempted_list,
      scored_marks: scored_marks,
      total_mcq_marks: total_mcq_marks,
      total_marks: total_marks,
      non_mcq: non_mcq,
      attempted: true,
    });
    let user_updation = await User.updateOne(
      { userid: userid },
      {
        $push: {
          participated_quizzes: {
            quizid: quizid,
            quizname: quiz.name,
            scored_marks: scored_marks,
            total_marks: total_marks,
            creator: quiz.createdBy,
            creatorname: quiz.creatorname,
          },
        },
      }
    );
    let quiz_updation = await Quiz.updateOne(
      { quizid: quizid },
      {
        $push: {
          participants: userid,
        },
      }
    );

    console.log(answer_list);
    console.log(attempted_list);
    return res.json({
      attempted_list: attempted_list,
      answer_list: answer_list,
      scored_marks: scored_marks,
      total_mcq_marks: total_mcq_marks,
      total_marks: total_marks,
      non_mcq: non_mcq,
    });
  } catch (err) {
    next(err);
  }
}
async function viewResults(req, res, next) {
  const quizid = req.params.quizid;
  const quiz = await Quiz.findOne({ quizid: quizid });
  const result = await Exam.find({ quizid: quizid }).sort({ scored_marks: -1 });
  if (!result) {
    return res.status(404).json({ message: "no one has submitted yet" });
  }
  res.status(200).json({
    quizname: quiz.name,
    creator: quiz.creatorname,
    results: result,
  });
}

module.exports = {
  getQuiz,
  submitExam,
  viewResults,
};
