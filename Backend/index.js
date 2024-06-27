import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import ReviewsDAO from "./dao/reviewsDAO.js";

dotenv.config();

const MongoClient = mongodb.MongoClient;
const mongo_username = process.env["MONGO_USERNAME"];
const mongo_password = process.env["MONGO_PASSWORD"];
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@reviewmovie.xftygvp.mongodb.net/?retryWrites=true&w=majority&appName=ReviewMovie`;


const port = 8000;

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50, //berapa orang yang bisa akses database
        wtimeoutMS: 2500, //waktu tunggu
        // useNewUrlParser: true,
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    })
    .then(async client => {
        await ReviewsDAO.injectDB(client);
        app.listen(port, () =>{
            console.log(`listening on port ${port}`);
        })
    })