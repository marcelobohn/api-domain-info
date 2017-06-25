let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = require("chai").expect;

let server = require('../bin/www');

chai.use(chaiHttp);

describe("route", function() {
  describe('/GET /api/umbler.com', () => {
    it('all domain information', (done) => {
      chai.request(server)
        .get('/api/umbler.com')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');

          done();
        });
    });
  });
});
