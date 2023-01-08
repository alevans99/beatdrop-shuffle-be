const { MongoClient } = require('mongodb')
const ENV = process.env.NODE_ENV || 'development';
//Choose .env based on environment
require('dotenv').config({
    path: `${ENV === 'test' ? `${__dirname}/../.env.test` : `${__dirname}/../.env`}`,
});
const { testScoreObject } = require('./testScores')

let client = null
let db = null


/**
 * Connect to the MongoDB client and setup client, db and scoresCollection variables
 */
const connectToMongoDb = async () => {
    client = new MongoClient(process.env.MONGODB_CONNECTION)
    await client.connect()
    db = client.db()

}

/**
 * Return the Db instance
 */
const getDb = () => {
    return db
}

/**
 * Close DB Client connection
 */
const closeClient = async () => {
    await client.close()
}

/**
 * Reseed the DB with the blank data
 */
const seedDb = async () => {
    const db = client.db()
    const scoresCollection = db.collection('scores')

    const exisitingDoc = await scoresCollection.findOne({})
    if (exisitingDoc) {
        await scoresCollection.deleteOne({ _id: exisitingDoc._id })
    }

    await scoresCollection.insertOne(testScoreObject)
}


module.exports = { connectToMongoDb, closeClient, getDb, seedDb }