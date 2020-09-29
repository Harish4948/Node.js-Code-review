var express = require('express');
var router = express.Router();
var user = require("./users");
router.get('/', user.index);

router.post('/sqli', user.sqli);

router.get('/login', user.loginpage);

router.post('/login', user.login);

router.get('/dom_xss', user.dom_xss);

router.get('/command_injection', user.command_injection_render);

router.post('/command_injection', user.command_injection);

module.exports = router;
