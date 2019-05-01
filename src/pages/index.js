import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';
import TestSearch from '../components/TestSearch';

const IndexPage = () => (
    <Layout style={ {
        height: 'calc(70% - 64px)'
    } }>
        <Helmet>
            <title>AP Timer</title>
        </Helmet>
        <TestSearch/>
    </Layout>
);

export default IndexPage;
