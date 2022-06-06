import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Logo from "../../../common_components/logo";
import { Stack } from "@mui/material";
import CustomButton from "../../../common_components/button";
import CustomHeader from "../../../common_components/header";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";

class SendEmailResetPassword extends Component{
    constructor(props) {
        super(props);
        this.state = {email: ""};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        // alert('A username and password was submitted: ' + this.state.username + " " + this.state.password);
        event.preventDefault();
        console.log('dd')
        fetch('/auth/users/reset_password/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
            })
            }).then(data => {
            if (!data.ok){
                throw Error(data.status);
            } else {
                console.log(data)
            }
            }).catch((data) => {
            console.log(`Try again! Error: ${Error(data.status)}`)
            });
    }

    render() {
        return (
            <div style={{'width': '70%', 'margin': 'auto'}}>
            <Stack direction='column' spacing={2} mt={'35px'} alignItems="center">
                <Logo/>
                <CustomHeader text='ChunkitApp 2.0'/>
                <form onSubmit={this.handleSubmit}>
                <Stack direction='column' spacing={2} alignItems="center">
                    <Typography>Email to send link to reset password</Typography>
                    <TextField 
                        name="email" 
                        id="exampleEmail" 
                        sx={{ width:'244px' }}
                        label="example@email.com" 
                        variant="outlined" 
                        value={this.state.password}
                        onChange={this.handleChange}
                        />
                
                <CustomButton theme='blue' text='Submit' type="submit" value="Submit"/>
                </Stack>
                </form>
                </Stack>
            </div>
        )
    }
}
export default SendEmailResetPassword;