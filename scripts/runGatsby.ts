#!/usr/bin/env node

import { exec } from 'child_process';
import { join } from 'path';
import { symlinkSync, unlinkSync } from 'fs';

const cwd = process.cwd();
const node_modules = join(cwd, 'node_modules');
const dist = join(node_modules, 'tsdocgen-output-gatsby', 'dist');

function removeSymlink(path: string) {
    try {
        unlinkSync(path);
    } catch (error) {
        console.error('Unable to remove symlink with error', error);
    }
}

function createSymlink(name: string) {
    const dest = join(cwd, name);
    const src = join(dist, name);

    const unlink = () => {
        removeSymlink(dest);
    };

    try {
        symlinkSync(src, dest, 'file');
    } catch (error) {
        console.error('Unable to create symlink with error', error);
        unlink();
    }

    return unlink;
}

function runGatsby(command: 'build' | 'clean' | 'serve' | 'develop') {
    const unlinkGatsbyConfig = createSymlink('gatsby-config.js');
    const unlinkGatsbyNode = createSymlink('gatsby-node.js');
    const unlinkGatsbyBrowser = createSymlink('gatsby-browser.js');
    const unlinkGatsbySsr = createSymlink('gatsby-ssr.js');

    exec(`gatsby ${command}`, (err, stdout, stderr) => {

        console.log('err', err);
        console.log('stdout', stdout);
        console.log('stderr', stderr);

        unlinkGatsbyConfig();
        unlinkGatsbyNode();
        unlinkGatsbyBrowser();
        unlinkGatsbySsr();
    });
}

export default runGatsby;

