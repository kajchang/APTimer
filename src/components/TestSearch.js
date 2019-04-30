import React, { Fragment, useState, useRef } from 'react';
import { Button, MenuItem, Popper, Paper, TextField } from '@material-ui/core';

import { navigate } from '@reach/router';
import slugify from 'slugify';
import isEqual from 'lodash/isEqual';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

const tests = require('../data/tests.json').map(test => test.name);

const TestSearch = () => {
    const [value, setValue] = useState('');
    const inputRef = useRef(null);

    const suggestions = tests
        .filter(test => !isEqual(match(test, value), []))
        .sort((a, b) => match(b, value).length - match(a, value).length)
        .slice(0, 5);

    return (
        <Fragment>
            <TextField
                style={ {
                    width: '70vw',
                    maxWidth: 760
                } }
                inputRef={ inputRef }
                value={ value }
                onChange={ e => setValue(e.target.value) }
                inputProps={ {
                    onKeyDown: e => {
                        if (e.keyCode === 13) {
                            if (tests.includes(value)) {
                                navigate(slugify(value, { lower: true }));
                            } else {
                                setValue(suggestions[0]);
                            }
                        }
                    }
                } }
                placeholder='Search AP Tests...'
            />
            <Popper open={ Boolean(suggestions) && !tests.includes(value) } anchorEl={ inputRef.current }>
                <Paper
                    style={ { width: inputRef.current ? inputRef.current.clientWidth : null } }>
                    {
                        suggestions.map((suggestion, idx) => <MenuItem key={ idx } onClick={ () => {
                            setValue(suggestion);
                        } } style={ { cursor: 'pointer' } }>{
                            parse(suggestion, match(suggestion, value)).map((match, idx) => <span key={ idx } style={ {
                                opacity: match.highlight ? 1 : 0.5,
                                whiteSpace: 'pre'
                            } }>
                                { match.text }
                            </span>)
                        }</MenuItem>
                        )
                    }
                </Paper>
            </Popper>
            <Button onClick={ () => {
                if (tests.includes(value)) {
                    navigate(slugify(value, { lower: true }));
                }
            } }>Select</Button>
        </Fragment>
    );
}

export default TestSearch;
