const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
let Schema = mongoose.Schema;
const apiRouter = require('express').Router()

const app = express()
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


app.listen(3000, 'localhost', () => {
    console.log('Server started at 3000')
})

