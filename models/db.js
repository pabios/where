import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose.set('strictQuery', true);

export const connectToMongo = async () => {
    try {
        await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/intranet`, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log('Connection etablit ')
        return mongoose.connection;
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error);
    }
}
