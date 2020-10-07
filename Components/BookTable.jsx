import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {BookItem} from "./BookItem.jsx"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: 7,
    },
}));

const BookTable = () => {
    const [spacing, setSpacing] = React.useState(7);
    const classes = useStyles();
    return (
        <div>
        <Grid container className={classes.root} spacing={7}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={spacing}>
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                        <Grid>
                            <BookItem/>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
        </div>
    );
}

export {BookTable}