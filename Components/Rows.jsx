import React, {useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button';
import axios from "axios";
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

const useInventoryStyles = makeStyles({
    tableStyle: {
        maxWidth: 1300,
        margin: "auto",
        ['@media (max-width:715px)']: {
            root: {
                width: "100%"
            },
        },
    },
    inputStyle: {
        '& label.Mui-focused': {
            color: '#962715',
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#962715',
            },
        },
        width: "50ch",
        marginBottom: "25px",
    }
})


const Row = (props) => {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();
    const [historyData, updateHistoryData] = useState([])
    const [openDialog, setOpenDialog] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));



    const fetch = async () => {
        const responseHistory = await axios.get('/api/history')
        updateHistoryData(responseHistory.data.map(historyItem => {
            return {
                uniqueId: historyItem.uniqueId,
                action: historyItem.action,
                amount: historyItem.amount,
                date: historyItem.date,
                historyId : historyItem._id,
                customer: historyItem.customer,
                customerType: historyItem.customerType
            }
        }))
    }



    const deleteHistoryHandler = (itemId, historyId, action, amount) => {
        const payLoad = {
            itemId: itemId,
            historyId: historyId,
            action: action,
            amount: amount,
        };
        axios({
            url: "/deleteHistory",
            method: "POST",
            data: payLoad
        })
            .then(()=>{
                console.log("История удалена");
            })
            .catch(()=>{
                console.log("Internal server error");
            })
        fetch()
    }

    const deleteItemHandler = (itemId) => {

        const handleClickOpen = () => {
            setOpenDialog(true);
        };

        const handleCloseYes = () => {
            const payLoad = {
                itemId: itemId,
            };
            axios({
                url: "/deleteItem",
                method: "POST",
                data: payLoad
            })
                .then(()=>{
                    console.log("Предмет удален");
                })
                .catch(()=>{
                    console.log("Internal server error");
                })
            setOpenDialog(false);
            props.handleFetch();
        };

        const handleCloseNo = () =>{
            setOpenDialog(false);
        }

        const handleClose = () =>{
            setOpenDialog(false);
        }

        return (
            <div>
                <DeleteIcon onClick={() => handleClickOpen()}/>
                <Dialog
                    fullScreen={fullScreen}
                    open={openDialog}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{"Вы уверены, что хотите удалить наименование из базы?"}</DialogTitle>
                    <DialogActions align="center">
                        <Button autoFocus onClick={handleCloseNo} color="primary">
                            Нет
                        </Button>
                        <Button onClick={handleCloseYes} color="primary" autoFocus>
                            Да
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    const createHistoryArray = (id) => {
        let historyArray = historyData.filter(history => history.uniqueId == id)
        return historyArray
    }


    const openHandler = () =>{
        fetch()
        setOpen(!open)
    }

    return (
        <Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => openHandler()}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                    <IconButton aria-label="expand row" size="small">
                        {deleteItemHandler(row.id)}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                    {row.description}
                </TableCell>
                <TableCell align="right">{row.totalAmount}</TableCell>
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
                                        <TableCell align="right">Покупатель / Поставщик</TableCell>
                                        <TableCell align="right">Добавлено / Списано</TableCell>
                                        <TableCell align="right">Удалить историю</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {createHistoryArray(row.id).map((history) => (
                                        <TableRow key={history.historyId}>
                                            <TableCell component="th" scope="row">
                                                {history.date}
                                            </TableCell>
                                            <TableCell align="right">{history.amount}</TableCell>
                                            <TableCell align="right">{history.action === "Deleted" ? `Покупатель: ${history.customer}` : `Поставщик: ${history.customer}`}</TableCell>
                                            <TableCell align="right">{history.action === "Deleted" ? "Списано" : "Добавлено"}</TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained" onClick={() => {deleteHistoryHandler(row.id, history.historyId, history.action, history.amount), fetch(), props.handleFetch()}}>
                                                    Удалить
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
        </Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        name: PropTypes.string,
        amount: PropTypes.number,
        id: PropTypes.string,
    }),
};


export default Row