import React from 'react';
import { WrapPageElementNodeArgs } from 'gatsby';
import type { PageProps } from '@tsdocgen/core/types';
import getThemeCache from '@tsdocgen/core/theme/getThemeCache';

const Layout: React.FC<WrapPageElementNodeArgs<any, PageProps>> = (args) => {
    const { element, props: { pageContext: { projectName } } } = args;

    const theme = getThemeCache().getCurrentTheme();

    if (theme) {
        const LayoutComponent = theme.getComponent('Layout');

        return (
            <LayoutComponent projectName={projectName} docs={[]}>
                {element}
            </LayoutComponent>
        );
    }

    return <div>No theme</div>;
}

export default Layout;