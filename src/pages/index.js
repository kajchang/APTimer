import React  from 'react';
import Layout from '../components/Layout';
import TestSearch from '../components/TestSearch';

const IndexPage = () => (
    <Layout gridProps={ {
        direction: 'column',
        justify: 'center',
        alignItems: 'center',
        style: {
            height: 'calc(70% - 64px)'
        }
    } }>
        <TestSearch/>
    </Layout>
);

export default IndexPage;
