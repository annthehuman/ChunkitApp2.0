import React, {Component} from 'react';
import styled from 'styled-components';
import { Button,Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {Link} from 'react-router-dom';

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`

export default class Inputs extends Component {
    constructor(props) {
        super(props);
        this.state = {
          initialValue: 0
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        e.preventDefault();
        // const isvalid = this.validForm();
        // console.log(invalid)
        const form = e.target
        const formData = new FormData(form);
        console.log(this.props)
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
          this.props.history.push("/constructor/hellopage");//<----- like this
        }
    }
    render() {
    return(
      <>
    <h1>The basics</h1>
    <Form
     onSubmit={this.onSubmit}>
      <FormGroup>
        <Label for="nameExperement">Insert the name of the experiment</Label>
        <Input
          required 
          id='nameExperement'
          type='text'
          placeholder='Name of the experiment'
          name='name'
        />
      </FormGroup>
      <FormGroup>
        <Label for="numberOfExtracts">Insert the number of audio extracts in your experiment</Label>
        <Input
          required
          id='numberOfExtracts'
          type='number'
          placeholder='Number of audio extracts'
          name='number'
        />
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="checkbox"  name='sentences'/>{' '}
          Will you use the Elicited Imitation task?
        </Label>
        <FormText>This part is not customizable. The sentences come from Ortega et al., 1999 but are re-recorded with a male non-native English speaker. In this version of the test, we kept 24 sentences.</FormText>
      </FormGroup>
      <br/>
      <FormGroup check>
        <Label check>
          <Input type="checkbox"  name='questions'/>{' '}
          Will you use comprehension questions?
        </Label>
      </FormGroup>
      <br/>
      <FormGroup check>
        <Label check>
          <Input type="checkbox"  name='prolific'/>{' '}
          Do you need to integrate your experiment with Prolific?
        </Label>
      </FormGroup>
      <br/>
      <Button color='light' className="float-right" onClick={() => {this.props.toggle(String(+this.props.active + 1))}}>Next <span className="fa fa-angle-right"></span></Button>
      <div className='clearfix'></div>
    </Form>
    </>
    )
    }
}
