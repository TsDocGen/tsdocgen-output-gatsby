#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = require("path");
const fs_1 = require("fs");
const cwd = process.cwd();
const node_modules = (0, path_1.join)(cwd, 'node_modules');
const dist = (0, path_1.join)(node_modules, 'tsdocgen-output-gatsby', 'dist');
function removeSymlink(path) {
    try {
        (0, fs_1.unlinkSync)(path);
    }
    catch (error) {
        console.error('Unable to remove symlink with error', error);
    }
}
function createSymlink(name) {
    const dest = (0, path_1.join)(cwd, name);
    const src = (0, path_1.join)(dist, name);
    const unlink = () => {
        removeSymlink(dest);
    };
    try {
        (0, fs_1.symlinkSync)(src, dest, 'file');
    }
    catch (error) {
        console.error('Unable to create symlink with error', error);
        unlink();
    }
    return unlink;
}
function runGatsby(command) {
    const unlinkGatsbyConfig = createSymlink('gatsby-config.js');
    const unlinkGatsbyNode = createSymlink('gatsby-node.js');
    const unlinkGatsbyBrowser = createSymlink('gatsby-browser.js');
    const unlinkGatsbySsr = createSymlink('gatsby-ssr.js');
    (0, child_process_1.exec)(`gatsby ${command}`, (err, stdout, stderr) => {
        console.log('err', err);
        console.log('stdout', stdout);
        console.log('stderr', stderr);
        unlinkGatsbyConfig();
        unlinkGatsbyNode();
        unlinkGatsbyBrowser();
        unlinkGatsbySsr();
    });
}
exports.default = runGatsby;
//# sourceMappingURL=runGatsby.js.map