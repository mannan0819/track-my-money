import { env } from "$env/dynamic/public";
import mongoose from "mongoose";

export const connectDb = async () => {
    const uri = `mongodb+srv://admin:${env.PUBLIC_MONGO_KEY}@cluster0.6oebhvt.mongodb.net/?retryWrites=true&w=majority`;
    return mongoose.connect(uri)
}