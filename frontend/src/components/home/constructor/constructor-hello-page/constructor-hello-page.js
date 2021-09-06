import React, {Component} from 'react';
import styled from 'styled-components';
import {  Input, FormGroup, Label, Form, Button } from 'reactstrap';


export default class HelloPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isClicked: false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.exampleClick = this.exampleClick.bind(this);
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
        if (formData) {
            this.props.history.push("/constructor/consent");
          }
    }
    exampleClick(){
      const a = document.getElementById('helloCustom'),
            b = document.getElementById('helloExample'),
            c = document.getElementById('helloH6');
      this.state.isClicked ? (a.value = '', b.style.display = 'block', c.style.display = 'block', this.setState({isClicked: false})): (a.value = b.textContent, b.style.display = 'none', c.style.display = 'none', this.setState({isClicked: true}));
    }
    render () {
        return(
            <>
            <h1>Write your hello page</h1>
            <Form
            onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label for="helloCustom">Insert here the text that will greet your participants</Label> 
                    <Input 
                    required
                    id='helloCustom'
                    type='textarea'
                    name='helloCustom'>
                    </Input>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                    <Input type="checkbox"  name='helloExample' onClick={this.exampleClick}/>{' '}
                    To use text sample, click here.
                    </Label>
                </FormGroup>
                <h6 id='helloH6'>Text sample:</h6>
                <p id='helloExample'>Please make sure that you have plugged in&nbsp;your headphones/earphones. It&nbsp;is&nbsp;vital that you complete the experiment while wearing them.</p>
                <Button onClick={() => {this.props.toggle(String(+this.props.active - 1))}}>Back</Button><Button onClick={() => {this.props.toggle(String(+this.props.active + 1))}}>Next</Button>

            </Form>
            </>
        )
        }
}