'use strict';
import git from 'isomorphic-git';
import fs from 'fs';
import {globby} from 'globby';
import path from 'path';

async function gitStatus(filepath) {
    return git.status({ fs, dir: '.', filepath: filepath });
}

async function getGitRoot() {
    // Finds the project root by identifying the parent directory of .git
    return git.findRoot({fs, filepath: process.cwd()});
}

async function setWorkingDirectoryToGitRoot() {
    // Changes the process working directory to the git root (ie the directory containing .git).
    // This ensures that git commands return results for the entire repo, regardless of calling context.
    const gitRoot = await getGitRoot();
    process.chdir(gitRoot);
}

async function getFilesOnDisk() {
    // Gets the list of all files which aren't ignored (ie by the .gitignore).
    // This does not include files which have been deleted
    let visibleFilesMatch =  './**';
    let hiddenFilesMatch = './**/.*';
    return globby([visibleFilesMatch, hiddenFilesMatch], { gitignore: true });
}

async function getGitFiles() {
    // Gets the list of all files which aren't ignored (ie by the .gitignore).
    // This includes staged or unstaged, new files and deleted files. It does not include
    // files which are both new and unstaged
    return git.listFiles({ fs, dir: '.' });
}

async function isClean() {
    const paths = await getFilesOnDisk();
    for (const filepath of paths) {
        let status = await gitStatus(filepath);
        if (status !== 'unmodified') {
            console.log(filepath, status);
        };
    }
}

export { gitStatus, isClean, setWorkingDirectoryToGitRoot };