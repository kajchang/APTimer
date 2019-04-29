const path = require('path');
const slugify = require('slugify');

const tests = require('./src/data/tests');

exports.createPages = ({ actions }) => {
    const { createPage } = actions;

    tests.forEach(testName => {
        createPage({
            path: `/${ slugify(testName, { lower: true }) }`,
            component: path.resolve('src/components/TestPage.js'),
            context: {
                testName
            }
        });
    });
}
