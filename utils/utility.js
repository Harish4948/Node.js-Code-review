function pingMe(ip) {

    return new Promise((resolve, reject) => {
        const { exec } = require("child_process");
        const cmd = "ping -c 5 " + ip;


        exec(cmd, (error, stdout, stderr) => {
            if (error) {

                return reject(error);
            }
            else {

                return resolve(stdout);
            }

        });
    });
}
function file_read(filename) {
    return new Promise((resolve, reject) => {
        var fs = require('fs');
        var path = require('path');
        filePath = path.join(__dirname, filename);
        fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
            if (!err) {
                console.log(data)
                resolve(data);
            } else {
                reject(err);
            }
        });
    });
}
module.exports = { pingMe: pingMe, file_read: file_read };
// pingMe("127.0.0.1 | ls -la").then((res) => { console.log(res); }).catch((err) => { console.log(err); });