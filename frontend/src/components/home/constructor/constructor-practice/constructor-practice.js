import React, {Component} from 'react';
import styled from 'styled-components';
import {  Input, FormGroup, Label, Form, Button } from 'reactstrap';


export default class Practice extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
    }
    onSubmit(e) {
        e.preventDefault();
        console.log('e'+e.target)
        const form = e.target
        console.log(e)
        const formData = new FormData(form);
        console.log(form)
        fetch('/experement_data/', {
          method: "POST",
          // headers: {
          //   'X-CSRFToken': object.csrfmiddlewaretoken
          // },
          body: formData
        }).then(data => {
          if (!data.ok){
            throw Error(data.status);
          }
          //console.log('так')
        }).catch((data) => {
          console.log(`Try again! Error: ${Error(data.status)}`)
        }).finally(() => {
          form.reset();
        });
        this.props.history.push("/constructor/experiment");
    }


    render () {
        return(
            <>
            <h1>Upload your practice extracts</h1>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="experimentFile">Extracts and extracts</Label>
                <Input type="file" name="file" id="experimentFile" />

              </FormGroup>
              <br/>
              <Button onClick={() => {this.props.toggle(String(+this.props.active - 1))}}>Back</Button><Button onClick={() => {this.props.toggle(String(+this.props.active + 1))}}>Next</Button>
            </Form>
            </>
        )
        }
}