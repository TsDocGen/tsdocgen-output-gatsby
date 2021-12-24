import { Command } from 'commander';
import { spawnSync } from 'child_process';

function noop() { }

async function main() {
    const program = new Command('tsdocgen-gatsby');

    program
        .command('build')
        .action(() => {
            spawnSync('gatsby build', {
                stdio: 'inherit'
            });
        });

    await program.parseAsync(process.argv);
}

main()
    .then(noop)
    .catch(console.error);