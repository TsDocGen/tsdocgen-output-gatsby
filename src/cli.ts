#!/usr/bin/env node

import { Command } from 'commander';
import { spawnSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

function noop() { }

async function main() {
    const program = new Command('tsdocgen-gatsby');

    program
        .command('init')
        .description('Initialize a project with the default gatsby files.')
        .action(() => {
            ["gatsby-browser.js", "gatsby-config.js", "gatsby-node.js", "gatsby-ssr.js"].forEach((file) => {
                const outputFile = path.join(process.cwd(), file);

                if (!fs.existsSync(outputFile)) {
                    const contents = fs.readFileSync(path.join(__dirname, 'templates', `${file}.txt`)).toString();
                    fs.writeFileSync(outputFile, contents, 'utf-8');
                }
                else {
                    console.error(`${outputFile} already exists`);
                }
            })
        });

    program
        .command('build')
        .description('Start gatsby build.')
        .action(() => {
            spawnSync('gatsby build', {
                stdio: 'inherit'
            });
        });

    program
        .command('clean')
        .description('Clean gatsby project.')
        .action(() => {
            spawnSync('gatsby clean', {
                stdio: 'inherit'
            });
        });
    await program.parseAsync(process.argv);
}

main()
    .then(noop)
    .catch(console.error);