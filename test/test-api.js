let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = require("chai").expect;

let server = require('../bin/www');

chai.use(chaiHttp);

describe("route", function() {
  describe('/GET /api/umbler.com', () => {
    it.only('all domain information', (done) => {
      chai.request(server)
        .get('/api/umbler.com')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys(['registerA', 'namesServers', 'whois', 'hostName']);
          done();
        });
    });

    it('register A of domain', (done) => {
      chai.request(server)
        .get('/api/umbler.com/a')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys(['registerA']);
          expect(res.body).to.not.include.keys(['namesServers', 'whois', 'hostName']);
          done();
        });
    });

    it('names servers of domain', (done) => {
      chai.request(server)
        .get('/api/umbler.com/ns')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys(['namesServers']);
          expect(res.body).to.not.include.keys(['registerA', 'whois', 'hostName']);
          done();
        });
    });

    it('whois of domain', (done) => {
      chai.request(server)
        .get('/api/umbler.com/w')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys(['whois']);
          expect(res.body).to.not.include.keys(['registerA', 'namesServers', 'hostName']);
          done();
        });
    });

    it('host name of domain', (done) => {
      chai.request(server)
        .get('/api/umbler.com/h')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys(['hostName']);
          expect(res.body).to.not.include.keys(['registerA', 'namesServers', 'whois']);
          done();
        });
    });
  });
});
