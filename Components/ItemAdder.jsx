import React, {Component, Fragment} from "react";
import {render} from "react-dom";


class ItemAdder extends Component {
state ={
  items : [],
  text: null
};
    changeHandler = (event) =>  {
        event.currentTarget.value ;
        this.setState({text: event.currentTarget.value});
        this.items.push(event.currentTarget.value)
        this.setState({
        })
    };
render(){
    return(
        <form>
            <p><b>Как по вашему мнению расшифровывается аббревиатура?</b></p>
            <input type="text" value={text} onChange={this.changeHandler}/>
        </form>
    )
}
}

export {ItemAdder}