import { Page as AntDesignThemePage } from '@tsdocgen/themes/ant-design';
import type { PageProps as TsDocGenPageProps } from '@tsdocgen/core';
import { PageProps } from 'gatsby';
import React from 'react';

const Page: React.FC<PageProps<{}, TsDocGenPageProps>> = ({ pageContext }) => {
    console.log(pageContext.doc)
    return <AntDesignThemePage {...pageContext} />
}

export default Page;
