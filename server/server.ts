import { app } from "./app";
import dotenv from "dotenv"
import { connectDB } from "./utils/db";

dotenv.config();

//server Port
const Port = process.env.PORT

app.listen(Port,()=>{
    console.log(`server is connected with ${Port}`);
    connectDB();
})
