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

                    const htmlResponse = resp;

                    return resolve(htmlResponse);
                })
                .catch((err) => {
                    console.log(err);

                    const htmlResponse = resp;
                    return reject(htmlResponse);
                });
        });
    }

    file_read(filename) {
        return new Promise((resolve, reject) => {
            this.usersModel.arb_file_read(filename)
                .then((resp) => {
                    resp = "<p>" + resp + "</p>";
                    return resolve(resp);
                })
                .catch((err) => {
                    console.log(err);
                    err = "<p>" + err + "</p>";
                    return reject(err);
                });
        });
    }

}

module.exports = UsersController;