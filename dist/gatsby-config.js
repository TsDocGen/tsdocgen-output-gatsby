"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("gatsby");
const config = {
    siteMetadata: {
        siteUrl: "https://www.yourdomain.tld",
        title: "Gatsby Docs",
    },
    plugins: [
        {
            resolve: `gatsby-plugin-typescript`,
            options: {
                isTSX: true,
                jsxPragma: `jsx`,
                allExtensions: true, // defaults to false
            },
        },
        "gatsby-plugin-styled-components",
        {
            resolve: "gatsby-plugin-google-analytics",
            options: {
                trackingId: "sdghajda",
            },
        },
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sitemap",
        // {
        //   resolve: "gatsby-plugin-manifest",
        //   options: {
        //     icon: "src/images/icon.png",
        //   },
        // },
        "gatsby-plugin-mdx",
        // {
        //   resolve: "gatsby-source-filesystem",
        //   options: {
        //     name: "pages",
        //     path: "./src/pages/",
        //   },
        //   __key: "pages",
        // },
    ],
};
exports.default = config;
//# sourceMappingURL=gatsby-config.js.map