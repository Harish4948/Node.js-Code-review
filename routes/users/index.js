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

router.get('/file_read', user.file_read);

router.get('/regex', user.regex_render);

router.post('/regex', user.regex);

router.get('/xxe', user.xxe_render);

router.post('/xxe', user.xxe);

module.exports = router;
