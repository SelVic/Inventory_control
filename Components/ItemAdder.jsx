import React, {Component, Fragment} from "react";
import {render} from "react-dom";
import InputField from "./InputField";
import Grid from '@material-ui/core/Grid';




class ItemAdder extends Component {
render(){
    return(
        <Grid >
            <div className>
                <div className="text-style">Add item</div>
                <InputField/>
            </div>
            <div>
                <div className="text-style">Remove item</div>
                <InputField/>
            </div>
        </Grid>
    )
}
}

export {ItemAdder}