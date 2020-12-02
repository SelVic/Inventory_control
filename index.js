import React, {Fragment} from "react";
import { render } from "react-dom";
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
import {BrowserRouter as Router, Switch, Route, Link, NavLink} from "react-router-dom";
// import {ItemAdder} from "./Components/ItemAdder"
import InputField from "./Components/ItemAdder"
import {ItemTable} from "./Components/ItemTable"



const App = props => {
    return(
        <Router>
            <Fragment>
                <nav className="header">
                        <NavLink activeClassName="selected" className="header-item" exact to="/">Управление</NavLink>
                        <NavLink activeClassName="selected" className="header-item" exact to="/table">Склад</NavLink>
                </nav>
                <Switch>
                    <Route path="/table">
                        <ItemTable/>
                    </Route>
                    <Route path="/">
                        <InputField/>
                    </Route>
                </Switch>
            </Fragment>
        </Router>
    );
}

render(<App/>, document.querySelector("#root"))