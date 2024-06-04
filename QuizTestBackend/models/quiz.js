const mongoose=require("mongoose")

const quizSchema=new mongoose.Schema(
    {
         quizid:{
            type: String,
            required:true,
            unique:true
        },
        name:{
            type: String,
            required:true,
            unique:true
        },
       

        description:{
            type: String
        },
        questions_list:[
            {
                
                question:String,
                options:[],
                qtype: {
                    type: String,
                    enum: ['MCQ', 'SA','LA'],
                    default: 'MCQ'
                },
                answer:{
                    type:String,
                },
                mark:{
                    type:Number,
                    default:1
                }
                
                }
            
        ],
        participants:[], 
        //send marks also along with the answers if custom marks
        createdBy:{
            type:String,
            required:true
        },
        creatorname:{
            type:String
        },
        multiple_responses:{
            type: Boolean,
            default:false

        },

        
        isStarted:{
            type:Boolean,
            default:false
        },
        isEnded:{
            type:Boolean,
            default:false
        }
       
    }
)

const Quiz=mongoose.model( "Quiz",quizSchema);
module.exports=Quiz;