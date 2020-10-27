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
    let [book, updateBook] = useState({});
    let [firstRun, setRun] = useState(false);
    let [books, updateBooks] = useState([]);
    const classes = useStyles();

    async function getResponse() {
        let response = await fetch('http://localhost:3000/api/test')
        let content = await response.json()
        console.log(content)
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

    let setBooks = () =>{
        updateBooks([...books, book])
    }

    return (
        <div>
            <Fragment>
                Add book
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Name" type="text" value = {name} onChange={e => updateName(e.currentTarget.value)} />
                    <TextField id="standard-basic" label="Amount" type="text" value = {amount} onChange={e => updateAmount(e.currentTarget.value)}/>
                    <TextField id="standard-basic" label="ID" type="text" value = {id} onChange={e => updateId(e.currentTarget.value)}/>
                    <Button variant="contained" color="primary" onClick={() => {setBooks()}}>
                        Add
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => {getResponse()}}>
                        Submit
                    </Button>
                </form>
            </Fragment>
        </div>
    )
}

export default InputField





// import React, {Component, Fragment} from "react";
// import {render} from "react-dom";
// import InputField from "./InputField";
// import Grid from '@material-ui/core/Grid';
//
//
// class ItemAdder extends Component {
// render(){
//     return(
//         <Grid >
//             <div className>
//                 <div className="text-style">Add item</div>
//                 <InputField/>
//             </div>
//             <div>
//                 <div className="text-style">Remove item</div>
//                 <InputField/>
//             </div>
//         </Grid>
//     )
// }
// }
//
// export {ItemAdder}