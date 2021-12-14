'use strict';
import git from 'isomorphic-git';
import fs from 'fs';

async function gitStatus() {
    let status = await git.status({ fs, dir: '.', filepath: 'README.md' });
    console.log(status);
}

async function isClean() {
    let files = await git.listFiles({ fs, dir: '.' });
    console.log(files);
}

export { gitStatus, isClean };