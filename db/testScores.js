
/**
 * Score object with test values
 */
const testScoreObject = {}
const testUsers = [
    { score: 70000, user: 'highScorer', id: '1' },
    { score: 60000, user: 'almostThere', id: '2' },
    { score: 50000, user: 'averageJoe', id: '3' },
    { score: 40000, user: 'underPerformer', id: '4' },
    { score: 30000, user: 'leftBehind', id: '5' }
]
for (let i = 0; i < 5; i++) {
    levelScores = {}
    for (let i = 0; i < 5; i++) {
        levelScores[`${i + 1}`] = testUsers[i]
    }
    testScoreObject[`level${i + 1}`] = levelScores
}



module.exports = { testScoreObject }