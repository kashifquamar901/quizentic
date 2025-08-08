import mongoose from "mongoose"

export const connectDB = async () => {
try {
        mongoose.connect(`${process.env.MONGODB_CONNECTION_STRING}`)
        console.log(`MongoDB Connect`);
        
} catch (error) {
    console.log(error);
    console.log(`MongoDB Connection Failed`);
    
    process.exit(1)
    
}
}