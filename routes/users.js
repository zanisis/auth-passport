var express = require('express');
var router = express.Router();
const controller = require('../controller/controller');

/* GET users listing. */
router.get('/findall', controller.findall);

module.exports = router;
