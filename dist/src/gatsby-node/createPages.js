"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("gatsby");
const path_1 = require("path");
const tsdocgen_1 = require("./../tsdocgen");
/** Creates gatsby pages for generated documentation definitions */
const createPages = async ({ actions }) => {
    const { createPage } = actions;
    const projects = tsdocgen_1.tsDocGenApp.projects;
    console.log('config', tsdocgen_1.tsDocGenApp.config);
    for (const index in projects) {
        const project = projects[index];
        const menu = project.buildMenu();
        console.log('menu', menu);
        project.forEachDoc((doc) => {
            const component = (0, path_1.resolve)(__dirname, '../components/Page.js');
            createPage({
                path: `${projects.length === 1 ? '' : `${project.name}/`}${doc.type}/${doc.name}.html`,
                component: component,
                context: { doc: doc, projectName: project.name },
            });
        });
    }
};
exports.default = createPages;
//# sourceMappingURL=createPages.js.map