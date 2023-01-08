
/**
 * Score object with blank values
 */
const blankScoreObject = {}
for (let i = 0; i < 5; i++) {
    levelScores = {}
    for (let i = 0; i < 5; i++) {
        levelScores[`${i + 1}`] = { score: 0, user: null, userId: null }
    }
    blankScoreObject[`level${i + 1}`] = levelScores
}

module.exports = { blankScoreObject }