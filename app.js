const express = require('express')
require('dotenv').config();
const scoresRouter = require('./routes/scores-router')
const cors = require('cors')
const ENV = process.env.NODE_ENV || 'development'

app = express()
app.use(express.json())

/**
 * CORS
 */
const corsConfig =
    ENV !== 'production'
        ? {
            origin: 'http://localhost:8080',
            optionsSuccessStatus: 200,
        }
        : {}

app.use(cors(corsConfig))

app.use('/', scoresRouter)

app.use('/scores', scoresRouter)

app.all('/*', (req, res) => {
    res.status(404).send({ message: 'Path not found' })
})


module.exports = app