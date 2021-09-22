import { GatsbyNode } from "gatsby";
import { resolve } from "path";
import TSDocGen from "tsdocgen";

/** Creates gatsby pages for generated documentation definitions */
const createPages: GatsbyNode["createPages"] = async ({ actions }) => {
  const { createPage } = actions

  const App = new TSDocGen();

  const result = App.generateDocumentation();

  for (const index in result) {
    const project = result[index];

    project.forEachDoc((doc) => {
      // const component = resolve(__dirname, '../src/themes/ant-design/App.tsx');
      const component = resolve(project.resolveThemePath(), 'Page.js');
        
      createPage({
          path: `${project.name}/${doc.type}/${doc.name}.html`,
          component: component,
          context: { doc: doc, name: project.name },
      });
    });
  }
}

module.exports = exports = createPages;