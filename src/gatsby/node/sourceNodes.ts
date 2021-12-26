import { GatsbyNode } from "gatsby";
import { tsDocGenApp } from "../../tsdocgen";

const sourceNodes: GatsbyNode['sourceNodes'] = ({ actions, createContentDigest }) => {
    const { createNode } = actions;

    const projects = tsDocGenApp.projects;
    const menu = tsDocGenApp.navigation.menu;

    projects.forEach((project) => {
        Object.keys(menu).forEach((key) => {
            const item =menu[key];

            const nodeMeta = {
                id: `${project.name}-${key}`,
                parent: null,
                children: [],
                internal: {
                    type: `Navigation`,
                    content: JSON.stringify(menu[key]),
                    contentDigest: createContentDigest(item)
                }
            };

            const node = Object.assign({}, item, nodeMeta);

            createNode(node);
        });
    });
};

export default sourceNodes;