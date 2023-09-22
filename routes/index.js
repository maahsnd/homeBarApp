const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('login');
});

router.post('/', function (req, res) {
  const password = req.body.password;
  if (password === process.env.ACCESSPASSWORD) {
    res.redirect('/inventory');
  } else {
    res.render('login', { error: 'Access denied' });
  }
});

module.exports = router;
