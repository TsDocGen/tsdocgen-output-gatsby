import 'react';
import { GatsbySSR } from 'gatsby';

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setPostBodyComponents }) => {
    if (process.env['NODE_ENV'] === "production") {
        const chunkMapping = require("/public/chunk-map.json") as Record<string, string[]>;

        if (chunkMapping['tsdocgen-theme']) {
            chunkMapping['tsdocgen-theme'].forEach((src) => {
                setPostBodyComponents([
                    <script src={src} key={src} async />
                ]);
            });
        }
        else {
            console.error('Chunks for tsdocgen-theme not detected. Your gatsby site will most likely not work.');
        }
    }
    else {
        setPostBodyComponents([
            <script src="/tsdocgen-theme.js" key="tsdocgen-theme.js" />
        ]);
    }

}