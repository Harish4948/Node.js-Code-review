const { executeQueryWithParam, executeQuery } = require('../utils/db_connect');
const { pingMe } = require('../utils/utility');

class UsersModel {

    register(parameter) {
        return new Promise((resolve, reject) => {
            let query = "insert into users(fullname,username,password,email,phone) values(" + "'" + parameter['fullname'] + "'" + "," + "'" + parameter['username'] + "'" + "," + "'" + parameter['password'] + "'" + "," + "'" + parameter['email'] + "'" + "," + "'" + parameter['phone'] + "'" + ");";
            executeQuery(query)
                .then((result) => { return resolve(result); })
                .catch((err) => { return reject(err); });
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
}
const queries = {
    addUser: "insert into users (fullname,username,email,phone,password) values(?,?,?,?,?)",
}
module.exports = UsersModel;