var express = require('express');
var router = express.Router();

const { registerA, whoisParse } = require('lib-domain-info');

router.get('/:domain/:type?', async function(req, res, next) {
  let { domain, type } = req.params;
  if (type === undefined) { type = 'all' };

  let rtn = {};

  a = await registerA(domain);
  w = await whoisParse(domain);

  if (type === 'all' || type === 'a') {
    Object.assign(rtn, { registerA: a });
  }

  if (type === 'all' || type === 'ns') {
    Object.assign(rtn, { namesServers: w.nameServer.split(' ') } );
  }

  if (type === 'all' || type === 'w') {
    Object.assign(rtn, { whois: w });
  }

  if (type === 'all' || type === 'h') {
    h = await whoisParse(a.address);
    Object.assign(rtn, { hostName: h.owner });
  }

  res.json(rtn);
});

module.exports = router;
