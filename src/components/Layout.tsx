import React from 'react';
import { Layout as AntDesignThemeLayout } from '@tsdocgen/themes/ant-design';
import { WrapPageElementNodeArgs } from 'gatsby';
import type { PageProps } from '@tsdocgen/core';

const Layout: React.FC<WrapPageElementNodeArgs<any, PageProps>> = (args) => {

    const { element, props: {pageContext: { projectName } } } = args;

    return (
        <AntDesignThemeLayout projectName={projectName}>
            {element}
        </AntDesignThemeLayout>
    );
}

export default Layout;