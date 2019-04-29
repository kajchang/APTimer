import React from 'react';
import Layout from './Layout'

const TestPage = ({ pageContext }) => {
    const { testName } = pageContext;

    return (
        <Layout>
            { testName }
        </Layout>
    );
}

export default TestPage;
