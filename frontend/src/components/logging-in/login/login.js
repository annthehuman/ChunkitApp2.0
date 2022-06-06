import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import Logo from "../../../common_components/logo";
import CustomHeader from "../../../common_components/header";
import CommonInput from "../../../common_components/input";
import { TextField } from "@mui/material";
import CustomButton from "../../../common_components/button";
class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state.username, this.state.password)
    }

    handleSubmit(event) {
        // alert('A username and password was submitted: ' + this.state.username + " " + this.state.password);
        event.preventDefault();
        fetch('/auth/token/login/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
            }).then(data => {
            if (!data.ok){
                throw Error(data.status);
            }
            const result =  data.json() 
            return result
            }).then(result => {
                console.log('такen', result)
                // localStorage.setItem('access_token', result.auth_token)
                document.cookie = `access_token=${result.auth_token}`
            }).then(() => {
                this.props.history.push('/')
            }).catch((data) => {
            console.log(`Try again! Error: ${Error(data)}`)
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <Stack direction='column' spacing={2} mt={'35px'} alignItems="center">
                <Logo/>
                <CustomHeader text='ChunkitApp 2.0'/>
                
                <TextField 
                    name="username" 
                    id="username" 
                    sx={{ width:'244px' }}
                    label="example@email.com" 
                    variant="outlined" 
                    value={this.state.username}
                    onChange={this.handleChange}
                    type='email'
                    />

                <TextField 
                    name="password" 
                    id="examplePassword" 
                    sx={{ width:'244px' }}
                    label="password" 
                    variant="outlined" 
                    value={this.state.password}
                    onChange={this.handleChange}
                    type='password'
                    />
                
                <Link to="/reset_password">
                Forgot password?
                </Link>
                <Stack direction='row' spacing={2} mt={'82px'}>
                <CustomButton text='Log In' theme='blue' type="submit" value="Submit" />
                <Link to='/signup/'>
                <CustomButton theme='black' text='Sign Up' type="button" value="Submit" />
                </Link>
                </Stack>
            </Stack>
            </form>
        )
    }
}
export default Login;