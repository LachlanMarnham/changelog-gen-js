'use strict';
import git from 'isomorphic-git';
import fs from 'fs';
import {globby} from 'globby';
import {setUnion} from './utils.js';

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
    // Gets the Set of all files which aren't ignored (ie by the .gitignore).
    // This does not include files which have been deleted
    let visibleFilesMatch =  './**';
    let hiddenFilesMatch = './**/.*';
    let filesList = await globby([visibleFilesMatch, hiddenFilesMatch], { gitignore: true });
    return new Set(filesList);
}

async function getGitFiles() {
    // Gets the Set of all files which aren't ignored (ie by the .gitignore).
    // This includes staged or unstaged, new files and deleted files. It does not include
    // files which are both new and unstaged
    let filesList = await git.listFiles({ fs, dir: '.' });
    return new Set(filesList);
}

async function isClean() {
    const pathsOnDisk = await getFilesOnDisk();
    const gitPaths = await getGitFiles();
    const paths = setUnion(pathsOnDisk, gitPaths);
    
    for (const filepath of paths) {
        let status = await gitStatus(filepath);
        if (status !== 'unmodified') {
            console.log(filepath, status);
        };
    }
}

export { gitStatus, isClean, setWorkingDirectoryToGitRoot };