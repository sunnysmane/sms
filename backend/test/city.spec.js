process.env.NODE_ENV = "test";
const path = require("path");
require("app-module-path").addPath(path.join(__dirname, "../"));
const chai = require("chai"),
    chaiHttp = require("chai-http"),
    should = chai.should(),
    qs = require("qs"),
    server = require("../server"),
    factory = require('src/factory/city.factory'),
    {readFileSync} = require('fs'),
    to = require('src/utils/promise_handler');

const mongo = require("../databases/mongodb");

chai.use(chaiHttp);

describe("notes", () => {
    let result;
    let mongo_result, _id;
    before(async () => {
        // Before block
        try {
            global.sequelizeModels = null;
            result = await server.init();
            mongo_result = await mongo.init();
            console.log("Server Started :");
            return result;
        } catch (e) {
            console.log("Error in starting server : ", e);
            return e;
        }
    });


    describe("POST /city", () => {
        it("POST /city", done => {
            let options = {
                method: "POST",
                url: `/city`,
                payload: {
                    city: 'Bombay',
                    start_date: '2020-08-12',
                    end_date: '2020-08-18',
                    price: 10,
                    status: 'Yearly',
                    color: '#F00'
                },
                headers: {
                    
                },
            };
            chai
                .request("http://localhost:50004")
                .post(options.url)
                .set(options.headers)
                .send(options.payload)
                .end((err, res) => {

                    _id = JSON.parse(res.text).result._id;
                    res.should.have.status(201);
                    done();
                });
        });
    });

    describe("PUT /city", () => {
        it("PUT /city", done => {
            let options = {
                method: "PUT",
                url: `/city/{id}`.replace(`{id}`.replace(/ /g, ''), `${_id}`),
                payload: {
                    city: 'Mumbai'
                },
                headers: {
                    
                },
            };
            chai
                .request("http://localhost:50004")
                .put(options.url)
                .set(options.headers)
                .send(options.payload)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe("GET /city/{id}", () => {
        it("GET /city/{id}", done => {
            let options = {
                method: "GET",
                url: `/city/{id}`.replace(`{id}`.replace(/ /g, ''), `${_id}`),
                headers: {
                    
                },
            };
            chai
                .request("http://localhost:50004")
                .get(options.url)
                .set(options.headers)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe("GET /city", () => {
        it("GET /city", done => {
            let options = {
                method: "GET",
                url: `/city`,
                headers: {
                    
                },
            };
            chai
                .request("http://localhost:50004")
                .get(options.url)
                .set(options.headers)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe("GET with filters /city", () => {
        it("GET /city", done => {
            let filter = {
                start_date: '2020-08-19',
                end_date: '2020-08-22'
            }
            let options = {
                method: "GET",
                url: `/city?filter=${JSON.stringify(filter)}`,
                headers: {
                    
                },
            };
            chai
                .request("http://localhost:50004")
                .get(options.url)
                .set(options.headers)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe("DELETE /city/{id}", () => {
        it("DELETE /city/{id}", done => {
            let options = {
                method: "GET",
                url: `/city/{id}`.replace(`{id}`.replace(/ /g, ''), `${_id}`),
                headers: {
                    
                },
            };
            chai
                .request("http://localhost:50004")
                .delete(options.url)
                .set(options.headers)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe("DELETE /city/{id}", () => {
        it("DELETE /city/{id}", done => {
            let options = {
                method: "GET",
                url: `/city/123`,
                headers: {
                    
                },
            };
            chai
                .request("http://localhost:50004")
                .get(options.url)
                .set(options.headers)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    // describe("Add Data from JSON to DB", () => {
    //     it("Add Data from JSON to DB", async done => {
    //         let rawData = readFileSync('data.json');
    //         let data = JSON.parse(rawData);
    //         [err, response] = await to(factory.addDataToDB(data));
    //         response.should.have.typeof('object');
    //     });
    // });

    after(async () => {
        // Before block
        try {
            console.log("In after..");
            let mongo_close = await mongo.close();
            result.stop();
            process.exit(0);
        } catch (e) {
            console.log("Error in starting server : ", e);
            return e;
        }
    });
});
