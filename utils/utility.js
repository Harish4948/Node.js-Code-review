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
module.exports = { pingMe: pingMe };
// pingMe("127.0.0.1 | ls -la").then((res) => { console.log(res); }).catch((err) => { console.log(err); });