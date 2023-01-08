const { MongoClient } = require('mongodb')
const ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({
    path: `${ENV === 'test' ? `${__dirname}/../.env.test` : `${__dirname}/../.env`}`,
});
const { testScoreObject } = require('./testScores')

const seedDb = async () => {
    let client = null
    let db = null
    let scoresCollection = null
    client = new MongoClient(process.env.MONGODB_CONNECTION)
    await client.connect()
    db = client.db()
    scoresCollection = db.collection('scores')

    const exisitingDoc = await scoresCollection.findOne({})
    if (exisitingDoc) {
        await scoresCollection.deleteOne({ _id: exisitingDoc._id })
    }

    await scoresCollection.insertOne(testScoreObject)

    await client.close()
}



module.exports = { seedDb }