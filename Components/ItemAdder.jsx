import React, {useEffect, useState, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import { Collapse } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    selectField: {
        width: '100%',
        height: 400,
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
    },
}));
const InputField =()=> {
    const [id, updateId] = useState(0)
    const [name, updateName] = useState("");
    const [amount, updateAmount] = useState(0);
    const [book, updateBook] = useState({});
    const [firstRun, setRun] = useState(false);
    // let [books, updateBooks] = useState([]);
    const classes = useStyles();


    const submitHandler = () => {

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        const payLoad = {
            name: name,
            amount: amount,
            id: id,
            date: today
        };
        if(name == "" || id == 0 || amount ==0)
            alert("Заполните все поля!")
        else{
            axios({
                url: "/savedb",
                method: "POST",
                data: payLoad
            })
                .then(()=>{
                    console.log("Data has been sent to the server");
                    resetFields();
                })
                .catch(()=>{
                    console.log("Internal server error");
                })
        }
    }

    const resetFields = () =>{
        updateName("")
        updateAmount(0)
        updateId(0)
    }

    useEffect(()=>{
        if(firstRun === false){
            setRun(true);
            updateBook({name, amount, id})
        }
        else{
            updateBook({name, amount, id})
        }
    }, [name, amount, id])

    // let setBooks = () =>{
    //     updateBooks([...books, book])
    // }


    const renderRow=(props) => {
        const { index, style } = props;

        return (
            <ListItem button style={style} key={index}>
                <ListItemText primary={`Item ${index + 1}`} />
            </ListItem>
        );
    }

    renderRow.propTypes = {
        index: PropTypes.number.isRequired,
        style: PropTypes.object.isRequired,
    };



    return (
        <div>
            <Fragment>
                Add book
                <form className={classes.root} noValidate autoComplete="off" >
                    <TextField id="standard-basic" label="Name" type="text" value = {name} onChange={e => updateName(e.currentTarget.value)} />
                    <TextField id="standard-basic" label="Amount" type="text" value = {amount} onChange={e => updateAmount(e.currentTarget.value)}/>
                    <TextField id="standard-basic" label="ID" type="text" value = {id} onChange={e => updateId(e.currentTarget.value)}/>
                    <Button variant="contained" color="primary" onClick={() => {submitHandler()}}>
                        Submit
                    </Button>
                </form>
                <div className={classes.root}>
                    <FixedSizeList height={400} width={300} itemSize={46} itemCount={200}>
                        {renderRow}
                    </FixedSizeList>
                </div>
            </Fragment>
        </div>
    )
}

export default InputField