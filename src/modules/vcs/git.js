import { exec } from "child_process";

function execShellCommand(cmd) {
    return new Promise((resolve, reject) => {
     exec(cmd, (error, stdout, stderr) => {
      if (error) {
       console.warn(error);
      }
      resolve(stdout? stdout : stderr);
     });
    });
   }

async function describe() {
    // exec("git describe --tags --dirty --long --match [0-9]*", (error, stdout, stderr) => {
    //     if (error) {
    //         console.log(`error: ${error.message}`);
    //         return;
    //     }
    //     if (stderr) {
    //         console.log(`stderr: ${stderr}`);
    //         return;
    //     }
    //     console.log(stdout.trim().split("-"));
    //     return stdout;
    // });
    let result = await execShellCommand("git describe --tags --dirty --long --match [0-9]*");
    result = result.trim().split("-");
    console.log(result);
}

await describe();