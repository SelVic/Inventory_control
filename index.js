import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {ItemAdder} from "./Components/ItemAdder"
import {Table} from "./Components/Table"

const App = props => {
    return(
        <Router>
            <div>
                <nav>
                    <ul className="header">
                        <Link className="header-item" to="/">AddItem</Link>
                        <Link className="header-item" to="/table">Table</Link>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/table">
                        <Table/>
                    </Route>
                    <Route path="/">
                        <ItemAdder/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

render(<App/>, document.querySelector("#root"))