const Quiz = require("../models/quiz");
const User = require("../models/user");
const { generateQid } = require("../services/helper");

async function getCreatedQuizzes(req, res, next) {
  let userid = req.params.userid;
  const quizzes = await Quiz.find({ createdBy: userid });
  console.log(quizzes);
  res.status(200).json({ quizzes: quizzes });
}

async function getQuizByid(quidId) {
  const quiz = await Quiz.findOne({ quizid: quidId });
  return quiz;
}

// async function viewQuiz(req,res,next){
//     let quizid = req.params.quizid;
//     let userid=req.body.userid;
//     const quiz=await Quiz.findOne({quizid:quizid})
//     if(!quiz)
//     return res.status(404).json({msg: "No such quiz exists"})
//     if(quiz.createdBy===userid)
//     return res.status(403).json({message:"You are trying to access you "})
//     console.log(quiz)
//     return res.json(quiz);
// }

async function startQuiz(req, res, next) {
  console.log("in start");
  let quizid = req.params.quizid;
  try {
    const updateStatus = await Quiz.updateOne(
      { quizid: quizid },
      {
        $set: {
          isStarted: true,
          isEnded: false,
        },
      }
    );
    if (!updateStatus) {
        const err = new Error();
        err.status = 404;
        err.message = "No such quiz exists";
        throw err;
    }
    const quiz=await getQuizByid(quizid);
    return res.status(200).json({
      message: `opened  the quiz ${quizid} for responses`,
      quiz: quiz,
    });
  } catch (err) {
    next(err);
  }
}

async function createQuiz(req, res, next) {
  console.log(req.body);
  const name = req.body.name;
  var quizid = generateQid();
  const description = req.body.description || "";
  const questions_list = req.body.questions;
  const createdBy = req.user.userid;
  const creatorname = req.user.name;
  const multiple_responses = req.body.multiple_responses || false;
  const nameExist = await Quiz.findOne({ name: name });
  try {
    if (nameExist) {
      const err = new Error();
      err.message = "Quiz name taken try giving some other name...";
      err.status = 400;
      throw err;
    }
  } catch (err) {
    next(err);
  }
  var quizidExist = await Quiz.findOne({ quizid: quizid });
  while (quizidExist) {
    quizid = generateQid();
    console.log("generating quiz id again......");
    quizidExist = await Quiz.findOne({ quizid: quizid });
  }

  try {
    let result = await Quiz.create({
      name,
      quizid,
      description,
      questions_list,
      createdBy,
      creatorname,
      multiple_responses,
    });

    let updation = await User.updateOne(
      { userid: createdBy },
      {
        $push: { created_quizzes: quizid },
      }
    );
  } catch (err) {
    err.status = 400;
    err.extraMessage = "error while adding to database";
    return next(err);
  }
  return res.json({
    quizid: quizid,
    creator: creatorname,
  });
}

async function editQuiz(req, res) {
  let quizid = req.params.quizid;
  const quiz = await Quiz.findOne({ quizid: quizid });
  if (!quiz) return res.status(404).json({ msg: "No such quiz exists" });
  if (req.user.userid === quiz.createdBy) {
    return res.json({ msg: "authenticated to do this job" });
  } else {
    return res.json({ msg: "not authenticated to do this job" });
  }
}

async function deleteQuiz(req, res, next) {
  let quizid = req.params.quizid;
  const quiz = await Quiz.findOne({ quizid: quizid });
  console.log(req.body);
  try {
    if (!quiz) {
      const err = new Error();
      err.status = 404;
      err.message = "No such quiz exists";
      throw err;
    }
    if (req.user.userid === quiz.createdBy) {
      await Quiz.deleteOne({ quizid: quizid });
      return res.status(200).json({ message: "deleted quiz successfully" });
    } else {
      const err = new Error("not authorised to do this job");
      err.status = 401;
      throw err;
    }
  } catch (err) {    
    err.message = "Internal Server Error";
    return next(err);
  }
}

async function publishQuiz(req, res) {
  let quizid = req.params.quizid;
  const quiz = await Quiz.findOne({ quizid: quizid });
  if (!quiz) return res.status(404).json({ msg: "No such quiz exists" });
  if (user.userid !== quiz.createdBy) {
    return res.json({ msg: "You are not authorised" });
  }
  if (quiz.isPublished) {
    return res.json({ msg: "Quiz already Published" });
  }
  //todo:update quiz.ispubished to true
}
async function endQuiz(req, res) {
  console.log("in end");
  let quizid = req.params.quizid;
  try {
    const updateStatus = await Quiz.updateOne(
      { quizid: quizid },
      {
        $set: {
          isStarted: false,
          isEnded: true,
        },
      }
    );
    if (!updateStatus) {
        const err = new Error();
        err.status = 404;
        err.message = "No such quiz exists";
        throw err;
    }
    const quiz = await getQuizByid(quizid);
    return res.status(200).json({
      message: `stopped  the quiz ${quizid} from taking responses`,
      quiz: quiz,
    });
  } catch (err) {
    next(err);
  }
}
module.exports = {
  createQuiz,
  editQuiz,
  deleteQuiz,

  publishQuiz,
  getCreatedQuizzes,
  startQuiz,
  endQuiz,
};
