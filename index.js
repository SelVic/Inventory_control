import React, {Fragment} from "react";
import { render } from "react-dom";
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
// import {ItemAdder} from "./Components/ItemAdder"
import InputField from "./Components/ItemAdder"
import {BookTable} from "./Components/BookTable"
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const  a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));


const App = props => {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return(
        <Fragment>
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Item One" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
        </div>
        <Router>
            <div>
                <nav className="header">
                    <p>
                        <Link className="header-item" to="/">EditTable</Link>
                        <Link className="header-item" to="/table">Table</Link>
                    </p>
                </nav>
                <Switch>
                    <Route path="/table">
                        <BookTable/>
                    </Route>
                    <Route path="/">
                        <InputField/>
                    </Route>
                </Switch>
            </div>
        </Router>
        </Fragment>
    );
}

render(<App/>, document.querySelector("#root"))