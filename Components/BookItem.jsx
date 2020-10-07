import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: 10,
        margin: 6,
        maxWidth: 400,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

const BookItem = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={6}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src="" alt ="Picture" />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={6}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    Book Example
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    ID: 123456789
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export {BookItem}