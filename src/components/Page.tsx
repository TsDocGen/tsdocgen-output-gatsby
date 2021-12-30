import React from 'react';
import type { PageProps as TsDocGenPageProps } from '@tsdocgen/core/types/theme';
import { PageProps } from 'gatsby';
import getThemeCache from '@tsdocgen/core/theme/getThemeCache';

const Page: React.FC<PageProps<{}, TsDocGenPageProps>> = ({ pageContext }) => {
    const theme = getThemeCache().getCurrentTheme();

    if (theme) {
        const PageComponent = theme.getComponent('Page');

        return (
            <PageComponent {...pageContext} />
        );
    }
    return <div>No theme</div>;
}

export default Page;
