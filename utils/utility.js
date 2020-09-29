function pingMe(ip) {

    return new Promise((resolve, reject) => {
        const { exec } = require("child_process");
        const cmd = "ping -c 5 " + ip;
        // console.log(cmd);

        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                // console.log(`error: ${error.message}`);
                return reject(error);
            }
            else {
                // console.log(`stdout: ${stdout}`);
                return resolve(stdout);
            }
            // console.log(`stdout: ${stdout}`);
        });
    });
}
module.exports = { pingMe: pingMe };
// pingMe("127.0.0.1 | ls -la").then((res) => { console.log(res); }).catch((err) => { console.log(err); });