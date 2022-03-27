import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";


class Authorized extends Component{
    render() {
        return (
            <div style={{'width': '70%', 'margin': 'auto'}}>

                You are authourized! 
                <br/>
                <br/>
                <Link to='/login/'>
                    Now you can login
                </Link>
            </div>
        )
    }
}
export default Authorized;