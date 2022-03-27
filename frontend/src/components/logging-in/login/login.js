import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import Logo from "../../../common_components/logo";
import CustomHeader from "../../../common_components/header";
import CommonInput from "../../../common_components/input";
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
            <Stack  spacing={4} mt={'35px'} alignItems="center">
            Login
                <Logo/>
                <CustomHeader text='ChunkitApp'/>
                
                <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <CommonInput/>
                    <br/>
                    {/* <Label for="username">
                        
                    Username
                    </Label>
                    <Input
                    id="username"
                    name="username"
                    placeholder="Insert name"
                    type="text"
                    value={this.state.username}
                    onChange={this.handleChange}
                    /> */}
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">
                    Password
                    </Label>
                    <Input
                    id="examplePassword"
                    name="password"
                    placeholder="Insert password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    />
                </FormGroup>
                <Link to="/reset_password">
                Forgot password?
                </Link>
                <br/>
                <Button type="submit" value="Submit">Submit</Button>
                </Form>
            </Stack>
        )
    }
}
export default Login;