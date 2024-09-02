import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"

const DB_connect = async()=>{
    try {
        const connectioninstance = await mongoose.connect(process.env.DB_URI+'/'+DB_NAME)
        console.log('DB Connected Successfully',connectioninstance.connection.host);
    } 
    catch (error) {
        console.log("An error occured Connecting to DB",error);    
    }
}

export {DB_connect}
