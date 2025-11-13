const User = require("../models/user");
const Quiz=require("../models/quiz");
const Exam = require("../models/exam");

const { createToken } = require("../services/jwtToken");
async function handleSignUp(req, res, next) {
    const { name, userid, email, password } = req.body;
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            console.log("user mail exist check");
            const error = new Error();
            error.status = 400;
            error.message = "Email had already been registered";
            throw error;
        }
        console.log(email);
        //check  user if already exits
        const useridExist = await User.findOne({ userid: userid });
        if (useridExist) {
            console.log("user id exist check");
            const error = new Error();
            error.status = 400;
            error.message = "User id already taken";
            throw error;
        }
        console.log(userid);
    } catch (err) {
        return next(err);
    }

    try {
        await User.create({
            name,
            userid,
            email,
            password,
        });
        const payload = {
            name,
            userid,
            email,
        };

        const token = createToken(payload);
        return res.status(201).json({
            message: `registered successfully for ${name}`,
            token: token,
        });
    } catch (err) {
        err.message = "Internal Server Error";
        return next(err);
    }
}

async function handleLogin(req, res, next) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });

        if (!user) {
            const error = new Error();
            error.status = 400;
            error.message = "Invalid Credentials";
            throw error;
        }

        console.log("logged in:", user.name);
        const payload = {
            name: user.name,
            userid: user.userid,
            email: user.email,
        };
        const token = createToken(payload);
        return res.status(200).json({
            message: "Logged In Successfully",
            token: token,
            name: user.name,
        });
    } catch (error) {
        return next(error);
    }
}

async function getUser(req, res, next) {
    const userid = req.user.userid;
    console.log("in get user controller");
    let user;
    try {
        user =await fetchUser(userid);
        console.log(user);
        if (!user) {
            const err = new Error("No such user");
            err.status = 404;
            throw err;
        }
        console.log("in get user");
    } catch (err) {
        return next(err);
    }
    return res.status(200).json(user);
}


async function fetchUser(userId){
  const user = await User.findOne({ userid: userId });
  const created_quizzes = await Quiz.aggregate([
      { $match: { createdBy: userId } },
      {
          $project: {
              _id: 0,
              quizid: 1,
              name: 1,
              isEnded: 1,
              isStarted: 1,
              participantsCount: { $size: "$participants" },
              questionsCount: { $size: "$questions_list" },
          },
      },
  ]);
  const participated_quizzes = await Exam.aggregate([
      { $match: { userid: userId } },
      {
          $lookup: {
              from: "quizzes", // name of the Quiz collection
              localField: "quizid", // field in Exam
              foreignField: "quizid", // field in Quiz
              as: "quizDetails",
          },
      },
      { $unwind: "$quizDetails" },
      {
          $project: {
              _id: 0,
              quizid: 1,
              scored_marks: 1,
              total_marks: 1,
              quizname: "$quizDetails.name",
              creatorname: "$quizDetails.creatorname",
          },
      },
  ]);
  return {
      userid: user.userid,
      name: user.name,
      email: user.email,
      created_quizzes,
      participated_quizzes,
  };

}

module.exports = {
    handleSignUp,
    handleLogin,
    getUser,
};
