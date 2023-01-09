const router = require('express').Router()
const { handleMethodNotAllowed } = require('../controllers/errorsController')
const { getScores, postScore } = require('../controllers/scores-controller')

router
    .route('/')
    .get(async (req, res, next) => {
        res.status(200).send({ "message": "Connected to the API" })
    })
    .all(handleMethodNotAllowed)

router
    .route('/scores')
    .get(getScores)
    .all(handleMethodNotAllowed)


router
    .route('/scores/:level')
    .post(postScore)
    .all(handleMethodNotAllowed)





module.exports = router