import mongoose, { mongo } from "mongoose";

const connnectDB=async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`MongoDB Connected: ${conn.connection.host} port:${conn.connection.port}`);
    } catch (error) {
        console.error(`MongoDB Connection Error:${error.message}`);
        process.exit(1);
    }
}

export default connnectDB;