const { executeQueryWithParam, executeQuery } = require('../utils/db_connect');

class UsersModel {

    register(parameter) {
        return new Promise((resolve, reject) => {
            // console.log("Inside Model");
            // console.log(parameter)
            //     .then(() => { return resolve("success") })
            //     .catch((err) => (reject(err)));
            let query = "insert into users(fullname,username,password,email,phone) values(" + "'" + parameter['fullname'] + "'" + "," + "'" + parameter['username'] + "'" + "," + "'" + parameter['password'] + "'" + "," + "'" + parameter['email'] + "'" + "," + "'" + parameter['phone'] + "'" + ");";
            executeQuery(query)
                .then((result) => { return resolve(result); })
                .catch((err) => { return reject(err); });
        });
    }
}
const queries = {
    addUser: "insert into users (fullname,username,email,phone,password) values(?,?,?,?,?)",
}
module.exports = UsersModel;
