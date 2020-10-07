import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {ItemAdder} from "./Components/ItemAdder"
import {BookTable} from "./Components/BookTable"

const App = props => {
    return(
        <Router>
            <div>
                <nav className="header">
                    <p>
                        <Link className="header-item" to="/">AddItem</Link>
                        <Link className="header-item" to="/table">Table</Link>
                    </p>
                </nav>
                <Switch>
                    <Route path="/table">
                        <BookTable/>
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