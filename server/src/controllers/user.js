
import User from "../models/user.js"
import { sendResponse,sendError } from "../middleware/sendResponce.js";

const handelSignupForUser = async (req, res)=>{
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
}

const handelLoginForUser = async (req,res)=>{
    const data = req.body;
    try{
        if(data?.password && data?.address ){
            let user = await User.findByAddress(data.address,data.password);
            if(!user){
                throw new Error("User not found");
            }
            let token = await user.generateAuthToken();

            const loggedInUser=await User.findById(user._id);

            const obj = loggedInUser.toObject();
            delete obj.password;
            delete obj.otp;
            delete obj.address;
            const options={
                httpOnly:true,
                secure:true
            }
            return res.status(200).cookie("accessToken",token,options).json({
                status:"succesfull",
                data:{
                    token,userInfo:obj
                },
                message:"Succesfull Login"
            })
            
        }
    }
    catch(e){console.log(e);}
}

export {
    handelLoginForUser,
    handelSignupForUser,
}