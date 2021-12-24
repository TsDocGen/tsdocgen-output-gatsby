"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("gatsby");
const tsdocgen_1 = require("../../tsdocgen");
const sourceNodes = ({ actions, createContentDigest }) => {
    const { createNode } = actions;
    const projects = tsdocgen_1.tsDocGenApp.projects;
    projects.forEach((project) => {
        Object.keys(project.menu).forEach((key) => {
            const item = project.menu[key];
            const nodeMeta = {
                id: `${project.name}-${key}`,
                parent: null,
                children: [],
                internal: {
                    type: `Navigation`,
                    content: JSON.stringify(project.menu[key]),
                    contentDigest: createContentDigest(item)
                }
            };
            const node = Object.assign({}, item, nodeMeta);
            createNode(node);
        });
    });
};
exports.default = sourceNodes;
//# sourceMappingURL=sourceNodes.js.map