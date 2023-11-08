import mongoose from "mongoose";
import dotenv from "dotenv";
// const Sequelize = require("sequelize");
import {Sequelize} from "sequelize";

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

export const connectToMysql = async () => {
    try {
        const sequelize = new Sequelize(
            'whereLocate',
            'pabios',
            'pass',
            {
                host: 'localhost',
                dialect: 'mysql'
            }
        );

        sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully.');
        }).catch((error) => {
            console.error('Unable to connect to the database: ', error);
        });
    } catch (error) {
        console.error("Error connecting to mysql: ", error);
    }
}


 // go redis
