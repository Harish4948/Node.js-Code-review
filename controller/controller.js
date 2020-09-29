var UsersModel = require("../model/userModel");


class UsersController {
    constructor() {
        this.usersModel = new UsersModel();
    }

    register(parameter) {
        return new Promise((resolve, reject) => {
            // console.log("Inside Controller");
            this.usersModel.register(parameter)
                .then((result) => {
                    return resolve(result)
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    }

    login(creds) {
        return new Promise((resolve, reject) => {
            this.usersModel.login(creds)
                .then((resp) => {
                    console.log('Inside Controller');
                    console.log(resp);
                    return resolve(resp);
                })
                .catch((err) => {
                    return reject(err);
                });

        });

    }

    ping(ip) {
        return new Promise((resolve, reject) => {
            this.usersModel.ping(ip)
                .then((resp) => {
                    // console.log('Inside Controller');
                    // const htmlResponse = '{"result" :"<p>' + resp + '</p>"}';
                    const htmlResponse = resp;
                    // console.log(htmlResponse);
                    return resolve(htmlResponse);
                })
                .catch((err) => {
                    console.log(err);
                    // console.log('Inside Controller');
                    // const htmlResponse = "<p>" + err + "</p>}";
                    const htmlResponse = resp;
                    return reject(htmlResponse);
                });
        });
    }
}

module.exports = UsersController;