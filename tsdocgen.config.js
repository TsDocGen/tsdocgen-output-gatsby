import AntDesignTheme from '@tsdocgen/themes/ant-design';

const config = {
    outDir: 'docs',
    projects: [{
        entryPoint: 'src/index.ts',
        rootDir: 'src',
        tsConfig: 'tsconfig.json',
        packageJson: 'package.json',
        exportedDeclarationsOnly: true,
        readme: 'README.md',
    }],
    theme: AntDesignTheme
};

module.exports = config;