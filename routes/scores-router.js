const router = require('express').Router()
const { getScores } = require('../controllers/scores-controller')

router
    .route('/')
    .get(async (req, res, next) => {
        res.status(200).send({ "message": "Connected to the API" })
    })
    .all(async (req, res, next) => {
        res.status(405).send({
            message: 'Method Not Allowed'
        })
    })

router
    .route('/scores')
    .get(getScores)
    .all(async (req, res, next) => {
        res.status(405).send({
            message: 'Method Not Allowed'
        })
    })




module.exports = router