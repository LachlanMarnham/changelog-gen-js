'use strict';
import git from 'isomorphic-git';
import fs from 'fs';
import {globby} from 'globby';

async function gitStatus() {
    let status = await git.status({ fs, dir: '.', filepath: 'README.md' });
    console.log(status);
}

async function getGitFiles() {
    // Gets the list of all files which aren't ignored (ie by the .gitignore).
    // This includes staged or unstaged, new files and deleted files.
    return globby(['./**', './**/.*'], { gitignore: true });
}

async function getGitRoot() {
    // Finds the project root by identifying the parent directory of .git
    return git.findRoot({fs, filepath: process.cwd()})
}

async function isClean() {
    const paths = await getGitFiles();
    console.log(paths);
    const gitRoot = await getGitRoot();
    console.log(gitRoot);
    // for (const filepath of paths) {
    //     await git.add({ fs, dir, filepath });
    // }
}

export { gitStatus, isClean };