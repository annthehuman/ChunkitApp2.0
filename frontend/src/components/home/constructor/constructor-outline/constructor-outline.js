import React, {Component} from 'react';
import styled from 'styled-components';
import {  Input, FormGroup, Label, Form, Button } from 'reactstrap';


export default class Outline extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
        this.exampleClick = this.exampleClick.bind(this)
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
            this.props.history.push("/constructor/background");
          }
    }

    exampleClick(){
      const a = document.getElementById('outlineBackgroundTime'),
            b = document.getElementById('outlineMainTime'),
            c = document.getElementById('outlineFeedbackTime'),
            d = document.getElementById('outlineCastom');
      a.required ? (a.required = false, b.required = false, c.required = false, d.required = true ): (a.required = true, b.required = true, c.required = true, d.required = false);
      console.log(d)
    }

    render () {
        return(
            <>
            <h1>Write your session outline page</h1>
            <Form
            onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label for="outlineCastom">Insert here the text that will detail the experimental procedure. To insert an example, click here.</Label> 
                    <Input
                    required 
                    id='outlineCastom'
                    type='textarea'
                    name='outlineCastom'>
                    </Input>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                    <Input type="checkbox"  name='outlineExample' onClick={this.exampleClick}/>{' '}
                    To insert an example, click here.
                    </Label>
                </FormGroup>
                <h6>Example:</h6>
                <p>This experiment session consists of&nbsp;several tasks listed below. It&nbsp;is&nbsp;essential that you complete each of&nbsp;them. Once you finish one task, you will be&nbsp;automatically guided to&nbsp;the next one. The approximate duration of&nbsp;each task is&nbsp;mentioned in&nbsp;parentheses. The main task takes the longest. We&nbsp;recommend that during this task you take a&nbsp;short break.</p>
                <ul>
                  <li><span style={{display: 'inline-flex', alignItems: 'baseline'}}>Background questionnaire (~ <span><Input style={{width: "50px", height: '30px', padding:'3px', marginRight: '10px'}} id='outlineBackgroundTime' type='text' name='outlineBackgroundTime'/></span>min.)</span></li>
                  <li><span style={{display: 'inline-flex', alignItems: 'baseline'}}>Main task (~ <span><Input style={{width: "50px", height: '30px', padding:'3px', marginRight: '10px'}} id='outlineMainTime' type='text' name='outlineMainTime'/></span>min. plus breaks)</span></li>
                  <li><span style={{display: 'inline-flex', alignItems: 'baseline'}}>Feedback questionnaire (~ <span><Input style={{width: "50px", height: '30px', padding:'3px', marginRight: '10px'}} id='outlineFeedbackTime' type='text' name='outlineFeedbackTime'/></span> min.)</span></li>
                </ul>
                <p>We kindly remind you to plug in your headphones.</p>
                <Button onClick={() => {this.props.toggle(String(+this.props.active - 1))}}>Back</Button><Button onClick={() => {this.props.toggle(String(+this.props.active + 1))}}>Next</Button>
            </Form>
            </>
        )
        }
}