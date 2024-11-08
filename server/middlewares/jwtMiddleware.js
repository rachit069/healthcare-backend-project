const jwt = require("jsonwebtoken");


//After successful regester of user, and then calling the login endpoint with the already regestered user, It will create and return JWT Token
const generateJwtToken = (userData) => {

  return jwt.sign(userData, process.env.PRIVATE_KEY, {expiresIn:400000});
}

//After login, we are getting the token, and for validating the JWT Token, that it is correct or not,, we will proceed with secure routes, to GET/POST/UPDATE/DELETE.
const validateJwtToken = (req, res, next) => {
  // we are checking that token is available or not in request headers
  const tokenCheck = req.headers.authorization;

  // option 1 = request header token, authorization not sent (doesn't exist)
  if(!tokenCheck){
    return res.status(401).json({err:"token not available"});
  }

  // option 2 = req headers token , agetting token but not in a right format :
  // Authorization: BASIC/ BEARER
  // BASIC AUTH btoa(USERNAME, PASSWORD) -> BASIC hfdiuhdshfds
  // BEARER fdihushiufdshisdoisadsa
  const token = req.headers.authorization.split(' ')[1];
  if(!token){
    return res.status(401).json({err:"Invalid token"})}
  try{
    const validateToken = jwt.verify(process.env.PRIVATE_KEY);
    req.user = validateJwtToken;
    next();
  }
  catch(err){
    return res.status(401).json({err,message});
  }

}


module.exports = {generateJwtToken, validateJwtToken};