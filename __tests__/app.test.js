const { connectToMongoDb, closeClient, seedDb } = require('../db/db')
const request = require("supertest");
const app = require("../app");
const { testScoreObject } = require('../db/testScores')

/**
 * Connects to the DB and re-seeds before each test
 */
beforeEach(async () => {
    await connectToMongoDb()
    await seedDb()
})

/**
 * Closes DB connection after each test
 */
afterEach(async () => {
    await closeClient()
});

describe('App.js', () => {

    describe('/', () => {

        describe('GET', () => {
            it('should send a connected message and 200', () => {

                return request(app)
                    .get("/")
                    .expect(200)
                    .then(({
                        body: {
                            message
                        }
                    }) => {

                        expect(message).toBe("Connected to the API")
                    })

            });

            describe('POST/PATCH/DELETE', () => {

                it('should return method not allowed', () => {

                    return request(app)
                        .post(`/`)
                        .expect(405)
                        .then(({
                            body: {
                                message
                            }
                        }) => {

                            expect(message).toEqual("Method Not Allowed")
                        });


                });
            });
        });


    });



    describe('/scores', () => {

        describe('GET', () => {
            it('should send a 200 status and the scores object', () => {

                return request(app)
                    .get("/scores")
                    .expect(200)
                    .then(({
                        body: {
                            scores
                        }
                    }) => {

                        expect(scores).toMatchObject(testScoreObject)
                    })

            });

            describe('POST/PATCH/DELETE', () => {

                it('should return method not allowed', () => {

                    return request(app)
                        .post(`/`)
                        .expect(405)
                        .then(({
                            body: {
                                message
                            }
                        }) => {

                            expect(message).toEqual("Method Not Allowed")
                        });


                });
            });
        });


    });
})