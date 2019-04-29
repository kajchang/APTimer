const path = require('path');
const slugify = require('slugify');

const tests = require('./src/data/tests');

exports.createPages = ({ actions }) => {
    const { createPage } = actions;

    tests.forEach(test => {
        createPage({
            path: `/${ slugify(test.name, { lower: true }) }`,
            component: path.resolve('src/components/TestPage.js'),
            context: test
        });
    });
}
