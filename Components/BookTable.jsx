import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button';


// const count =(props) => {
//
// }


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function createData(name, amount, price, id) {
    return {
        name,
        amount,
        price,
        id,
        history: [
            { date: '2020-01-05', customerId: 'Director', amount: 3, action: "Added" },
            { date: '2020-01-02', customerId: 'Anonymous', amount: 1 , action: "Sold"}
        ],
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.id}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price (RUB)</TableCell>
                                        <TableCell align="right">Action</TableCell>
                                        <TableCell align="right">Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                            <TableCell align="right">
                                                {historyRow.action === "Sold" ? Math.round(historyRow.amount * row.price * 100) / 100 : "Added books"}
                                            </TableCell>
                                            <TableCell align="right">
                                                {historyRow.action}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained">
                                                    Remove
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        name: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
                action: PropTypes.string.isRequired,
            }),
        ).isRequired,
    }).isRequired,
};

const rows = [
    createData('Lord of the Rings', 159, 1000, 23429),
    createData('Мертвые души', 237, 2000, 1234),
    createData('bookname', 262, 1500, 23479),
    createData('bookname', 305, 1600, 345),
    createData('bookname', 356, 1700, 6455),
];

const BookTable= (props) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Book name</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">ID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export {BookTable}



// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import {BookItem} from "./BookItem.jsx"
//
// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     paper: {
//         height: 140,
//         width: 100,
//     },
//     control: {
//         padding: 7,
//     },
// }));
//
// const BookTable = () => {
//     const [spacing, setSpacing] = React.useState(7);
//     const classes = useStyles();
//     return (
//         <div>
//         <Grid container className={classes.root} spacing={7}>
//             <Grid item xs={12}>
//                 <Grid container justify="center" spacing={spacing}>
//                     {[0, 1, 2, 3, 4, 5].map((value) => (
//                         <Grid>
//                             <BookItem/>
//                         </Grid>
//                     ))}
//                 </Grid>
//             </Grid>
//         </Grid>
//         </div>
//     );
// }
//
// export {BookTable}