import React, { Component } from "react";
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
        // console.log('A username and password was submitted: ' + this.state.username + " " + 
                // this.state.password + " " + this.state.email + " " + this.state.confirmPassword);
        event.preventDefault();
        fetch('/auth/users/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            })
            }).then(data => {
                if (!data.ok){
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
            {!this.state.emailSended ?
            <>
                <p>Login</p>
                <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="username">
                    User name
                    </Label>
                    <Input
                    name="username" 
                    type="text" 
                    placeholder="User name"
                    value={this.state.username} 
                    onChange={this.handleChange}
                    required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="email">
                    Email
                    </Label>
                    <Input
                    name="email" 
                    type="email" 
                    placeholder="Email"
                    value={this.state.email} 
                    onChange={this.handleChange}
                    required
                    />
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
                    required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="confirmPassword">
                    Confirm password 
                    </Label>
                    <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    type="password"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                    required
                    className={this.state.confirmNewPassword ? this.state.confirmNewPassword.length > 0 ? this.state.password == this.state.confirmPassword ? 'is-valid' : 'is-invalid':null : null}
                    />
                </FormGroup>
                <Button type="submit" value="Submit">Submit</Button>
                </Form>
            </>
            :
            <p>Now you have to confirm your email and you will be able to login! See you soon ;)</p>}
            </div>
            </>
        )
    }
}
export default Signup;