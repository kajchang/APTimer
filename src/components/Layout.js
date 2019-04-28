import React, { Fragment } from 'react';
import { AppBar, Grid, Toolbar } from '@material-ui/core';
import { Link } from 'gatsby';

import '../styles/layout.css';

const Layout = ({ children }) => (
    <Fragment>
        <AppBar position='static'>
            <Toolbar>
                <Link to='/' style={ { color: 'white' } }>AP Timer</Link>
            </Toolbar>
        </AppBar>
        <Grid container direction='column' justify='center' alignItems='center' style={ {
            height: 'calc(70% - 64px)'
        } }>
            { children }
        </Grid>
    </Fragment>
);

export default Layout;
