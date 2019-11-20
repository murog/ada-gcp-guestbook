const expect = require('chai').expect;	
const chai = require('chai');	
const chaiHttp = require('chai-http');	
const app = require('../app')	

chai.use(chaiHttp);	

describe('get messages', () => {	
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
                const result = res.body	
                expect(result).length.greaterThan(0)	
                result.forEach((message) => {	
                    expect(message).include.keys('name', 'body')	
                });	
                done()	
            });	
    }) 	
});	

describe('post messages', () => {	
    it('given empty message, should fail', (done) => {	
        chai.request(app)	
            .post('/messages').send({})	
            .end((err, res) => {	
                const result = res.statusCode;	
                expect(result).to.equal(400);	
                done();	
            });	
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