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
    const [historyData, updateHistoryData] = useState([])
    const [submitted, updateSubmitted] = useState(false)

    const deleteHandler = (historyId, action, amount) => {
        // const payLoad = {
        //     id: historyId,
        //     action: action,
        //     amount: amount,
        // };
        // axios({
        //     url: "/deleteHistory",
        //     method: "POST",
        //     data: payLoad
        //     })
        //     .then(()=>{
        //         console.log("История удалена");
        //     })
        //     .catch(()=>{
        //         console.log("Internal server error");
        //     })
        // updateSubmitted(true)
        console.log(historyId, action, amount)
    }


    useEffect(() => {
        updateSubmitted(false)
    })

    useEffect(() => {
        const fetch = async () => {
            const responseHistory = await axios.get('/api/history')
            updateHistoryData(responseHistory.data.map(item => {
                return {uniqueId: item.uniqueId, action: item.action, amount: item.amount, date: item.date, historyId : item._id}
            }))
        }
        console.log("History data has been updated")
        fetch()
    },[submitted]);

    const createHistoryArray = (id) => {
        let historyArray = historyData.filter(item => item.uniqueId == id)
        return historyArray
    }


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
                <TableCell align="right">{row.totalAmount}</TableCell>
                <TableCell align="right">{row.id}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                История
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Дата</TableCell>
                                        <TableCell align="right">Количество</TableCell>
                                        <TableCell align="right">Добавлено / Удалено</TableCell>
                                        <TableCell align="right">Удалить историю</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {createHistoryArray(row.id).map((item) => (
                                        <TableRow key={item.historyId}>
                                            <TableCell component="th" scope="row">
                                                {item.date}
                                            </TableCell>
                                            <TableCell align="right">{item.amount}</TableCell>
                                            <TableCell align="right">{item.action}</TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained" onClick={() => {deleteHandler(item.historyId, item.action, item.amount)}}>
                                                    Remove
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )).sort(()=> {return -1})}
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
        name: PropTypes.string,
        amount: PropTypes.number,
        id: PropTypes.string,
        // history: PropTypes.string
        // // history: PropTypes.arrayOf(
        // //     PropTypes.shape({
        // //         amount: PropTypes.number.isRequired,
        // //         customerId: PropTypes.string.isRequired,
        // //         date: PropTypes.string.isRequired,
        // //         action: PropTypes.string.isRequired,
        // //     }),
        // // ).isRequired,
    }),
};


const BookTable = (props) => {
    const [mongoData, updateMongoData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get('/api')
            updateMongoData(response.data.map(item => {
                return {name: item.name, id: item._id, totalAmount: item.totalAmount}
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
                        <TableCell>Название предмета</TableCell>
                        <TableCell align="right">Количество на складе</TableCell>
                        <TableCell align="right">Идентификатор</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mongoData.map((row) => (
                        <Row key={row.name} row={row} />
                    )).sort(()=> {return -1})}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export {BookTable}



