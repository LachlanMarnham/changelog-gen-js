'use strict';
import git from 'isomorphic-git';
import fs from 'fs';
import {globby} from 'globby';
import path from 'path';

async function gitStatus(filepath) {
    let status = await git.status({ fs, dir: '.', filepath: filepath });
    /// if status !== 'unmodified';
    console.log(status, filepath);
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

async function getGitFiles() {
    // Gets the list of all files which aren't ignored (ie by the .gitignore).
    // This includes staged or unstaged, new files and deleted files.
    let visibleFilesMatch =  './**';
    let hiddenFilesMatch = './**/.*';
    return globby([visibleFilesMatch, hiddenFilesMatch], { gitignore: true });
}

async function isClean() {
    const paths = await getGitFiles();
    for (const filepath of paths) {
        await gitStatus(filepath);
    }
}

export { gitStatus, isClean, setWorkingDirectoryToGitRoot };