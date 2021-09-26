#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = require("path");
const fs_1 = require("fs");
const cwd = process.cwd();
const node_modules = (0, path_1.join)(cwd, 'node_modules');
const dist = (0, path_1.join)(node_modules, 'tsdocgen-output-gatsby', 'dist');
function createSymlink(name) {
    (0, fs_1.symlinkSync)(cwd, (0, path_1.join)(dist, name), 'file');
    return () => {
        (0, fs_1.unlinkSync)((0, path_1.join)(cwd, name));
    };
}
const unlinkGatsbyConfig = createSymlink('gatsby-config.js');
const unlinkGatsbyNode = createSymlink('gatsby-node.js');
const unlinkGatsbyBrowser = createSymlink('gatsby-browser.js');
const unlinkGatsbySsr = createSymlink('gatsby-ssr.js');
(0, child_process_1.exec)('gatsby build', () => {
    unlinkGatsbyConfig();
    unlinkGatsbyNode();
    unlinkGatsbyBrowser();
    unlinkGatsbySsr();
});
//# sourceMappingURL=build.js.map