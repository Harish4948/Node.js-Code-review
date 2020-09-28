var express = require('express');
var router = express.Router();
var UsersController = require('../../controller/controller');

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
  }


  loginpage: function (req, res, next) {
    res.render('login', message = "", user = "");
  },

  login: function (req, res, next) {
    login(req.body).then((resp) => {
      console.log(resp);
      if (resp) {
        setProfileCookie(req, resp);
        return res.render('login', user = resp);
        // return res.send(resp, message);
      }
    }).catch((err) => {
      // console.log("!!!**LOG OF ERROR RETURNED!!!!");
      console.log(err);
      res.render('login', user = "");
      // return res.send(err['sqlMessage']);
    });

    // res.send('ok');
  }


};

function sqli(req) {
  const usersController = new UsersController;
  return usersController.register(req);
}


