import 'react';
import { GatsbySSR } from 'gatsby';

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setPostBodyComponents }) => {
    setPostBodyComponents([
        <script src="/tsdocgen-theme.js" key="tsdocgen-theme.js" async={process.env['NODE_ENV'] === "production"} />
    ]);
}