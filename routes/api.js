var express = require('express');
var router = express.Router();

const { registerA, namesServers, whoisParse } = require('lib-domain-info');

router.get('/:domain', async function(req, res, next) {
  const { domain } = req.params;
  a = await registerA(domain);
  ns = await namesServers(domain);
  w = await whoisParse(domain);
  hostName = await whoisParse(a.address);
  res.json({ registerA: a, namesServers: ns, whois: w, hostName: hostName });
});

module.exports = router;
