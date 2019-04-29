const fs = require('fs');
const path = require('path');

const axios = require('axios');
const cheerio = require('cheerio');

axios.get('https://apcentral.collegeboard.org/courses')
    .then(resp => {
        const $ = cheerio.load(resp.data);
        return $('#block-course-index-course-index').find('li').toArray().map(test => $(test).text().trim()).sort();
    })
    .then(tests => {
        fs.writeFileSync(path.join(__dirname, 'src/data/tests.json'), JSON.stringify(tests));
    });
