"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const themes_1 = require("@tsdocgen/themes");
require("gatsby");
require("react");
const Page = ({ pageContext }) => {
    return (0, jsx_runtime_1.jsx)(themes_1.AntDesignTheme.Page, Object.assign({}, pageContext), void 0);
};
exports.default = Page;
//# sourceMappingURL=Page.js.map