import React  from 'react';
import { Grid, Paper } from '@material-ui/core';
import Layout from './Layout';

import { withStyles } from '@material-ui/core/styles';

const sectionRegex = /((?:[A-Z][a-z]+ ?)+) ?— ?(\d+) (?:[A-Z][a-z]+[- ]?)+ ?\| ((?:(?:\d+) (?:Minutes|Hours?),? )+)(?:\(includes (\d+)-minute reading period\) )?\| ?(\d+)% of Exam Score/g;

const Section = withStyles({
    section: {
        '&:hover': {
            background: 'rgba(0, 0, 0, 0.08)',
        }
    }
})(({ name, sectionText, classes }) => {
    const [, type, questions, time, readingMinutes, scorePercentage] = sectionRegex.exec(sectionText);
    sectionRegex.lastIndex = 0;

    return (
        <Paper
            className={ classes.section }
            style={ { padding: 15, margin: 10, minWidth: 500, cursor: 'pointer' } }
        >
            <Grid container direction='row' justify='space-between' alignItems='flex-start'>
                <div>
                    <strong style={ { display: 'block' } }>{ name }</strong>
                    <span style={ { display: 'block' } }>{ type }</span>
                    <span style={ { display: 'block' } }>
                { questions } Questions — { time }
                        { readingMinutes ? <span> — { readingMinutes } Reading Minutes</span> : null }
                </span>
                    <span style={ { display: 'block' } }>{ scorePercentage }% of Total Score</span>
                </div>
                <div style={ { marginTop: 'auto',  marginBottom: 'auto', fontSize: 36 } }>
                    ›
                </div>
            </Grid>
        </Paper>
    );
});

const TestPage = ({ pageContext }) => {
    const { name, sections } = pageContext;

    return (
        <Layout gridProps={ {
            direction: 'column',
            justify: 'center',
            alignItems: 'center',
            style: {
                height: 'calc(85% - 64px)'
            }
        } }>
            <h3>{ name }</h3>
            { Object.keys(sections).map((section, idx) =>
                <Section
                    key={ idx }
                    name={ section }
                    sectionText={ sections[section] }
                />
            ) }
        </Layout>
    );
}

export default TestPage;
