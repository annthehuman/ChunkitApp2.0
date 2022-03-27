import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";


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
            <div style={{'width': '70%', 'margin': 'auto'}}>Login

                <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="exampleEmail">
                    Email to send link to reset password
                    </Label>
                    <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="Insert email"
                    type="text"
                    value={this.state.email}
                    onChange={this.handleChange}
                    />
                </FormGroup>
                
                <Button type="submit" value="Submit">Submit</Button>
                </Form>
            </div>
        )
    }
}
export default SendEmailResetPassword;