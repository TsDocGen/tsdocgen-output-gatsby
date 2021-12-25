import { GatsbyNode } from "gatsby";
import { resolve } from "path";
import { tsDocGenApp } from '../../tsdocgen';

/** Creates gatsby pages for generated documentation definitions */
const createPages: GatsbyNode["createPages"] = async ({ actions }) => {
  const { createPage } = actions

  const projects = tsDocGenApp.projects;

  for (const index in projects) {
    const project = projects[index];

    const menu = project.buildMenu();

    project.forEachDoc((doc) => {
      const component = resolve(__dirname, '../../components/Page.js');
      const theme = project.getTheme();

      createPage({
          path: `${projects.length === 1 ? '' : `${project.name}/`}${doc.type}/${doc.name}.html`,
          component: component,
          context: { doc: doc, projectName: project.name, menu, theme },
      });
    });
  }
}

export default createPages;