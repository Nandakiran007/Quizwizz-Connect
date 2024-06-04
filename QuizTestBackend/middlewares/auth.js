const {getTokenDetails}=require("../services/jwtToken")
function loginRestricted(req,res,next){
    console.log("in loginRestricted ")
    const userUid=req.cookies?.backend;
    
    console.log(`all cookies :`,req.cookies);
    console.log('Signed Cookies: ', req.signedCookies)
    if(!userUid){ 
        console.log("no userUid ");
        return res.json({msg:"not logged in"});
    } 
    const user=getTokenDetails(userUid);
    
    if(!user){
        console.log("no userUid ");
        return res.json({
            msg:"no user"
        });
    }  
    req.user=user;
    console.log(user);
    next()

}
module.exports={loginRestricted}