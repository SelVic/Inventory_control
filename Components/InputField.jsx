import React, {useEffect, useState, Fragment} from 'react';
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
    let [id, updateId] = useState(0)
    let [name, updateName] = useState("");
    let [amount, updateAmount] = useState(0);
    let [book, updateBook] = useState({name : "", amount: 0, id: 0});
    let [firstRun, setRun] = useState(false);
    let books = [];
    const classes = useStyles();

    // let updateBooks = () =>{
    //     books.push(book)
    //     return books
    // }

    useEffect(()=>{
        if(firstRun === false){
            setRun(true)
            let item = book;
            books.push(item);
        }
        else{
            let item = book;
            books.push(item);
        }
    })


    return (
        <Fragment>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Name" type="text" value = {name} onChange={e => updateName(e.currentTarget.value)} />
                <TextField id="standard-basic" label="Amount" type="text" value = {amount} onChange={e => updateAmount(e.currentTarget.value)}/>
                <TextField id="standard-basic" label="ID" type="text" value = {id} onChange={e => updateId(e.currentTarget.value)}/>
                <Button variant="contained" color="primary" onClick={() => {updateBook({name, amount, id}),  console.log(books) }}>
                    Submit
                </Button>
            </form>
        </Fragment>
    )
}

export default InputField
