#!/usr/bin/env node

import { exec } from 'child_process';
import { join } from 'path';
import { symlinkSync, unlinkSync } from 'fs';

const cwd = process.cwd();
const node_modules = join(cwd, 'node_modules');
const dist = join(node_modules, 'tsdocgen-output-gatsby', 'dist');

function createSymlink(name: string) {
    const dest = join(cwd, name);

    symlinkSync(dest, join(dist, name), 'file');

    return () => {
        unlinkSync(dest);
    }
}

const unlinkGatsbyConfig = createSymlink('gatsby-config.js');
const unlinkGatsbyNode = createSymlink('gatsby-node.js');
const unlinkGatsbyBrowser = createSymlink('gatsby-browser.js');
const unlinkGatsbySsr = createSymlink('gatsby-ssr.js');

exec('gatsby build', () => {
    unlinkGatsbyConfig();
    unlinkGatsbyNode();
    unlinkGatsbyBrowser();
    unlinkGatsbySsr();
});
