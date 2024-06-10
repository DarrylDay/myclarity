const { exec } = require('child_process');
const fs = require('fs');
require('dotenv').config();

let rawdata = fs.readFileSync('package.json');
let package = JSON.parse(rawdata);

if (process.env.CI_COMMIT_TAG) {
    execAndLog("npm --no-git-tag-version version from-git")
} else if (process.env.CI_COMMIT_SHORT_SHA) {
    execAndLog("npm --no-git-tag-version version \"" + package.version + "-" + process.env.CI_COMMIT_SHORT_SHA + "\"")
}

function execAndLog(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    })
}