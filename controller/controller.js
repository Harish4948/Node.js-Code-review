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

}

module.exports = UsersController;
