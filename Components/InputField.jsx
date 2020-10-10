import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const InputField =()=> {
    const classes = useStyles();
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Name" />
            <TextField id="standard-basic" label="Amount" />
            <TextField id="standard-basic" label="ID" />
            <Button variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
}

export {InputField}