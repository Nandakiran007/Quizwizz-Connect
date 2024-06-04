const jwt=require("jsonwebtoken")
const SECRET="wakand@forever"
function createToken(payload){
    return jwt.sign(payload,SECRET);
}
function getTokenDetails(token){
    if(!token) return null;
    try{
     return jwt.verify(token,SECRET)
    }catch(err){
        return null;
    }

}
module.exports={
    createToken,
    getTokenDetails
}