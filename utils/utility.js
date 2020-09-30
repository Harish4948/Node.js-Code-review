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

function regex_check(data) {
    return new Promise((resolve, reject) => {
        const emailRegex = /^([a-zA-Z0-9])(([\-.]|[_]+)?([a-zA-Z0-9]+))*(@){1}[a-z0-9]+[.]{1}(([a-z]{2,3})|([a-z]{2,3}[.]{1}[a-z]{2,3}))$/;
        const userRegex = /^(([a-zA-Z0-9])+\s?)+$/;
        var email = data.email;
        var username = data.username;
        // var username = data;
        if (emailRegex.test(email) && userRegex.test(username)) {

            resolve('ok');

        }
        else {
            reject('Not ok');
        }
    });
}

function parseXML(xmlInput) {
    return new Promise((resolve, reject) => {
        var libxml = require("libxmljs")
        var parserOptions = {
            noblanks: true,
            noent: true,
            nocdata: true
        };
        try {
            console.log('UTILITY');
            var doc = libxml.parseXmlString(xmlInput, parserOptions);

            return resolve(doc);
        } catch (e) {
            return reject(new Error('Xml parsing error'));
        }
    });
}

module.exports = { pingMe: pingMe, file_read: file_read, regex_check: regex_check, parseXML: parseXML };
// regex_check("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!").then((res) => { console.log(res); }).catch((err) => { console.log(err); });
// pingMe("127.0.0.1 | ls -la").then((res) => { console.log(res); }).catch((err) => { console.log(err); });