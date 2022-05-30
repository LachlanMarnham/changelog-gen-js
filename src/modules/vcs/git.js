import { exec } from "child_process";
import { promisify } from "util";

// function execShellCommand(cmd) {
//     return new Promise((resolve, reject) => {
//         exec(cmd, (error, stdout, stderr) => {
//             if (error) {
//                 reject({error: error, stderr: stderr});
//             }
//             resolve(stdout);
//         });
//     });
// }

const promisfiedExec = promisify(exec);

async function execShellCommand(command) {
    return await promisfiedExec(command);
}

async function describe() {
    try {
        let { stdout, stderr} = await execShellCommand("git described --tags --dirty --long --match [0-9]*");
        if (stderr) {
            console.error(stderr);
        }
        console.log('result ', stdout);
        //result = result.trim().split("-");
    } catch (err) {
        console.error(err);
    };
}

// find root directory: git rev-parse --show-toplevel

await describe();