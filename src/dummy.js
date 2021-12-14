'use strict';
import git from 'isomorphic-git';
import fs from 'fs';

async function main(){
    // set the working directory to the git root
    const gitRoot = await git.findRoot({fs, filepath: process.cwd()});
    process.chdir(gitRoot);

    // get the files git knows about
    let files = await git.listFiles({ fs, dir: '.' });
    console.log(files);
    // print 'working tree not clean' if there are any files which don't have 
    // the status: 'unmodified'
    for (const filepath of files) {
        let status = await git.status({ fs, dir: '.', filepath: filepath });
        if (status !== 'unmodified') {
            console.log('working tree not clean');
        };
    }
}

await main();
