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

                            const sections = examFormatNode.children('h3').toArray();
                            const summaries = examFormatNode.children('p').toArray();

                            const testData = {
                                name: 'AP '
                                    .concat($('.course-name').text()
                                        .slice(3)
                                        .split(' ')
                                        .map(word => word.charAt(0).toUpperCase().concat(word.slice(1).toLowerCase()))
                                        .join(' ')),
                                sections: {}
                            };

                            for (let i = 0; i < sections.length; i++) {
                                const section = sections[i];
                                const part = summaries[i];

                                testData.sections[$(section).text()] = $(part).text();
                            }

                            resolve(testData);
                        })
                        .catch(() => resolve({}))
                })
        ));
    })
    .then(testData => {
        fs.writeFileSync(path.join(__dirname, 'src/data/tests.json'), JSON.stringify(testData.filter(data => !isEqual(data, {}))));
    });
