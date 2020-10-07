import React, {Component, Fragment} from "react";
import {render} from "react-dom";


class ItemAdder extends Component {
render(){
    return(
        <Fragment>
            <div>
                <input type="text"/>
            </div>
            <div>
                <input type="text"/>
            </div>
        </Fragment>
    )
}
}

export {ItemAdder}