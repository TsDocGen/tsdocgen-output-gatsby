#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const child_process_1 = require("child_process");
function noop() { }
async function main() {
    const program = new commander_1.Command('tsdocgen-gatsby');
    program
        .command('build')
        .action(() => {
        (0, child_process_1.spawnSync)('gatsby build', {
            stdio: 'inherit'
        });
    });
    await program.parseAsync(process.argv);
}
main()
    .then(noop)
    .catch(console.error);
//# sourceMappingURL=cli.js.map