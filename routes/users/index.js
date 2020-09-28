var express = require('express');
var router = express.Router();
var user = require("./users");
router.get('/', user.index);

router.post('/sqli', user.sqli);

module.exports = router;
