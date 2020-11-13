import React, {useEffect, useState, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    adder: {
        marginBottom: theme.spacing(15)
    },
}));
const InputField =()=> {
    const [id, updateId] = useState(0)
    const [name, updateName] = useState("");
    const [amount, updateAmount] = useState(0);
    const [book, updateBook] = useState({});
    const [firstRun, setRun] = useState(false);
    const classes = useStyles();
    const [item, setItem] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [itemDel, setItemDel] = React.useState('');
    const [openDel, setOpenDel] = React.useState(false);


    const handleChange = (event) => {
        setItem(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleChangeDelete = (event) => {
        setItemDel(event.target.value);
    };

    const handleCloseDelete = () => {
        setOpenDel(false);
    };

    const handleOpenDelete = () => {
        setOpenDel(true);
    };


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


    return (
        <div>
            <Fragment>
                Добавить предмет
                <form className={classes.root} noValidate autoComplete="off" >
                    <TextField id="standard-basic" label="Name" type="text" value = {name} onChange={e => updateName(e.currentTarget.value)} />
                    <TextField id="standard-basic" label="Amount" type="text" value = {amount} onChange={e => updateAmount(e.currentTarget.value)}/>
                    <TextField id="standard-basic" label="ID" type="text" value = {id} onChange={e => updateId(e.currentTarget.value)}/>
                    <Button variant="contained" color="primary" onClick={() => {submitHandler()}}>
                        Submit
                    </Button>
                </form>
                <div className="mt-40">
                    <div>Добавить</div>
                    <form className={classes.root}>
                        <InputLabel id="demo-controlled-open-select-label">Выберите предмет</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={item}
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>1</MenuItem>
                            <MenuItem value={20}>2</MenuItem>
                            <MenuItem value={30}>3</MenuItem>
                        </Select>
                        <TextField id="standard-basic" label="Количество" type="text"/>
                        <Button variant="contained" color="primary">
                            Submit
                        </Button>
                    </form>
                </div>
                <div className="mt-40">
                    <div>Удалить</div>
                    <form className={classes.root}>
                        <InputLabel id="demo-controlled-open-select-label">Выберите предмет</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={openDel}
                            onClose={handleCloseDelete}
                            onOpen={handleOpenDelete}
                            value={itemDel}
                            onChange={handleChangeDelete}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>1</MenuItem>
                            <MenuItem value={20}>2</MenuItem>
                            <MenuItem value={30}>3</MenuItem>
                        </Select>
                        <TextField className={classes.adder} id="standard-basic" label="Количество" type="text"/>
                        <Button variant="contained" color="primary">
                            Submit
                        </Button>
                    </form>
                </div>
            </Fragment>
        </div>
    )
}

export default InputField