import React  from 'react';
import { Grid, Paper } from '@material-ui/core';
import Layout from './Layout';

import { withStyles } from '@material-ui/core/styles';

// sad regex :(
const sectionRegex = /((?:[A-Z][a-z]+ ?)+) ?— ?(~?\d+(?: to \d+)?) (?:[A-Z][a-z]+[- ]?)+ ?\| ((?:~? ?(?:\d+) (?:[Mm]inutes|[Hh]ours?),?\s)+)(?:\(includes a? ?(\d+)-minute reading period\) )?\| ?([\d.]+)% of Exam Score/g;

const Section = withStyles({
    section: {
        '&:hover': {
            background: 'rgba(0, 0, 0, 0.08)',
        }
    }
})(({ name, sectionText, classes }) => {
    const [, type, questions, time, , scorePercentage] = sectionRegex.exec(sectionText);
    sectionRegex.lastIndex = 0;

    return (
        <Paper
            className={ classes.section }
            style={ { padding: 15, margin: 10, width: 600, maxWidth: '85vw', cursor: 'pointer' } }
        >
            <Grid container direction='row' justify='space-between' alignItems='flex-start'>
                <div>
                    <strong style={ { display: 'block' } }>{ name }</strong>
                    <span style={ { display: 'block' } }>{ type }</span>
                    <span style={ { display: 'block' } }>
                        { questions } Questions — { time }
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
        <Layout>
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
