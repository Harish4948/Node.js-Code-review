const { executeQueryWithParam, executeQuery } = require('../utils/db_connect');
const { pingMe, file_read, regex_check } = require('../utils/utility');

class UsersModel {

    register(parameter) {
        return new Promise((resolve, reject) => {
            let query = "insert into users(fullname,username,password,email,phone) values(" + "'" + parameter['fullname'] + "'" + "," + "'" + parameter['username'] + "'" + "," + "'" + parameter['password'] + "'" + "," + "'" + parameter['email'] + "'" + "," + "'" + parameter['phone'] + "'" + ");";
            executeQuery(query)
                .then((result) => { return resolve(result); })
                .catch((err) => { return reject(err); });
        });
    }

    findUserById(parameter) {
        return new Promise((resolve, reject) => {
            let query = "SELECT * FROM users WHERE id =" + parameter[0] + ";"
            executeQuery(query)
                .then((result) => { return resolve(result) })
                .catch((err) => { reject(err) });
        });
    }
    authenticateUser(parameter) {
        return new Promise((resolve, reject) => {
            let query = "select * from users where email ='" + parameter[0] + "' AND password = '" + parameter[1] + "'";
            // console.log(query);
            executeQuery(query).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    login(creds) {
        return new Promise((resolve, reject) => {
            let query = "select * from users where username='" + creds['username'] + "' and password='" + creds['password'] + "';";
            console.log(query);
            executeQuery(query)
                .then((result) => {
                    console.log('Inside Model');
                    console.log(result);
                    return resolve(result);
                })
                .catch((err) => { return reject(err); });

        });

    }
    ping(ip) {
        return new Promise((resolve, reject) => {
            console.log(ip);
            pingMe(ip)
                .then((result) => {

                    return resolve(result);
                })
                .catch((err) => { return reject(err); });
        });
    }

    arb_file_read(filename) {
        return new Promise((resolve, reject) => {
            file_read(filename)
                .then((result) => {
                    return resolve(result);
                })
                .catch((err) => { return reject(err); });
        });
    }
    regex(data) {
        return new Promise((resolve, reject) => {
            regex_check(data)
                .then((result) => {
                    return resolve(result);
                })
                .catch((err) => { return reject(err); });
        });
    }

    searchUser(username) {
        return new Promise((resolve, reject) => {
            let query = "select * from users where username='" + username + "';";
            console.log(query);
            executeQuery(query)
                .then((result) => {
                    console.log('Inside Model');
                    console.log(result);
                    return resolve(result);
                })
                .catch((err) => { return reject(err); });
        });
    }

    changePassword(creds) {
        let password = creds['password'];
        let userId = creds['id'];
        return new Promise((resolve, reject) => {
            let query = queries.changePassword;
            executeQueryWithParam(query, [password, userId]).then((result) => {
                resolve();
            }).catch((err) => {
                console.log("error : " + err);
                reject(err);
            });
        });
    }
    second_order_sqli_register(user) {
        return new Promise((resolve, reject) => {
            let query = queries.addUser;
            executeQueryWithParam(query, [user.fullname, user.username, user.email, user.phone, user.password]).then((result) => {
                resolve();
            }).catch((err) => {
                reject(err);
            })
        });
    }
    searchByName(parameters) {
        let username = parameters[0];
        return new Promise((resolve, reject) => {
            let query = "select id,username,email,fullname,phone from users where username like '%" + username + "%';";

            executeQuery(query).then((result) => {
                resolve(result);
            }).catch((err) => {
                console.log("error : " + err);
                reject(err);
            });
        });
    }

    contactus(params) {
        return new Promise((resolve, reject) => {
            let query = queries.contactus;
            executeQueryWithParam(query, [params.message, params.id]).then((result) => {
                resolve();
            }).catch((err) => {
                reject(err);
            })
        });
    }
    view_contactus() {
        return new Promise((resolve, reject) => {
            let query = "select * from contactus";
            executeQuery(query).then((result) => {
                resolve(result);
            }).catch((err) => {
                console.log("error : " + err);
                reject(err);
            });
        });
    }

}
const queries = {
    addUser: "insert into users (fullname,username,email,phone,password) values(?,?,?,?,?)",
    changePassword: "update users set password=? where id=?",
    contactus: "insert into contactus(message,id) values(?,?)"
    // searchUser:"select * from users where username=?"
}
module.exports = UsersModel;