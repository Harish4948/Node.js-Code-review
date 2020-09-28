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

}

module.exports = UsersController;
