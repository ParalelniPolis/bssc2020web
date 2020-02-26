const express = require('express');
const router = express.Router();

/* GET page. */

const pageTitle = 'Code of Conduct';
const hashTitle = '#BSSC20';
const pageDescription = 'Black Swan Security Congress is one of the premier events for hackers, artists, activists, libertarians, and cryptoenthusiasts in Europe.';

router.get('/', (req, res) => {
  return res.render('code_of_conduct', {
    protocol: req.protocol,
    hostname: req.hostname,
    path: req.originalUrl,
    title: pageTitle,
    title_hash: hashTitle,
    description: pageDescription
  });
});

module.exports = router;
