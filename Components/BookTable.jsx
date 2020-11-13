import React, {useEffect, useState, Fragment} from 'react';
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
import axios from "axios";


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});





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
                <TableCell align="right">Количество будет здесь</TableCell>
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
                                        <TableCell align="right">Action</TableCell>
                                        <TableCell align="right">Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                {/*<TableBody>*/}
                                {/*    {row.history.map((historyRow) => (*/}
                                {/*        <TableRow key={historyRow.date}>*/}
                                {/*            <TableCell component="th" scope="row">*/}
                                {/*                {historyRow.date}*/}
                                {/*            </TableCell>*/}
                                {/*            <TableCell>Vic</TableCell>*/}
                                {/*            <TableCell align="right"></TableCell>*/}
                                {/*            <TableCell align="right">*/}
                                {/*            </TableCell>*/}
                                {/*            <TableCell align="right">*/}
                                {/*                <Button variant="contained">*/}
                                {/*                    Remove*/}
                                {/*                </Button>*/}
                                {/*            </TableCell>*/}
                                {/*        </TableRow>*/}
                                {/*    ))}*/}
                                {/*</TableBody>*/}
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
        name: PropTypes.string,
        amount: PropTypes.number,
        id: PropTypes.number,
        history: PropTypes.string
        // history: PropTypes.arrayOf(
        //     PropTypes.shape({
        //         amount: PropTypes.number.isRequired,
        //         customerId: PropTypes.string.isRequired,
        //         date: PropTypes.string.isRequired,
        //         action: PropTypes.string.isRequired,
        //     }),
        // ).isRequired,
    }),
};


const BookTable = (props) => {
    const [mongoData, updateMongoData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get('/api')
            updateMongoData(response.data.map(item => {
                return {name: item.name, id: item._id}
            }))
        }
        fetch()
    },[]);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Book name</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">ID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mongoData.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export {BookTable}



