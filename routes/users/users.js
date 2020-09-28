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


};

function sqli(req) {
  const usersController = new UsersController;
  return usersController.register(req);
}


