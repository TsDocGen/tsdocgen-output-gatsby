import React from 'react';
import { AntDesignTheme } from '@tsdocgen/themes';
import { WrapPageElementNodeArgs } from 'gatsby';
import type { PageProps } from '@tsdocgen/core';

const Layout: React.FC<WrapPageElementNodeArgs<any, PageProps>> = (args) => {

    const { element, props } = args;

    return (
        <AntDesignTheme.Layout projectName={props.pageContext.projectName}>
            {element}
        </AntDesignTheme.Layout>
    );
}

export default Layout;