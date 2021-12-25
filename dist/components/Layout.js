"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("react");
const themes_1 = require("@tsdocgen/themes");
require("gatsby");
const Layout = (args) => {
    const { element, props } = args;
    return ((0, jsx_runtime_1.jsx)(themes_1.AntDesignTheme.Layout, Object.assign({ projectName: props.pageContext.projectName }, { children: element }), void 0));
};
exports.default = Layout;
//# sourceMappingURL=Layout.js.map