const { DateTime } = require('luxon')
const { getDb } = require('../db/db')

/**
 * Finds the single score object
 * @returns The main score object for the game
 */
exports.findScores = async () => {
    const db = getDb()
    return db.collection('scores').findOne({})
}

/**
 * Adds the new high score to the level selected.
 * @param level - The level to update
 * @param newScore - The new score to add
 * @returns The main score object for the game
 */
exports.addNewScore = async (newScore, level) => {

    //Check for input validity
    const acceptedLevels = ['level1', 'level2', 'level3', 'level4', 'level5']
    if (!acceptedLevels.includes(level)) {
        return Promise.reject({ status: 404, message: 'Level Not Found' })

    }

    if (Object.keys(newScore).length !== 4 || !Object.keys(newScore).every((key) => {
        return ['score', 'user', 'userId', 'timestamp'].includes(key)
    })) {
        return Promise.reject({ status: 400, message: 'Invalid Input' })

    }

    //Get existing scores and update
    const db = getDb()
    const existingScores = await db.collection('scores').findOne({})
    const scoresArray = []
    Object.values(existingScores[level]).forEach((value) => {
        scoresArray.push(value)
    })
    scoresArray.push(newScore)
    scoresArray.sort((a, b) => {
        return b.score - a.score
    })
    scoresArray.pop()

    const newLevelObject = {}
    scoresArray.forEach((scoreObject, i) => {
        newLevelObject[i + 1] = scoreObject
    })

    //Update and return with new score object
    const { value: updatedScores } = await db.collection('scores').findOneAndUpdate({ _id: existingScores._id }, { $set: { [level]: newLevelObject } }, { returnDocument: 'after' })
    return updatedScores
}