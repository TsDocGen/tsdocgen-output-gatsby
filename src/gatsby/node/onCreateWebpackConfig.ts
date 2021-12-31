import { GatsbyNode, WebpackLoaders } from "gatsby";
import { tsDocGenApp } from "../../tsdocgen";

type GatsbyStages = Parameters<Exclude<GatsbyNode['onCreateWebpackConfig'], undefined>>['0']['stage'];

const dependOn = (stage: GatsbyStages) => {
    // commons: https://github.com/gatsbyjs/gatsby/blob/775289fa78042ed6a07e7c0b78938ff59f5bf4fa/packages/gatsby/src/utils/webpack.config.js#L188
    if (stage === "develop") return "commons";
    // app: https://github.com/gatsbyjs/gatsby/blob/775289fa78042ed6a07e7c0b78938ff59f5bf4fa/packages/gatsby/src/utils/webpack.config.js#L208
    if (stage === "build-javascript") return "app";
    if (stage === "develop-html" || stage === "build-html") return undefined;
}

const filename = (stage: GatsbyStages) => {
    if (stage === "develop") return "tsdocgen-config.js";
    return undefined;
}

const rules = (stage: GatsbyStages, config: any, loaders: WebpackLoaders) => {
    if (stage === "build-html") {
        return config.module.rules;
    }
    return [
        {
            test: /\/public\/chunk-map\.json$/,
            ...loaders.json(),
        },
    ].concat(config.module.rules)
}

// Gatsby Webpack Config: https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/src/utils/webpack.config.js
const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ actions, getConfig, stage, loaders }) => {
    const tsDocGenConfigPath = tsDocGenApp.getTsDocGenConfigPath();
    const config = getConfig();

    const newConfig = {
        ...config,
        entry: {
            ...config.entry,
            'tsdocgen-config': {
                dependOn: dependOn(stage),
                import: tsDocGenConfigPath,
                filename: filename(stage)
            }
        },
        module: {
            ...config.module,
            rules: rules(stage, config, loaders),
        },
    };

    if (stage === "develop" || stage === "build-html") {
        actions.replaceWebpackConfig(newConfig);
    }

    if (stage === "build-javascript") {
        actions.replaceWebpackConfig({
            ...newConfig,
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

export default onCreateWebpackConfig;