const fs = require('fs');
const path = require('path');

const isEqual = require('lodash/isEqual');
const axios = require('axios');
const cheerio = require('cheerio');

axios.get('https://apcentral.collegeboard.org/courses')
    .then(({ data }) => {
        const $ = cheerio.load(data);
        const testNodes = $('#block-course-index-course-index').find('li').toArray();
        return Promise.all(testNodes.map(testNode =>
                new Promise((resolve, reject) => {
                    axios.get(`https://apcentral.collegeboard.org${ (() => {
                        const link = $(testNode).find('a').attr('href');
                        return link.slice(0, link.indexOf('?'));
                    })() }/exam`)
                        .then(({ data }) => {
                            const $ = cheerio.load(data);
                            const nodes = $('.node.node-free-form-text.view-mode-rich_list').toArray();
                            const examFormatNode = $($(nodes[nodes.findIndex(node => $(node).text().trim() === 'Exam Format') + 1]).find('.field-item.even'));

                            const children = examFormatNode.children().toArray();

                            const title = $('title').text();

                            const testData = {
                                name: title.slice(0, title.indexOf(': The Exam')),
                                sections: {}
                            };

                            children.forEach((child, idx) => {
                                if (child.tagName === 'h3') {
                                    testData.sections[$(child).text()] = $(children[idx + 1]).text();
                                }
                            });

                            resolve(testData);
                        })
                        .catch(() => resolve({}));
                })
        ));
    })
    .then(testData => {
        console.log('Done!');
        fs.writeFileSync(path.join(__dirname, 'src/data/tests.json'), JSON.stringify(testData.filter(data => !(data.sections === undefined) && !isEqual(data.sections, {}))));
    });
