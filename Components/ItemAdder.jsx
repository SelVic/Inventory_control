import React, {useEffect, useState, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";




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


    const submitHandler = () => {
        const payLoad = {
            name: name,
            amount: amount,
            id: id
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
                    {/*<Button variant="contained" color="secondary" onClick={() => {}}>*/}
                    {/*    Submit*/}
                    {/*</Button>*/}
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