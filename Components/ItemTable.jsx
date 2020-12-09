import React, {useEffect, useState, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Row from "./Rows"

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


const ItemTable = () => {
    const classes = useInventoryStyles()
    const [mongoData, updateMongoData] = useState([]);
    const [filtered, updateFiltered] = useState([]);
    const [text, updateText] = useState("")
    const [fetchProgress, updateFetchProgress] = useState(false)
    let searchItem = text.trim().toLowerCase()

    const fetch = async () => {
        const response = await axios.get('/api')
        let responseValue = response.data;
        updateMongoData(responseValue.map(item => {
            return {name: item.name, id: item._id, totalAmount: item.totalAmount, description:item.description}
        }))
        updateFetchProgress(true)
        updateFiltered(responseValue.map(item => {
            return {name: item.name, id: item._id, totalAmount: item.totalAmount, description:item.description}
        }))
    }

    const handleFetch = () => {
        updateFetchProgress(false)
    }

    useEffect(() => {
        let cleanupFunc = false;
        fetch()
        return () => cleanupFunc = true;
    },[fetchProgress]);

    useEffect(() => {
        let result = mongoData.filter(item => item.name.toLowerCase().includes(searchItem))
        updateFiltered(result);
    }, [text])


    return (
        <Fragment>
            <div align="center">
                <TextField className={classes.inputStyle} id="standard-basic" label="Фильтр" type="text" value={text} variant="outlined" onChange = {e => updateText(e.currentTarget.value)}/>
            </div>
        <TableContainer className={classes.tableStyle} component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Название предмета</TableCell>
                        <TableCell align="center">Описание</TableCell>
                        <TableCell align="right">Количество на складе</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filtered.map((row) => (
                        <Row key={row.id} row={row} handleFetch={handleFetch} />
                    )).sort(()=> {return -1})}
                </TableBody>
            </Table>
        </TableContainer>
        </Fragment>
    );
}

export {ItemTable}



