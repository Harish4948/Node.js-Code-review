var express = require('express');
var UsersController = require('../../controller/controller');
const { response } = require('express');
var passport = require('passport');


module.exports =
{

  index: function (req, res, next) {
    res.render('index');
  },
  sqli: function (req, res, next) {
    sqli(req.body).then((resp) => {
      console.log(res);
      return res.send(resp);
    }).catch((err) => {
      // console.log("!!!**LOG OF ERROR RETURNED!!!!");
      console.log(err);
      return res.send(err['sqlMessage']);
    });
    // res.send(res);
  },

  authenticate: function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
      console.log(req.body);
      if (err) {
        return res.render("login", { message: err });
      } else if (!user) {
        return res.render("login", { message: "Invalid username or password!!" });
      } else {
        req.logIn(user, function (err) {
          console.log(err);
          if (err) {
            return res.render("login", { message: "Invalid username or password!!" });
          }
          req.session.ROLE = user.role_id;
          console.log(req.session);
          setProfileCookie(req, res);
          return res.render('login', { message: req.user.username })
          // return renderDashboardView(req, res);
        });
      }
    })(req, res, next);
  },
  isAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      console.log(req.isAuthenticated())
      return next();
    }
    return res.render('index', { message: "" });
  },

  loginpage: function (req, res, next) {
    res.render('login', message = "", user = "");
  },

  login: function (req, res, next) {
    login(req.body).then((resp) => {
      console.log(resp);
      if (resp) {
        // setProfileCookie(req, resp);
        return res.render('login', user = resp);
        // return res.send(resp, message);
      }
    }).catch((err) => {
      // console.log("!!!**LOG OF ERROR RETURNED!!!!");
      console.log(err);
      return res.render('login', user = "");
      // return res.send(err['sqlMessage']);
    });

    // res.send('ok');
  },

  dom_xss: function (req, res, next) {
    console.log(req.body);
    res.render('dom_xss');

  },

  command_injection_render: function (req, res, next) {
    console.log(req.body);
    res.render('command_injection', htmlResponse = "");
  },

  command_injection: function (req, res, next) {
    const usersController = new UsersController();
    const ip = req.body.ip;
    usersController.ping(ip)
      .then((resp) => {

        return res.render('command_injection', htmlResponse = resp);
      })
      .catch((err) => {

        return res.render('command_injection', htmlResponse = err);
      })

  },


  file_read: function (req, res, next) {

    const usersController = new UsersController();
    usersController.file_read(req.query['filename'])
      .then((resp) => {
        return res.render('toc', { htmlResponse: resp });
      })
      .catch((err) => {
        return res.render('toc', { htmlResponse: err });
      })
    // return res.render('toc', htmlResponse = "");

  },
  regex_render: function (req, res, next) {

    // const usersController = new UsersController();
    // console.log(req.data);
    res.render('regex');
  },
  regex: function (req, res, next) {
    // console.log(req.body.email);
    const usersController = new UsersController();
    usersController.regex(req.body)
      .then((result) => {
        console.log(result);
        return res.send(result)
      })
      .catch((err) => { console.log(err); return res.send(err); });

  },

  xxe_render: function (req, res, next) {

    return res.render('xxe', htmlResponse = "");
  },
  xxe: function (req, res, next) {
    // payload="<?xml version="1.0" encoding="ISO-8859-1"?><!DOCTYPE foo [<!ELEMENT user ANY > <!ENTITY xxe SYSTEM "file:///etc/passwd" >]><user>&xxe;</user>";"
    console.log(req.body);
    const usersController = new UsersController();
    usersController.xxe(req.body.search)
      .then((result) => {
        console.log(result);
        return res.send(result)
      })
      .catch((err) => { console.log(err); return res.send(err); });
  }

};
function login(req) {
  const usersController = new UsersController;
  return usersController.login(req);
}
function sqli(req) {
  const usersController = new UsersController;
  return usersController.register(req);
}

function setProfileCookie(req, res) {
  let userCookie = '{"id":"' + req.user.id + '","fullname" : "' + req.user.fullname + '"}';
  let buff = new Buffer(userCookie);
  let base64data = buff.toString('base64');

  res.cookie('user', base64data, {
    maxAge: 900000,
    httpOnly: true
  });
}