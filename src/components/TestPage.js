import React, { useState, useEffect, useRef }  from 'react';
import { Grid, Paper } from '@material-ui/core';
import Layout from './Layout';

import { withStyles } from '@material-ui/core/styles';

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

// sad regex :(
const sectionRegex = /((?:[A-Z][a-z]+ ?)+) ?— ?(~?\d+(?: to \d+)?) (?:[A-Z][a-z]+[- ]?)+ ?\| ((?:~? ?(?:\d+) (?:[Mm]inutes|[Hh]ours?),?\s)+)(?:\(includes a? ?(\d+)-minute reading period\) )?\| ?([\d.]+)% of Exam Score/g;

const parseTimeText = text => text.toLowerCase().split(',').reduce((acc, cur) => {
    const [, amount, unit] = /(\d+) (minute|hour)s?/g.exec(cur.trim());
    return acc + amount * {
        minute: 60,
        hour: 60 * 60
    }[unit];
}, 0);

const Section = withStyles({
    section: {
        '&:hover': {
            background: 'rgba(0, 0, 0, 0.08)',
        }
    }
})(({ name, sectionText, classes, onClick }) => {
    const [, type, questions, time, , scorePercentage] = sectionRegex.exec(sectionText);
    sectionRegex.lastIndex = 0;

    return (
        <Paper
            className={ classes.section }
            style={ { padding: 15, margin: 10, width: 600, maxWidth: '85vw', cursor: 'pointer' } }
            onClick={ onClick }
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

const Timer = ({ sectionTitle, sectionText, cancel }) => {
    const [, type, questions, time] = sectionRegex.exec(sectionText);
    sectionRegex.lastIndex = 0;

    const [timeRemaining, setTimeRemaining] = useState(parseTimeText(time));

    useInterval(() => {
        if (timeRemaining > 0) {
            setTimeRemaining(timeRemaining - 1);
        }
    }, 1000);

    return (
        <Paper style={ { padding: 15, margin: 10, width: 600, maxWidth: '85vw' } }>
            <span
                style={ { cursor: 'pointer' } }
                onClick={ cancel }
            >‹ Back</span>
            <Grid container direction='column' alignItems='center'>
                <h3>{ sectionTitle } - { type }</h3>
                <h1>{ new Date(1000 * timeRemaining).toISOString().substr(12, 7) }</h1>
                <h4>Pacing: You should be at around Question { parseInt(questions) - Math.ceil(parseInt(questions) * (timeRemaining / parseTimeText(time)) ) }</h4>
            </Grid>
        </Paper>
    );
}

const TestPage = ({ pageContext }) => {
    const { name, sections } = pageContext;

    const [selectedSection, setSelectedSection] = useState(null);

    return (
        <Layout style={ {
            minHeight: 'calc(85% - 64px)'
        } }>
            <h3>{ name }</h3>
            { selectedSection ? <Timer
                sectionTitle={ selectedSection }
                sectionText={ sections[selectedSection] }
                cancel={ () => setSelectedSection(null) }
            /> : Object.keys(sections).map((section, idx) =>
                <Section
                    key={ idx }
                    name={ section }
                    sectionText={ sections[section] }
                    onClick={ () => setSelectedSection(section) }
                />
            ) }
        </Layout>
    );
}

export default TestPage;
