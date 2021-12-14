'use strict';

import { isClean, setWorkingDirectoryToGitRoot } from './modules/git.js';

async function main() {
    console.log('Start directory: ' + process.cwd());
    await setWorkingDirectoryToGitRoot();
    console.log('New directory: ' + process.cwd());
    var bar = await isClean();
    console.log('End directory: ' + process.cwd());
}

await main();