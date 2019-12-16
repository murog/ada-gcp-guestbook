const expect = require('chai').expect;	
const chai = require('chai');	
const chaiHttp = require('chai-http');	
const app = require('../app')

const mockKnex = require('mock-knex');
const tracker = mockKnex.getTracker();
chai.use(chaiHttp);	


describe('get messages', () => {
 
    before(() => {
        tracker.install()
        tracker.on('query', (query) => {
            const results = [
                {
                    name: "Crisco",
                    body: "Northern pikas are most active and mostly feed soon after dawn and as dusk approaches.",
                    stickerUrl: "https://i.pinimg.com/originals/63/b3/49/63b349f74f7f2e498e1ca74c66b829fa.jpg",
                    timestamp: "11-19-2019"
                }
            ];
            query.response(results);
        });
    });	
    after(() => {
        tracker.uninstall()
    })
    it('should load', (done) => {	
        chai.request(app)	
            .get('/messages')	
            .end((err, res) => {	
                const result = res.statusCode;	
                expect(result).to.equal(200)	
                done()	
            });	
    });	
    it('should return messages', (done) => {
        chai.request(app)	
            .get('/messages')	
            .end((err, res) => {	
                const result = res.body;
                expect(result).length.greaterThan(0);	
                result.forEach((message) => {	
                    expect(message).include.keys('name', 'body', 'stickerUrl', 'timestamp')	
                });	
                done()	
            });	
    })
    
    it('should return a sentiment', (done) => {
        chai.request(app)
            .get('/messages')
            .end((err, res) => {
                const result = res.body
                expect(result).length.greaterThan(0)
                expect(result[0].sentiment.score).to.equal(0)
                expect(result[0].sentiment.magnitude).to.equal(0)

            })
            done();
        });
});	

describe('get messages cannot connect', () => {
    before(() => {
        tracker.install()
        tracker.on('query', (query) => {
            query.reject("Could not connect to postgres");
        });
    });	
    after(() => {
        tracker.uninstall()
    })
    it('should return a server error status code', (done) => {	
        chai.request(app)	
            .get('/messages')	
            .end((err, res) => {	
                const result = res.statusCode;	
                expect(result).to.equal(500)	
                done()	
            });	
    });	
    
});	

describe('post messages', () => {	
    describe('invalid message', () => {
        before(() => {
            tracker.install()
            tracker.on('query', (query) => {
                err = Error("null value in column 'name' violates not-null constraint");
                err.routine = "ExecConstraints"
                query.reject(err);
            });
        });	
        after(() => {
            tracker.uninstall()
        });
        it('given empty message, should fail', (done) => {	
            chai.request(app)	
                .post('/messages').send({})	
                .end((err, res) => {	
                    const result = res.statusCode;	
                    expect(result).to.equal(400);	
                    done();	
                });	
        });	
    });
    describe('all other errors', () => {
        before(() => {
            tracker.install()
            tracker.on('query', (query) => {
                query.reject(Error());
            });
        });	
        after(() => {
            tracker.uninstall()
        });
        it('given empty message, should fail', (done) => {	
            chai.request(app)	
                .post('/messages').send({})	
                .end((err, res) => {	
                    const result = res.statusCode;	
                    expect(result).to.equal(500);	
                    done();	
                });	
        });	
    });
    describe('valid message', () => {
        before(() => {
            tracker.install()
            tracker.on('query', (query) => {
                query.response("successfully inserted message into database");
            });
        });	
        after(() => {
            tracker.uninstall()
        });
        it('given valid message, should succeed', (done) => {	
            const testMsg = {
                name: 'test title',
                body: 'test body',
                sticker: 'test sticker'
            }
            chai.request(app)	
                .post('/messages').send(testMsg)	
                .end((err, res) => {	
                    const result = res.statusCode;	
                    expect(result).to.equal(200);	
                    done();	
                });	
        });	
    });
});

describe('get stickers', () => {
    it('should load', (done) => {
        chai.request(app)
            .get('/stickers')
            .end((err, res) => {
                const result = res.statusCode;
                expect(result).to.equal(200)
                done()
            });
    });
    it('should return stickers', (done) => {
        chai.request(app)
            .get('/stickers')
            .end((err, res) => {
                const result = res.body
                expect(result).length.greaterThan(0)
                result.forEach((sticker) => {
                    expect(sticker).include.keys('name', 'url')
                });
                done()
            });
    });
});
