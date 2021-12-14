import { exec } from "child_process";


function describe() {
    exec("git describe --tags --dirty --long --match [0-9]*", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(stdout.trim().split("-"));
        return stdout;
    });
}

describe();