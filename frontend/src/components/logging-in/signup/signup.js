import React, { Component } from "react";
import Logo from "../../../common_components/logo";
import { Link } from "react-router-dom";
import {  TextField, Typography } from "@mui/material";
import CustomButton from "../../../common_components/button";
import CustomHeader from "../../../common_components/header";
import { Stack } from "@mui/material";

import { Form, FormGroup, Label, Input, Button } from "reactstrap";
class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            email:"",
            confirmPassword:"",
            emailSended: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        console.log('A username and password was submitted: ' + this.state.username + " " + 
                this.state.password + " " + this.state.email + " " + this.state.confirmPassword);
        event.preventDefault();
        fetch('/auth/users/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.email,
                password: this.state.password,
                email: this.state.email
            })
            }).then(data => {
                // data.json())
            // .then(data =>{
            //     console.log(data)
                if (!data.ok){
                    console.log(data.text())
                    alert(data.json())              
                    throw Error(data.json());
                } else {
                const result =  data.json() 
                return result}
            }).then(result => {
                console.log('такen', result)
                // localStorage.setItem('access_token', result.auth_token)
                // document.cookie = `access_token=${result.auth_token}`
            }).then(() => {
                this.setState({emailSended: true})
            }).catch((data) => {
            console.log(`Try again! Error: ${data}`)
            });
    }

    render() {
        return (
            <>
            <div style={{'width': '70%', 'margin': 'auto'}}>
            <Stack direction='column' spacing={2} mt={'35px'} alignItems="center">
                <Logo/>
                <CustomHeader text='ChunkitApp 2.0'/>
            {!this.state.emailSended ?
            <>
                
                
                <form onSubmit={this.handleSubmit}>
                <Stack direction='column' spacing={2} mt={'35px'} alignItems="center">
                <TextField 
                    name="email" 
                    id="email" 
                    sx={{ width:'244px' }}
                    label="example@email.com" 
                    variant="outlined" 
                    value={this.state.email}
                    onChange={this.handleChange}
                    />
                <TextField 
                    name="password" 
                    id="examplePassword" 
                    sx={{ width:'244px' }}
                    label="password" 
                    variant="outlined" 
                    type='password'
                    value={this.state.password}
                    onChange={this.handleChange}
                    />
                <TextField 
                    error = {
                        this.state.password != this.state.confirmPassword ? true : false
                    }
                    name="confirmPassword" 
                    id="confirmPassword" 
                    sx={{ width:'244px' }}
                    label="confirm password" 
                    variant="outlined" 
                    type='password'
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                    />
                <CustomButton theme='black' text='Sign Up' type="submit" value="Submit" />
                </Stack>
                </form>
                
                
            </>
            :
            <>
            <Typography>Thank you for registration!<br/>
            Please сheck your email to confirm your account.</Typography>
            <Link to='/login/'>
            <CustomButton theme='blue' text='Log In'/>
            </Link>
            </>}
            </Stack>
            </div>
            </>
        )
    }
}
export default Signup;