import express from "express";

// express.Router() returns router object which is mini-application in itself and can perform 
// middleware and http route methods
const router = express.Router();

//Basically router.param() function triggers the callback function whenever user routes 
//to the parameter. This callback function will be called for only single time in 
//request response cycle, even if user routes to the parameter multiple times.
router.param('userId',async(req,res,next,userid)=>{
    try{
        let user = await User.findById(userid);
        req.profile = user;
        console.log("This will be called once before route method func whenever routes will have parameter - userid")
        next();
    }
    catch(error){
        console.log(error)

    }
});

// here /signin - route path, verifyCred - middleware to verify userId and password, 
// signup is controller method to process request and send response
// A middleware function have access to req, res object and next function. 
// They can perform - 1) execute any code 2) make changes in req and res object 
// 3) End the req-res cycle 4) Call the next middleware in the stack
// Middleware gets executed between server receive request and controller send response back
const verifyCred = (req,res,next)=>{
    if(req.body.password.length > 8){
        //verify with jwt token
        next();     //pass to next middleware or to callback func of http method
    }else{
        // can send response without passing to next middleware or callback fn of http method
        return res.json({
            error:"Password must be more than 8 characters"
        })
    }
}

const signup = async(req,res) =>{
    try{
        let user = await User.create(req.body);
        return res.json({
            message:"Sign up Successful"
        })
    }catch(error){
        return res.json({
            message:"Error in creating User"
        })
    }
}

// here middlware will be called only for this route
router.post('/signin', verifyCred, signup);

router.get('/login/:userId',(req,res)=>{
    res.send('login success, after param callback fn')
})

// export this router object
export default router;