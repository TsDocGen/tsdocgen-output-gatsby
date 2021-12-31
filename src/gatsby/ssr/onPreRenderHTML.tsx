import 'react';
import { GatsbySSR } from 'gatsby';

export const onPreRenderHTML: GatsbySSR['onPreRenderHTML'] = ({ replacePostBodyComponents, getPostBodyComponents }) => {
    const postBodyComponents = getPostBodyComponents();

    if (process.env['NODE_ENV'] === "production") {
        const chunkMapping = require("/public/chunk-map.json") as Record<string, string[]>;

        if (chunkMapping['tsdocgen-config']) {
            const newPostBodyComponents = chunkMapping['tsdocgen-config'].map((src) => {
                return <script src={src} key={src} async />;
            });
            replacePostBodyComponents([
                ...postBodyComponents,
                ...newPostBodyComponents
            ]);
        }
        else {
            console.error('Chunks for tsdocgen-config not detected. Your gatsby site will most likely not work.');
        }
    }
    else {
        replacePostBodyComponents([
            ...postBodyComponents,
            <script src="/tsdocgen-config.js" key="tsdocgen-config.js" />
        ]);
    }

}