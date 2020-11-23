import React, {useEffect, useState, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    button: {
        background: "radial-gradient(circle, rgba(198,86,59,1) 27%, rgba(150,39,21,1) 100%)",
        color: "white",
    },
    input: {
        '& label.Mui-focused': {
            color: '#962715',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#962715',
        },

    },
    select: {
        '& .MuiInput-underline:after': {
            borderBottomColor: '#962715',
        },
    },
    adder: {
        marginBottom: "15px",
        minWidth: 150
    },
}));
const InputField =()=> {
    const [description, updateDescription] = useState("")
    const [name, updateName] = useState("");
    const [amount, updateAmount] = useState("");
    const [amountDel, updateAmountDel] = useState("");
    const [item, updateItem] = useState('');
    const [open, updateOpen] = useState(false);
    const [itemDel, updateItemDel] = useState('');
    const [openDel, updateOpenDel] = useState(false);
    const [mongoData, updateMongoData] = useState([]);
    const [rendered, updateRendered] = useState(false)
    const classes = useStyles();

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get('/api')
            updateMongoData(response.data.map(item => {
                return {name: item.name, description: item.description, id: item._id, totalAmount: item.totalAmount}
            }))
        }
        console.log('Mongo data updated')
        fetch()
    },[rendered]);

    useEffect(() => {
        updateRendered(false)
    })


    const handleChange = (event) => {
        updateItem(event.target.value);
    };

    const handleClose = () => {
        updateOpen(false);
    };

    const handleOpen = () => {
        updateOpen(true);
    };

    const handleChangeDelete = (event) => {
        updateItemDel(event.target.value);
    };

    const handleCloseDelete = () => {
        updateOpenDel(false);
    };

    const handleOpenDelete = () => {
        updateOpenDel(true);
    };

    const dateCount = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        return today
    }

    const submitNewItem = () => {
        let today = dateCount()

        const payLoad = {
            name: name,
            description: description,
            totalAmount : 0,
            date: today
        };
        if(name == "" || mongoData.some(item => item.name == name))
            alert("Поле наименования не заполнено, либо такой предмет уже существует в базе")
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
            updateRendered(true)
        }
    }

    const submitNewHistoryAdd = () => {
        let today = dateCount()
        const payLoadHistory = {
            uniqueId: item,
            action: "Added",
            amount: amount,
            date: today
        };
        if(amount == 0 || item == "")
            alert("Заполните все поля!")
        else
            axios({
                url: "/savedb/history",
                method: "POST",
                data: payLoadHistory
            })
                .then(()=>{
                    console.log("History has been sent to the server");
                    resetHistoryFields();
                })
                .catch(()=>{
                    console.log("Internal server error");
                })
        updateRendered(true)
    }

    const submitNewHistoryDel = () => {
        let today = dateCount()
        const payLoadHistory = {
            uniqueId: itemDel,
            action : "Deleted",
            amount: amountDel,
            date: today
        };
        if(amountDel == 0 || itemDel == "")
            alert("Заполните все поля!")
        else if(mongoData.some(item => item.id == itemDel && (item.totalAmount < amountDel)))
            alert("Вы ввели слишком большое количество для списания, в базе недостаточно предметов этого наименования")
        else
        axios({
            url: "/savedb/history",
            method: "POST",
            data: payLoadHistory
        })
            .then(()=>{
                console.log("History has been sent to the server");
                resetHistoryFields();
            })
            .catch(()=>{
                console.log("Internal server error");
            })
        updateRendered(true)
    }


    const resetFields = () =>{
        updateName("")
        updateDescription("")
    }

    const resetHistoryFields = () =>{
        updateAmount(0)
        updateAmountDel(0)
        updateItem("")
        updateItemDel("")
    }

    return (
        <div className="input-container">
            <Fragment>
                <div className="mr-20">
                    <div className="text-style">Внести новое наименованиеу</div>
                    <form className={`input-style ${classes.root}`} noValidate autoComplete="off" >
                        <TextField id="standard-basic" className={classes.input} label="Наименование" type="text" value = {name} onChange={e => updateName(e.currentTarget.value)} />
                        <TextField id="standard-basic" className={classes.input} label="Описание" type="text" value = {description} onChange={e => updateDescription(e.currentTarget.value)}/>
                        <Button className={classes.button} variant="contained" onClick={() => {submitNewItem()}}>
                            Внести
                        </Button>
                    </form>
                </div>
                <div className={`mt-40 ${classes.select}`}>
                    <div className="text-style">Поступление</div>
                    <form className={`input-style ${classes.root}`} noValidate autoComplete="off">
                        <Select className={classes.select}
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={item}
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {mongoData.map((item) =>
                                <MenuItem key={item.id} value = {item.id} >{item.name}</MenuItem>
                            )}
                        </Select>
                        <TextField className={classes.input} id="standard-basic" label="Количество" type="text" value={amount} onChange = {e => updateAmount(e.currentTarget.value)}/>
                        <Button variant="contained" className={classes.button} onClick = {() => submitNewHistoryAdd()}>
                            Добавить
                        </Button>
                    </form>
                </div>
                <div className={`mt-40 ${classes.select}`}>
                    <div className="text-style">Списание</div>
                    <form className={`input-style ${classes.root}`} noValidate autoComplete="off">
                        <Select className={classes.select}
                            open={openDel}
                            onClose={handleCloseDelete}
                            onOpen={handleOpenDelete}
                            value={itemDel}
                            onChange={handleChangeDelete}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {mongoData.map((item) =>
                                <MenuItem key={item.id} value = {item.id} item={item}>{item.name}</MenuItem>
                            )}
                        </Select>
                        <TextField id="standard-basic" className={classes.input} label="Количество" type="text" value={amountDel} onChange = {e => updateAmountDel(e.currentTarget.value)}/>
                        <Button variant="contained" className={classes.button} onClick = {() => submitNewHistoryDel()}>
                            Списать
                        </Button>
                    </form>
                </div>
            </Fragment>
        </div>
    )
}

export default InputField