var express = require('express');
var UsersController = require('../../controller/controller');
const { response } = require('express');
var passport = require('passport');

const usersController = new UsersController();
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
  home: function (req, res, next) {
    return home(req, res);
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
          return home(req, res);
          // return res.render('home', { message: req.user.username })
          // return renderDashboardView(req, res);
        });
      }
    })(req, res, next);
  },
  isAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      // console.log(req.isAuthenticated())
      return next();
    }
    return res.render('login', { message: "" });
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
    usersController.xxe(req.body.search)
      .then((result) => {
        console.log(result);
        return res.send(result)
      })
      .catch((err) => { console.log(err); return res.send(err); });
  },
  deserialize: function (req, res, next) {
    usersController.deserialize(req.cookies)
      .then((htmlResponse) => {
        return res.render('deserialization', { htmlResponse: htmlResponse });
      }).catch((err) => {
        return res.render('deserialization', { htmlResponse: htmlResponse });
      })
  },
  idor: function (req, res, next) {
    // console.lologing(req.query.id);
    usersController.findUserById(req.query.id)
      .then((htmlResponse) => {
        console.log(htmlResponse);
        res.render('idor', { htmlResponse: htmlResponse });
        // return res.send(htmlResponse);
      }).catch((err) => {
        return res.send('ok');
      })

  },

  change_password_render: function (req, res, next) {
    return res.render('change_password.ejs', { id: req.user.id });
  },
  change_password: function (req, res, next) {
    const creds = { id: req.body.id, password: req.body.password };
    usersController.change_password(creds)
      .then((htmlResponse) => {
        res.send(htmlResponse);
      }).catch((err) => {
        return res.send(err);
      })
  },
  second_order_sqli_register: function (req, res, next) {

    usersController.second_order_sqli_register(req.body)
      .then(() => {
        return res.redirect('/login');
      }).catch((err) => {
        return res.render('second_order_register', { errorMessage: err });
      })
  },
  second_order_sqli_register_render: function (req, res, next) {
    return res.render('second_order_register');

  },

  second_order_sqli: function (req, res, next) {

    usersController.searchByName(req.user.username)
      .then((htmlResponse) => {
        // console.log(htmlResponse);
        return res.render('second_order', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, isGetReq: false, htmlResponse: htmlResponse });
      }).catch((err) => {
        console.log("err : " + err);
        return res.render('second_order', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, isGetReq: false, htmlResponse: "" });
      });
  },


  delete_render: function (req, res, next) {
    if (req.query.id == 12) {
      res.render('delete', { id: req.query.id });
    }
    else {
      res.send("USER ID: " + req.user.id + "NOT AUTHORISED ");
    }
  },


  delete: function (req, res, next) {
    console.log("DELETED");
    res.send('DELETED');
  },

  contactus_render: function (req, res, next) {
    res.render('contactus', { id: req.user.id });
  },

  contactus: function (req, res, next) {
    console.log(req.body);
    params = {
      message: req.body.message,
      id: parseInt(req.body.id, 10)
    };

    usersController.contactus(params)
      .then((result) => {
        return res.send("Thanks for reaching out to us!");
      }).catch((err) => {
        return res.send(err);
      });
  },
  view_contactus: function (req, res, next) {
    if (req.user.id == 12) {
      usersController.view_contactus()
        .then((result) => {
          console.log(result);
          res.render('view_contactus', { htmlResponse: result });
        }).catch((err) => {
          console.log(err);
        });
    }
    else {
      res.send("Not authorised");
    }
  }
};

function home(req, res, next) {

  return res.render('home', { message: req.user.username, id: req.user.id });
}

function login(req) {
  return usersController.login(req);
}
function sqli(req) {

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