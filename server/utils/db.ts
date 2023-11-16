import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.DATABASE || " ";

export const connectDB =async () => {
    try {
        await mongoose.connect(dbUrl).then( (data:any)=>{
            console.log(`Database is connected with ${data.connection.host}`);
        })
    } catch (error:any) {
        console.log(error.message);
        setTimeout(connectDB, 5000);
    }
}
