import React, { Fragment } from 'react';
import Layout from './Layout'

const TestPage = ({ pageContext }) => {
    const { name, sections } = pageContext;

    return (
        <Layout>
            { name }
            { Object.keys(sections).map(section =>
                <Fragment>
                    <strong>{ section }</strong>
                    <span>{ sections[section] }</span>
                </Fragment>
            ) }
        </Layout>
    );
}

export default TestPage;
