const User = require("../models/user");
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
    console.log("in the catch block");
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
    console.log(`error while adding ${err}`);
    const status = 500;
    const message = `Error in Mongo DB while creation ${name}`;

    const error = {
      status,
      message,
    };
    console.log(error);
    console.log(error.status);
    return next(error);
  }
}

async function handleLogin(req, res, next) {
  const { email, password } = req.body;

  //check  email if already exits

  const user = await User.findOne({ email, password });
  // console.log(payload)
  try {
    if (!user) {
      const error = new Error();
      error.status = 400;
      error.message = "Invalid Credentials";
      throw error;
    }
  } catch (error) {
    return next(error);
  }
  console.log(user.name);
  const payload = {
      name: user.name,
      userid: user.userid,
      email: user.email,
      participated_quizzes: user.participated_quizzes,
      created_quizzes: user.created_quizzes,
  };

  const token = createToken(payload);
  res.cookie("backend", token);
  return res.status(200).json({
    message: "Logged In Successfully",
    token: token,
    user: payload,
  });
}

async function getUser(req,res,next){
  const userid=req.params.userid;
  let user;
  try{
    user = await User.findOne({ userid:userid });
    if(!user){
      const err = new Error("No such user");
      err.status=404;
      throw err;
    }
    console.log("in get user")

  }catch(err){
    return next(err);
  }
  return res.status(200).json({
      userid: user.userid,
      name: user.name,
      email: user.email,
      created_quizzes: user.created_quizzes,
      participated_quizzes: user.participated_quizzes,
  });

}

module.exports = {
    handleSignUp,
    handleLogin,
    getUser,
};
