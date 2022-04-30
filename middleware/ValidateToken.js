const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function ValidateToken(req,res,next){
    let token = req.header('x-auth-token');
    let isValid = jwt.verify(token,config.get('JWTSecret'));
    if (isValid){
        console.log('You are Authorised');
        next();
    }
    else if(error) {
        console.log('Not Authorised - '+error);
    }
}