import React, {Component, Fragment} from "react";
import {render} from "react-dom";


class ItemAdder extends Component {
render(){
    return(
        <Fragment>
            <div>
                <div className="text-style">Добавить</div>
                <input className="input-style" type="text"/>
            </div>
            <div>
                <div className="text-style">Удалить</div>
                <input className="input-style" type="text"/>
            </div>
        </Fragment>
    )
}
}

export {ItemAdder}