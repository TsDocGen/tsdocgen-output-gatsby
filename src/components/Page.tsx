import { AntDesignTheme } from '@tsdocgen/themes';
import type { PageProps as TsDocGenPageProps } from '@tsdocgen/core';
import { PageProps } from 'gatsby';
import React from 'react';

const Page: React.FC<PageProps<{}, TsDocGenPageProps>> = ({ pageContext }) => {
    return <AntDesignTheme.Page {...pageContext} />
}

export default Page;
