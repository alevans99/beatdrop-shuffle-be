const app = require('./app')
const PORT = process.env.PORT || 3000;
const { connectToMongoDb } = require('./db/db')

connectToMongoDb()
    .then(() => {
        app.listen(PORT, 'localhost', () => {
            console.log('Server started at 3000')
        })
    })
    .catch((err) => {
        console.log('Error Connecting To DB', err)
    })
