import React from "react";
import { render } from "react-dom";

const test = () => {
    return (
        <div className="test-container">Hello</div>
    )
}

render(<test/>, document.querySelector("#index"))