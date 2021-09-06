import React, {Component}  from 'react';
import styled from 'styled-components';
import {  Input, FormGroup, Label, Form, Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
const DivBlok = styled.div`
display:inline-block;
`

export default class Consent extends Component {
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
            this.props.history.push("/constructor/outline");
          }
    }

    exampleClick(){
      const a = document.getElementById('uniname'),
            b = document.getElementById('minutes'),
            c = document.getElementById('time'),
            d = document.getElementById('consentCustom');
      a.required ? (a.required = false, b.required = false, c.required = false, d.required = true ): (a.required = true, b.required = true, c.required = true, d.required = false );
    }

    render() {
        return(
            <>
            <h1>Write your informed consent page</h1>
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label for="consentCustom">Insert here the text of your informed consent</Label> 
                    <Input
                    required
                    id='consentCustom'
                    type='textarea'
                    name='consentCustom'>
                    </Input>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                    <Input type="checkbox"  name='consentExample' onClick={this.exampleClick}/>{' '}
                    To insert an example, click here.
                    </Label>
                </FormGroup>
                <br/>
                <h6>Example:</h6>
                <span style={{marginRight: '10px'}}>This experimental session is part of the research</span>
                <span style={{display: 'inline-flex', alignItems: 'baseline'}}>
                <span style={{marginRight: '10px'}}>project carried out at</span>
                <span><Input style={{ height: '30px', padding:'3px', marginRight: '10px'}} id='uniname' type='text' name='uniname'/></span>. 
                </span>
                <span> By agreeing, you certify your willingness to participate in the study and give us your consent to use the responses for research purposes (preprocessing, analysis, publication, archiving and sharing).</span>
                <p>All your responses will be recorded automatically. Your participation in the study will be completely anonymous.</p>

                    
                <span style={{marginRight: '10px'}}>The duration of the experiment is approximately</span>
                <span style={{display: 'inline-flex', alignItems: 'baseline'}}>
                <span><Input style={{width: "50px", height: '30px', padding:'3px', marginRight: '10px'}} id='minutes' type='text' name='minutes'/></span>
                 minutes with a possibility
                </span>
                <span> to take short breaks (2-3 minutes). </span>
                <span> However, please make sure </span>
                <span style={{display: 'inline-flex', alignItems: 'baseline'}}>
                <span style={{marginRight: '10px'}}> to complete the experiment within</span> 
                <Input style={{width: "50px", height: '30px', padding:'3px', marginRight: '10px'}} id='time' type='text' name='time'/>.
                </span>
                <p> If you exceed this time limit, you will not be compensated.</p>
                <p>Please make sure that you are closely following task instructions. If you are not, unfortunately, we will not be able to compensate for your time.</p>
                <Button onClick={() => {this.props.toggle(String(+this.props.active - 1))}}>Back</Button><Button onClick={() => {this.props.toggle(String(+this.props.active + 1))}}>Next</Button>
            </Form>
            </>
        )
    }
}