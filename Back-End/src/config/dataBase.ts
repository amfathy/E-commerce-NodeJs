import mongoose  from "mongoose";

const connectDB = async()=>{
    try
    {
    await mongoose.connect('mongodb://127.0.0.1:27017/E-commerce')
    console.log('database connected');
    }catch(err){
        if (err instanceof Error) {
            console.log(err.message);
        } else {
            console.log('An unknown error occurred');
        }
    }
}
export default connectDB;