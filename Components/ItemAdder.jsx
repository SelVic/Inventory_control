import React, {useEffect, useState, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
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
    const classes = useStyles();
    const [item, updateItem] = React.useState('');
    const [open, updateOpen] = React.useState(false);
    const [itemDel, updateItemDel] = React.useState('');
    const [openDel, updateOpenDel] = React.useState(false);
    const [mongoData, updateMongoData] = useState([]);
    const [itemId, updateItemId] = useState(0)

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get('/api')
            updateMongoData(response.data.map(item => {
                return {name: item.name, amount: item.amount, description: item.description, id: item._id}
            }))
        }
        fetch()
    },[]);

    // console.log(mongoData)

    const handleChange = (event) => {
        updateItem(event.target.value);
        console.log(event.target.value)
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

    const handleSelect = (event) => {
        console.log(event.target.value)
    }


    //
    const submitHandler = () => {

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        const payLoad = {
            name: name,
            amount: amount,
            description: description,
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
        }
    }

    const resetFields = () =>{
        updateName("")
        updateAmount(0)
        updateDescription("")
    }


    console.log()

    return (
        <div>
            <Fragment>
                Внести новый предмет в базу
                <form className={classes.root} noValidate autoComplete="off" >
                    <TextField id="standard-basic" label="Наименование" type="text" value = {name} onChange={e => updateName(e.currentTarget.value)} />
                    <TextField id="standard-basic" label="Описание" type="text" value = {description} onChange={e => updateDescription(e.currentTarget.value)}/>
                    <Button variant="contained" color="primary" onClick={() => {submitHandler()}}>
                        Submit
                    </Button>
                </form>
                <div className="mt-40">
                    <div>Добавить предметы</div>
                    <form className={classes.root} noValidate autoComplete="off">
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
                            {mongoData.map((item) =>
                                <MenuItem key={item._id} value = {item.name} >{item.name}</MenuItem>
                            )}
                        </Select>
                        <TextField id="standard-basic" label="Количество" type="text" value={amount} onChange = {e => updateAmount(e.currentTarget.value)}/>
                        <Button variant="contained" color="primary">
                            Submit
                        </Button>
                    </form>
                </div>
                <div className="mt-40">
                    <div>Удалить предметы</div>
                    <form className={classes.root}>
                        {/*<InputLabel id="demo-controlled-open-select-label">Выберите предмет</InputLabel>*/}
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
                            {mongoData.map((item) =>
                                <MenuItem key={item._id} value = {item.name} item={item}>{item.name}</MenuItem>
                            )}
                        </Select>
                        <TextField id="standard-basic" label="Количество" type="text" value={amountDel} onChange = {e => updateAmountDel(e.currentTarget.value)}/>
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