const { findScores } = require("../models/scores-model")

/**
 * Gets the main score object and returns with a 200 status
 */
exports.getScores = async (req, res, next) => {
    try {
        const scores = await findScores()
        res.status(200).send({ scores })

    } catch (error) {
        console.log(error)
    }

}