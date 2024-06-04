const express=require("express")
const router=express()
const { getQuiz, submitExam, viewResults } = require("../controllers/exam");
router.get("/",(req,res)=>{
    return res.json({
        msg:"in exam router"
    })
})
router.post("/:quizid",getQuiz);

router.post("/submitExam/:quizid",submitExam)

router.get("/results/:quizid",viewResults)
module.exports=router