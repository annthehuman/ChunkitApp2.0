import React, {Component} from 'react';
import styled from 'styled-components';
import {  Input, FormGroup, Label, Form, Button, Row, Col, CustomInput } from 'reactstrap';


export default class Background extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
        this.addBoolQuestion = this.addBoolQuestion.bind(this)
        this.addTextQuestion = this.addTextQuestion.bind(this)
    }
    onSubmit(e) {
        e.preventDefault();
        this.props.history.push("/constructor/practice");
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
        
    }

    addTextQuestion(){
      const id = 1 //TODO INDEX
      console.log()
      document.querySelector('#addButtonBackground').insertAdjacentHTML("beforebegin", 
      `
      <div class="row">
      <div class="col-md-2" style="padding-top: 34px;">
      <div class="form-group">
      <label class="form-check-label">
      <input name="use${'NewTextQestion'+id}'" type="checkbox" class="form-check-input" checked>Use question:
      </label>
      </div>
      </div>
      <div class="col">
      <div class="form-group">
      <label class="">Insert text of the text question:</label>
      <input id="backgroundOther" name="background${'NewTextQestion'+id}'" type="text" class="w-75 form-control" style="height: 30px; padding: 3px;">
      </div></div></div>`);
    }
    addBoolQuestion(){
      const id = 1
      document.querySelector('#addButtonBackground').insertAdjacentHTML("beforebegin", 
      `
      <div class="row">
      <div class="col-md-2" style="padding-top: 34px;">
      <div class="form-group">
      <label class="form-check-label">
      <input name="use${'NewTextQestion'+id}'" type="checkbox" class="form-check-input" checked>Use question:
      </label>
      </div>
      </div>
      <div class="col">
      <div class="form-group">
      <label class="">Insert text of the bool (yes/no) question:</label>
      <input id="backgroundOther" name="background${'NewTextQestion'+id}'" type="text" class="w-75 form-control" style="height: 30px; padding: 3px;">
      </div></div></div>`);
    }
    render () {
        return(
            <>
            <h1>Write your background questionnaire</h1>
            <p>Pre-set questions (you can delete them by pressing a cross in the right upper corner):</p>

            <h6>Instruction text:</h6>
            <p>Please fill in the form below. All information you provide will be handled confidentially.</p>

            <Form onSubmit={this.onSubmit}>
              <Row >
              <Col md={2}  style={{paddingTop: "34px"}}>
                <FormGroup >
                <Label check>
                <Input type="checkbox" name='useBackgroundAge'/>Use question:
                </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                <Label>Age</Label>
                <Input style={{width: "50px", height: '30px', padding:'3px', marginRight: '10px'}} id='backgroundAge' type='number' name='backgroundAge'/>
                </FormGroup>
              </Col>
              </Row>
              <Row >
              <Col md={2}  style={{paddingTop: "34px"}}>
              <FormGroup>
                <Label check>
                <Input type="checkbox" name='useBackgroundGender'/>Use question:
                </Label>
              </FormGroup>
              </Col>
              <Col>
              <FormGroup>
                <Label>Gender</Label>
                <Input className='w-25' style={{height: '30px', padding:'3px'}} id='backgroundGender' type="select" name='backgroundAge'>
                  <option>-----</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Input>
              </FormGroup>
              </Col>	
              </Row>	
              <Row>
                <Col md={2}  style={{paddingTop: "34px"}}>
                <FormGroup>
                  <Label check>
                  <Input type="checkbox" name='useBackgroundLevelEducation'/>Use question:
                  </Label>
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                  <Label>Which of the options below indicate the highest level of education you have completed?</Label>
                  <Input className='w-75' style={{height: '30px', padding:'3px'}} id='backgroundLevelEducation' type='select' name='backgroundLevelEducation'>
                    <option>-----</option>
                    <option>Primary school</option>
                    <option>Lower secondary school</option>
                    <option>Upper secondary school, upper secondary school graduate, or vocational education graduate</option>
                    <option>Polytechnic degree</option>
                    <option>University degree: BA or equivalent</option>
                    <option>University degree: MA or equivalent</option>
                    <option>University degree: Ph.D. or equivalent</option>
                  </Input>
                </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={2}  style={{paddingTop: "34px"}}>
                <FormGroup>
                  <Label check>
                  <Input type="checkbox" name='useBackgroundAcadmicField'/>Use question:
                  </Label>
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                  <Label>Major subject or academic field</Label>
                  <Input className='w-75' style={{height: '30px', padding:'3px'}} id='backgroundAcadmicField' type='text' name='backgroundAcadmicField'/>
                </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={2}  style={{paddingTop: "34px"}}>
                <FormGroup>
                  <Label check>
                  <Input type="checkbox" name='useBackgroundNative'/>Use question:
                  </Label>
               
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                  <Label>Native language(s)</Label>
                  <Input className='w-75' style={{height: '30px', padding:'3px'}} id='backgroundNative' type='text' name='backgroundNative'/>
                </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={2}  style={{paddingTop: "34px"}}>
                <FormGroup>
                  <Label check>
                  <Input type="checkbox" name='useBackgroundOther'/>Use question:
                  </Label>
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                  <Label>Other languages</Label>
                  <Input className='w-75' style={{height: '30px', padding:'3px'}} id='backgroundOther' type='text' name='backgroundOther'/>
                </FormGroup>
                </Col>
              </Row>
              <Row>
              <Col md={2}  style={{paddingTop: "31px"}}>
                <FormGroup>
                  <Label check>
                  <Input type="checkbox" name='useBackgroundDyslexsia'/>Use question:
                  </Label>
                </FormGroup>
              </Col>
              <Col>
              <FormGroup>
                <Label>Have you been diagnosed with dyslexsia?</Label>
                <div>
                  <CustomInput type="radio" id="dyslexsia_yes" name="backgroundDyslexsia" label="Yes" />
                  <CustomInput type="radio" id="dyslexsia_no" name="backgroundDyslexsia" label="No" />
                </div>
              </FormGroup>
              </Col>
              </Row>

              <Row>
              <Col md={2}  style={{paddingTop: "31px"}}>
                <FormGroup>
                  <Label check>
                  <Input type="checkbox" name='useBackgroundHearingDiff'/>Use question:
                  </Label>
                </FormGroup>
              </Col>
              <Col>
              <FormGroup>
                <Label>Do you have any hearing difficulties?</Label>
                <div>
                  <CustomInput type="radio" id="hearing_yes" name="hearingDiff" label="Yes" />
                  <CustomInput type="radio" id="hearing_no" name="hearingDiff" label="No" />
                </div>
              </FormGroup>
              </Col>
              </Row>

              <Row>
              <Col md={2}  style={{paddingTop: "31px"}}>
                <FormGroup>
                  <Label check>
                  <Input type="checkbox" name='useBackgroundWhisper'/>Use question:
                  </Label>
                </FormGroup>
              </Col>
              <Col>
              <FormGroup>
                <Label>Do you have difficulty hearing when someone speaks in a whisper?</Label>
                <div>
                  <CustomInput type="radio" id="hearing_yes" name="Whisper" label="Yes" />
                  <CustomInput type="radio" id="hearing_no" name="Whisper" label="No" />
                </div>
              </FormGroup>
              </Col>
              </Row>

              <Row>
                <Col md={2}  style={{paddingTop: "34px"}}>
                <FormGroup>
                  <Label check>
                  <Input type="checkbox" name='useBackgroundNative'/>Use question:
                  </Label>
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                  <Label>Any other comments?</Label>
                  <Input className='w-75' style={{padding:'3px'}} id='backgroundNative' type='textarea' name='backgroundNative'/>
                </FormGroup>
                </Col>
              </Row>
              <Button id='addButtonBackground' onClick={this.addBoolQuestion}>Add Bool</Button>
              <Button onClick={this.addTextQuestion}>Add Text</Button>
              <br/>
              <Button onClick={() => {this.props.toggle(String(+this.props.active - 1))}}>Back</Button><Button onClick={() => {this.props.toggle(String(+this.props.active + 1))}}>Next</Button>
            </Form>
            </>
        )
        }
}