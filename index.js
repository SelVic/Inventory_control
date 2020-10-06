import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const Test = () => {
    return (
        <div className="test-container">Hello</div>

    )
}

render(<Test/>, document.querySelector("#index"))