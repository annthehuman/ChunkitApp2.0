import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { ThemeConsumer } from "styled-components";

class PasswordReset extends Component{
    constructor(props) {
        super(props);
        this.state = {newPassword: "", confirmNewPassword: ""};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        // alert('A username and password was submitted: ' + this.state.username + " " + this.state.password);
        event.preventDefault();
        console.log('uid', this.props.match.params.uid)
        console.log('token', this.props.match.params.token)
        fetch('/auth/users/reset_password_confirm/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                uid: this.props.match.params.uid,
                token: this.props.match.params.token,
                new_password: this.state.newPassword,
                re_new_password: this.state.confirmNewPassword
            })
            }).then(data => 
                data.json().then(object => {
                    ({status: data.ok, body: object})
                    })
            ).then(result => {
                console.log(result)
                // localStorage.setItem('access_token', result.auth_token)
                // document.cookie = `access_token=${result.auth_token}`
            }).catch((data) => {
               alert(data)
            });
    }

    render() {
        return (
            <div style={{'width': '70%', 'margin': 'auto'}}>
                Set new password

                <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="newPassword">
                    New password
                    </Label>
                    <Input
                    id="newPassword"
                    name="newPassword"
                    placeholder="Insert new password"
                    type="password"
                    value={this.state.newPassword}
                    onChange={this.handleChange}
                    autoComplete="new-password"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="confirmNewPassword">
                    Confirm new password
                    </Label>
                    <Input
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    placeholder="Confirm new password"
                    type="password"
                    value={this.state.confirmNewPassword}
                    onChange={this.handleChange}
                    autoComplete="new-password"
                    className={this.state.confirmNewPassword.length > 0 ? this.state.newPassword == this.state.confirmNewPassword ? 'is-valid' : 'is-invalid':null}
                    />
                </FormGroup>
                <Button type="submit" value="Submit">Submit</Button>
                </Form>
            </div>
        )
    }
}
export default PasswordReset;