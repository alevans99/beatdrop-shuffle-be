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

                it('should return method not allowed', () => {

                    return request(app)
                        .patch(`/`)
                        .expect(405)
                        .then(({
                            body: {
                                message
                            }
                        }) => {

                            expect(message).toEqual("Method Not Allowed")
                        });


                });


                it('should return method not allowed', () => {

                    return request(app)
                        .delete(`/`)
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
                        .post(`/scores`)
                        .expect(405)
                        .then(({
                            body: {
                                message
                            }
                        }) => {

                            expect(message).toEqual("Method Not Allowed")
                        });


                });

                it('should return method not allowed', () => {

                    return request(app)
                        .patch(`/scores`)
                        .expect(405)
                        .then(({
                            body: {
                                message
                            }
                        }) => {

                            expect(message).toEqual("Method Not Allowed")
                        });


                });


                it('should return method not allowed', () => {

                    return request(app)
                        .delete(`/scores`)
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



    describe('/scores/:level', () => {

        describe('POST', () => {
            it('should send a 201 status and the updated scores object', () => {

                return request(app)
                    .post("/scores/level1")
                    .send({
                        "newScore": {
                            "user": "testUser",
                            "score": 100000,
                            "userId": "12345",
                            "timestamp": "2023-01-09T19:00:02.854Z"
                        },
                    })
                    .expect(201)
                    .then(({
                        body: {
                            updatedScores
                        }
                    }) => {

                        expect(updatedScores['level1']['1']).toMatchObject({
                            "user": "testUser",
                            "score": 100000,
                            "userId": "12345",
                            "timestamp": "2023-01-09T19:00:02.854Z"
                        })
                    })

            });

            it('should send a 404 status when provided with an incorrect level name', () => {

                return request(app)
                    .post("/scores/wrong")
                    .send({
                        "newScore": {
                            "user": "testUser",
                            "score": 100000,
                            "userId": "12345",
                            "timestamp": "2023-01-09T19:00:02.854Z"
                        },
                    })
                    .expect(404)
                    .then(({
                        body: {
                            message
                        }
                    }) => {

                        expect(message).toBe('Level Not Found')
                    })

            });


            it('should send a 400 status when incorrect score properties are provided', () => {

                return request(app)
                    .post("/scores/level1")
                    .send({
                        "newScore": {
                            "user": "testUser",
                            "userId": "12345",
                            "timestamp": "2023-01-09T19:00:02.854Z"
                        },
                    })
                    .expect(400)
                    .then(({
                        body: {
                            message
                        }
                    }) => {

                        expect(message).toBe('Invalid Input')
                    })

            });

            describe('GET/PATCH/DELETE', () => {

                it('should return method not allowed', () => {

                    return request(app)
                        .get(`/scores/level1`)
                        .expect(405)
                        .then(({
                            body: {
                                message
                            }
                        }) => {

                            expect(message).toEqual("Method Not Allowed")
                        });


                });

                it('should return method not allowed', () => {

                    return request(app)
                        .patch(`/scores/level1`)
                        .expect(405)
                        .then(({
                            body: {
                                message
                            }
                        }) => {

                            expect(message).toEqual("Method Not Allowed")
                        });


                });

                it('should return method not allowed', () => {

                    return request(app)
                        .delete(`/scores/level1`)
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