'use strict';

import { isClean, setWorkingDirectoryToGitRoot } from './modules/git.js';

async function main() {
    await setWorkingDirectoryToGitRoot();
    await isClean();
}

await main();