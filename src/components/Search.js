import React, { Fragment, useState, useRef } from 'react';
import { Button, Grid, TextField, Popper, Paper, MenuItem } from '@material-ui/core';

import isEqual from 'lodash/isEqual';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

const tests = [
    'AP European History',
    'AP Computer Science Principles',
    'AP Human Geography',
    'AP Physics'
].sort()

const Search = () => {
    const [value, setValue] = useState('');
    const inputRef = useRef(null);

    const suggestions = tests
        .filter(test => !isEqual(match(test, value), []))
        .sort((a, b) => match(b, value).length - match(a, value).length)
        .slice(0, 5);

    return (
        <Fragment>
            <Grid item>
                <TextField
                    style={ {
                        width: '70vw',
                        maxWidth: 760
                    } }
                    inputRef={ inputRef }
                    value={ value }
                    onChange={ e => setValue(e.target.value) }
                    placeholder='Search AP Tests...'
                />
                <Popper open={ Boolean(suggestions) } anchorEl={ inputRef.current }>
                    <Paper
                        style={ { width: inputRef.current ? inputRef.current.clientWidth : null } }>
                        {
                            suggestions.map((suggestion, idx) =>
                                <MenuItem key={ idx }>{
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
            </Grid>
            <Grid item>
                <Button>Select</Button>
            </Grid>
        </Fragment>
    );
}

export default Search;
