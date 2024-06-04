const express=require("express")
const router=express()
const  {createQuiz,editQuiz,deleteQuiz,publishQuiz,endQuiz,getCreatedQuizzes,startQuiz}=require("../controllers/quiz")
router.get("/",(req,res)=>{
    return res.json({
        msg:"in quiz router",
        user:req.user
    })
})

//TODO: create a middle to check authorization

//create quiz
router.post("/",createQuiz)

//router.get("/:quizid",viewQuiz)
//router.get("/joined",getJoinedQuizzes)
router.get("/created/:userid",getCreatedQuizzes)

router.patch("/:quizid",editQuiz)

router.post("/delete/:quizid",deleteQuiz)

router.patch("/start/:quizid",startQuiz)
router.patch("/end/:quizid",endQuiz)

//outer.get("/rankings/:quizid",(req,res)=>{console.log("still need to implement")})

//router.post("/quiz/stop/:id",stopQuiz)

module.exports=router;