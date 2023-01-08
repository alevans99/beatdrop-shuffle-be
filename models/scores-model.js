const { getDb } = require('../db/db')

/**
 * Finds the single score object
 * @returns The main score object for the game
 */
exports.findScores = async () => {
    const db = getDb()
    return db.collection('scores').findOne({})
}