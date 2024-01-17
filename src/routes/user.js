import express from "express";
import User from "../models/user.js"
import { sendResponse,sendError } from "../middleware/sendResponce.js";
// import WelcomeMail from "../mail/mail.js";

const router = new express.Router();

router.post("/signup", async (req, res)=>{
    const user = new User(req.body);
    console.log(req.body);
    
    try {
        // await sendSignUpOtp(user);
        const token = await user.generateAuthToken();
        
        // console.log(user.toJSON());
        sendResponse(res, 201, 'signup successful', {
            user,
            token,
        });
        // await WelcomeMail();
        // console.log("mailsent...");
    } catch (e) {
        // logger.info(`${e}`);
        console.log(e);
        sendError(res, 400, 'Email Should be unique', `${e}`);
    }
});

router.post("/login",async (req,res)=>{
    const data = req.body;
    try{
        if(data?.password && data?.address ){
            let user = await User.findByAddress(data.address,data.password);
            if(!user){
                throw new Error("User not found");
            }
            let token = await user.generateAuthToken();

            const loggedInUser=await User.findById(user._id).select("-password");
            const options={
                httpOnly:true,
                secure:true
            }
            return res.status(200).cookie("accessToken",token,options).json({
                status:"succesfull",
                data:{
                    token,userInfo:loggedInUser
                },
                message:"Succesfull Login"
            })
            
        }
    }
    catch(e){console.log(e);}

})





export default router;