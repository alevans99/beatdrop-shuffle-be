const { findScores, addNewScore } = require("../models/scores-model")

/**
 * Gets the main score object and returns with a 200 status
 */
exports.getScores = async (req, res, next) => {
    try {
        const scores = await findScores()
        res.status(200).send({ scores })

    } catch (error) {
        next(error)
    }

}

/**
 * Gets the main score object and returns with a 200 status
 */
exports.postScore = async (req, res, next) => {
    try {
        const { newScore } = req.body
        const { level } = req.params
        const updatedScores = await addNewScore(newScore, level)
        res.status(201).send({ updatedScores })


    } catch (error) {
        next(error)
    }

}