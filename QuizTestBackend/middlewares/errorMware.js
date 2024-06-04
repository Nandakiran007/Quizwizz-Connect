const errorMiddleware=(error,req,res,next)=>{
    console.log("in error middleware")
    // console.log(error)
    const status=error.status||500;
    const message=error.message||"backend errror";
    const extraDetails=error.extraDetails  || "error from backend";
    console.log(error.message)
    return res.status(status).json({
        message,
        extraDetails
    });
    

}
module.exports=errorMiddleware