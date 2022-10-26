import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appbar: {
        alignItems: 'center',
    }
}));

const Header = () => {
    const classes = useStyles();

    const handleHomeClick = () => {
        window.location.href = process.env.REACT_APP_BASE_URL
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appbar}>
                <Toolbar variant="dense">

                    <Button onClick={handleHomeClick} color="inherit">
                        <Typography variant="h6" color="inherit">
                            共有カレンダー
                        </Typography>
                    </Button>

                </Toolbar>
            </AppBar>
        </div>
    );
}
export default Header;