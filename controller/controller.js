var UsersModel = require("../model/userModel");
const { parseXML } = require("../utils/utility");

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

    regex(data) {
        return new Promise((resolve, reject) => {
            this.usersModel.regex(data)
                .then((result) => {
                    return resolve(result);
                })
                .catch((err) => { return reject(err); });
        });
    }
    xxe(username) {
        return new Promise((resolve, reject) => {
            parseXML(username).then((xmlDoc) => {
                username = xmlDoc.get('/user').text();
                this.usersModel.searchUser([username])
                    .then((user) => {
                        let htmlResponse = "";
                        if (user != undefined && user != "") {
                            htmlResponse = "<p>" + username + " present</p>";
                        } else {
                            htmlResponse = "<p>User " + username + " not present";
                        }

                        return resolve(htmlResponse);
                    })
                    .catch((err) => {
                        console.log("C IN")
                        return reject(err);
                    });
            }).catch((err) => {
                console.log('c OUT');
                return reject(err);
            });
        });
    }
}

module.exports = UsersController;