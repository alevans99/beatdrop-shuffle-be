
/**
 * Score object with test values
 */
const testScoreObject = {}
const testUsers = [
    { score: 70000, user: 'highScorer', userId: '1', timestamp: "2023-01-09T19:00:02.854Z" },
    { score: 60000, user: 'almostThere', userId: '2', timestamp: "2023-01-09T19:00:02.854Z" },
    { score: 50000, user: 'averageJoe', userId: '3', timestamp: "2023-01-09T19:00:02.854Z" },
    { score: 40000, user: 'underPerformer', userId: '4', timestamp: "2023-01-09T19:00:02.854Z" },
    { score: 30000, user: 'leftBehind', userId: '5', timestamp: "2023-01-09T19:00:02.854Z" }
]
for (let i = 0; i < 5; i++) {
    levelScores = {}
    for (let i = 0; i < 5; i++) {
        levelScores[`${i + 1}`] = testUsers[i]
    }
    testScoreObject[`level${i + 1}`] = levelScores
}



module.exports = { testScoreObject }