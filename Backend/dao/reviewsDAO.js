//Untuk connect ke database

import { parse } from "dotenv";
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
    static async injectDB(conn){
        if(reviews){
            return;
        }
        try{
            reviews = await conn.db("reviews").collection("reviews");
        } catch (e){
            console.error(`Unable to establish collection handles in userDAO: ${e}`);
        }
    }

    static async addReview(movieId, user, review){
        try{
            const reviewDoc = {
                movieid: movieId, 
                user: user, 
                review: review, 
            };

            return await reviews.insertOne(reviewDoc); //Mongodb comment untuk memasukan dokumen ke dalam database, insertOne
        }catch (e){
            console.error(`Unable to post review: ${e}`);
            return {error: e};
        }
    }

    static async getReview(reviewId){
        try{
            return await reviews.findOne({_id: ObjectId(reviewId)});
        } catch (e){
            console.error(`Unable to get review: ${e}`);
            return {error: e};
        }
    }

    static async updateReview(reviewId, user, review){
        console.log("rev", reviewId);
        try{
            const updateResponse = await reviews.updateOne(
                {user: user, _id: ObjectId(reviewId)},
                {$set: {review: review}},
            );

            return updateResponse;
        } catch (e){
            console.error(`Unable to update review: ${e}`);
            return {error: e};
        }
    }

    static async deleteReview(reviewId, user){
        try{
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectId(reviewId),
                user: user,
            });

            return deleteResponse;
        } catch (e){
            console.error(`Unable to delete review: ${e}`);
            return {error: e};
        }
    }

    static async getReviewsByMovieId(movieId){ 
        console.log("mov", movieId);
        try{
            const cursor =  await reviews.find({movieid: parseInt(movieId)});
            return cursor.toArray();
        } catch (e){
            console.error(`Unable to get reviews: ${e}`);
            return {error: e};
        }
    }
}