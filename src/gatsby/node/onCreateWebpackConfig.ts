import { GatsbyNode } from "gatsby";
import { tsDocGenApp } from "../../tsdocgen";

// Gatsby Webpack Config: https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/src/utils/webpack.config.js
const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ actions, getConfig, stage, loaders }) => {
    if (stage === "develop" || stage === "build-javascript") {
        const theme = tsDocGenApp.getCurrentThemePath();
        const config = getConfig();
        const { entry } = config || {};
        const newEntry = { ...entry };

        newEntry['tsdocgen-theme'] = {
            // commons: https://github.com/gatsbyjs/gatsby/blob/775289fa78042ed6a07e7c0b78938ff59f5bf4fa/packages/gatsby/src/utils/webpack.config.js#L188
            // app: https://github.com/gatsbyjs/gatsby/blob/775289fa78042ed6a07e7c0b78938ff59f5bf4fa/packages/gatsby/src/utils/webpack.config.js#L208
            dependOn: stage === "develop" ? 'commons' : 'app',
            import: theme,
            filename: stage === "develop" ? 'tsdocgen-theme.js' : undefined
        }

        const newConfig = {
            ...config,
            entry: newEntry,
        };

        if (stage === "develop") {
            actions.replaceWebpackConfig(newConfig);
        }

        if (stage === "build-javascript") {
            actions.replaceWebpackConfig({
                ...newConfig,
                module: {
                    ...config.module,
                    rules: [
                        {
                            test: /\/public\/chunk-map\.json$/,
                            ...loaders.json(),
                        },
                    ].concat(config.module.rules),
                },
                optimization: {
                    ...newConfig.optimization,
                    splitChunks: {
                        ...newConfig.optimization.splitChunks,
                        cacheGroups: {
                            ...newConfig.optimization.splitChunks.cacheGroups,
                            'tsdocgen-core': {
                                chunks: 'all',
                                name: 'tsdocgen-core',
                                test: new RegExp("[/]node_modules[/]@tsdocgen[/]core[/]"),
                                priority: 50,
                                enforce: true
                            }
                        }
                    }
                }
            });
        }
    }
}

export default onCreateWebpackConfig;