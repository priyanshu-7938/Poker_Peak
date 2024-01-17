import mongoose from "mongoose";

const connectDB=async ()=>{
    try {
        const connectionInstance=await mongoose.connect(process.env.MONGO_END_POINT);
        console.log(`\nMONGODB connected !! DB NAME: ${connectionInstance.connection.host}`);
    } 
    catch (error) {
        console.log("MONGODB error occured: ",error);
        process.exit(1);
    }
}

export default connectDB;