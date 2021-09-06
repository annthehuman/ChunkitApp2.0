import React, {Component} from 'react';
import styled from 'styled-components';
import {  Input, FormGroup, Label, Form, Button, Row, Col, CustomInput } from 'reactstrap';


export default class Feedback extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
        this.addBoolQuestion = this.addBoolQuestion.bind(this)
        this.addTextQuestion = this.addTextQuestion.bind(this)
    }
    onSubmit(e) {
        e.preventDefault();
        this.props.history.push("/constructor/goodbye");
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
      document.querySelector('#addButtonFeedback').insertAdjacentHTML("beforebegin", 
      `
      <div class="row">
      <div class="col-md-2" style="padding-top: 34px;">
      <div class="form-group">
      <label class="form-check-label">
      <input name="useFeedback${'NewTextQestion'+id}'" type="checkbox" class="form-check-input" checked>Use question:
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
      document.querySelector('#addButtonFeedback').insertAdjacentHTML("beforebegin", 
      `
      <div class="row">
      <div class="col-md-2" style="padding-top: 34px;">
      <div class="form-group">
      <label class="form-check-label">
      <input name="useFeedback${'NewTextQestion'+id}'" type="checkbox" class="form-check-input" checked>Use question:
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
                <Input type="checkbox" name='useFeedbackTaskClear'/>Use question:
                </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                <Label>The task instructions were clear.</Label>
                <div> 
                  <CustomInput type="radio" id="TaskClearStrongly_disagree" name="backgroundDyslexsia" label="Strongly disagree" />
                  <CustomInput type="radio" id="TaskClearDisagree" name="backgroundDyslexsia" label="Disagree" />
                  <CustomInput type="radio" id="TaskClearNeutral" name="backgroundDyslexsia" label="Neutral" />
                  <CustomInput type="radio" id="TaskClearDisagree" name="backgroundDyslexsia" label="Agree" />
                  <CustomInput type="radio" id="TaskClearStrongly_agree" name="backgroundDyslexsia" label="Strongly agree" />
                </div>
                </FormGroup>
              </Col>
              </Row>
              <Row >
              <Col md={2}  style={{paddingTop: "34px"}}>
                <FormGroup >
                <Label check>
                <Input type="checkbox" name='useFeedbackKnewWhatDoing'/>Use question:
                </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                <Label>I knew what I was doing.</Label>
                <div> 
                  <CustomInput type="radio" id="KnewWhatDoingStrongly_disagree" name="backgroundDyslexsia" label="Strongly disagree" />
                  <CustomInput type="radio" id="KnewWhatDoingDisagree" name="backgroundDyslexsia" label="Disagree" />
                  <CustomInput type="radio" id="KnewWhatDoingNeutral" name="backgroundDyslexsia" label="Neutral" />
                  <CustomInput type="radio" id="KnewWhatDoingDisagree" name="backgroundDyslexsia" label="Agree" />
                  <CustomInput type="radio" id="KnewWhatDoingStrongly_agree" name="backgroundDyslexsia" label="Strongly agree" />
                </div>
                </FormGroup>
              </Col>
              </Row>
              <Row >
              <Col md={2}  style={{paddingTop: "34px"}}>
                <FormGroup >
                <Label check>
                <Input type="checkbox" name='useFeedbackTaskSimple'/>Use question:
                </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                <Label>The task was relatively simple.</Label>
                <div> 
                  <CustomInput type="radio" id="TaskSimpleStrongly_disagree" name="backgroundDyslexsia" label="Strongly disagree" />
                  <CustomInput type="radio" id="TaskSimpleDisagree" name="backgroundDyslexsia" label="Disagree" />
                  <CustomInput type="radio" id="TaskSimpleNeutral" name="backgroundDyslexsia" label="Neutral" />
                  <CustomInput type="radio" id="TaskSimpleDisagree" name="backgroundDyslexsia" label="Agree" />
                  <CustomInput type="radio" id="TaskSimpleStrongly_agree" name="backgroundDyslexsia" label="Strongly agree" />
                </div>
                </FormGroup>
              </Col>
              </Row>
              <Row >
              <Col md={2}  style={{paddingTop: "34px"}}>
                <FormGroup >
                <Label check>
                <Input type="checkbox" name='useFeedbackTaskDemanding'/>Use question:
                </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                <Label>The task was very demanding. I feel tired now.</Label>
                <div> 
                  <CustomInput type="radio" id="TaskDemandingStrongly_disagree" name="backgroundDyslexsia" label="Strongly disagree" />
                  <CustomInput type="radio" id="TaskDemandingDisagree" name="backgroundDyslexsia" label="Disagree" />
                  <CustomInput type="radio" id="TaskDemandingNeutral" name="backgroundDyslexsia" label="Neutral" />
                  <CustomInput type="radio" id="TaskDemandingDisagree" name="backgroundDyslexsia" label="Agree" />
                  <CustomInput type="radio" id="TaskDemandingStrongly_agree" name="backgroundDyslexsia" label="Strongly agree" />
                </div>
                </FormGroup>
              </Col>
              </Row>
              <Row >
              <Col md={2}  style={{paddingTop: "34px"}}>
                <FormGroup >
                <Label check>
                <Input type="checkbox" name='useFeedbackTaskPressure'/>Use question:
                </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                <Label>The task put a lot of pressure on me. I was in a hurry all the time and even panicked several times.</Label>
                <div> 
                  <CustomInput type="radio" id="TaskPressureStrongly_disagree" name="backgroundDyslexsia" label="Strongly disagree" />
                  <CustomInput type="radio" id="TaskPressureDisagree" name="backgroundDyslexsia" label="Disagree" />
                  <CustomInput type="radio" id="TaskPressureNeutral" name="backgroundDyslexsia" label="Neutral" />
                  <CustomInput type="radio" id="TaskPressureDisagree" name="backgroundDyslexsia" label="Agree" />
                  <CustomInput type="radio" id="TaskPressureStrongly_agree" name="backgroundDyslexsia" label="Strongly agree" />
                </div>
                </FormGroup>
              </Col>
              </Row>
              <Row >
              <Col md={2}  style={{paddingTop: "34px"}}>
                <FormGroup >
                <Label check>
                <Input type="checkbox" name='useFeedbackTaskPressure'/>Use question:
                </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                <Label>The task put a lot of pressure on me. I was in a hurry all the time and even panicked several times.</Label>
                <div> 
                  <CustomInput type="radio" id="TaskPressureStrongly_disagree" name="backgroundDyslexsia" label="Strongly disagree" />
                  <CustomInput type="radio" id="TaskPressureDisagree" name="backgroundDyslexsia" label="Disagree" />
                  <CustomInput type="radio" id="TaskPressureNeutral" name="backgroundDyslexsia" label="Neutral" />
                  <CustomInput type="radio" id="TaskPressureDisagree" name="backgroundDyslexsia" label="Agree" />
                  <CustomInput type="radio" id="TaskPressureStrongly_agree" name="backgroundDyslexsia" label="Strongly agree" />
                </div>
                </FormGroup>
              </Col>
              </Row>
              <Row >
              <Col md={2}  style={{paddingTop: "34px"}}>
                <FormGroup >
                <Label check>
                <Input type="checkbox" name='useFeedbackFun'/>Use question:
                </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                <Label>It was fun.</Label>
                <div> 
                  <CustomInput type="radio" id="FunStrongly_disagree" name="backgroundDyslexsia" label="Strongly disagree" />
                  <CustomInput type="radio" id="FunDisagree" name="backgroundDyslexsia" label="Disagree" />
                  <CustomInput type="radio" id="FunNeutral" name="backgroundDyslexsia" label="Neutral" />
                  <CustomInput type="radio" id="FunDisagree" name="backgroundDyslexsia" label="Agree" />
                  <CustomInput type="radio" id="FunStrongly_agree" name="backgroundDyslexsia" label="Strongly agree" />
                </div>
                </FormGroup>
              </Col>
              </Row>
              <Row >
              <Col md={2}  style={{paddingTop: "34px"}}>
                <FormGroup >
                <Label check>
                <Input type="checkbox" name='useFeedbackReflects'/>Use question:
                </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                <Label>I think the task in some way reflects what I naturally do when I listen to speech.</Label>
                <div> 
                  <CustomInput type="radio" id="ReflectsStrongly_disagree" name="backgroundDyslexsia" label="Strongly disagree" />
                  <CustomInput type="radio" id="ReflectsDisagree" name="backgroundDyslexsia" label="Disagree" />
                  <CustomInput type="radio" id="ReflectsNeutral" name="backgroundDyslexsia" label="Neutral" />
                  <CustomInput type="radio" id="ReflectsDisagree" name="backgroundDyslexsia" label="Agree" />
                  <CustomInput type="radio" id="ReflectsStrongly_agree" name="backgroundDyslexsia" label="Strongly agree" />
                </div>
                </FormGroup>
              </Col>
              </Row>
              <Row >
              <Col md={2}  style={{paddingTop: "34px"}}>
                <FormGroup >
                <Label check>
                <Input type="checkbox" name='useFeedbackPerformance'/>Use question:
                </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                <Label>How would you evaluate your performance in the task?</Label>
                <div> 
                  <CustomInput type="radio" id="PerformancePoor" name="backgroundDyslexsia" label="Poor" />
                  <CustomInput type="radio" id="PerformanceSatisfactory" name="backgroundDyslexsia" label="Satisfactory" />
                  <CustomInput type="radio" id="PerformanceGood" name="backgroundDyslexsia" label="Good" />
                  <CustomInput type="radio" id="PerformanceVerygood" name="backgroundDyslexsia" label="Very good" />
                </div>
                </FormGroup>
              </Col>
              </Row>
              <Row >
              <Col md={2}  style={{paddingTop: "34px"}}>
                <FormGroup >
                <Label check>
                <Input type="checkbox" name='useFeedbackUnderstood'/>Use question:
                </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                <Label>I understood what the speaker was saying...</Label>
                <div> 
                  <CustomInput type="radio" id="UnderstoodAll" name="backgroundDyslexsia" label="all the time" />
                  <CustomInput type="radio" id="UnderstoodMost" name="backgroundDyslexsia" label="most of the time" />
                  <CustomInput type="radio" id="UnderstoodSome" name="backgroundDyslexsia" label="some of the time" />
                  <CustomInput type="radio" id="UnderstoodLittle" name="backgroundDyslexsia" label="very little" />
                  <CustomInput type="radio" id="UnderstoodNotAtAll" name="backgroundDyslexsia" label="not at all" />
                </div>
                </FormGroup>
              </Col>
              </Row>
              <Row>
                <Col md={2}  style={{paddingTop: "34px"}}>
                <FormGroup>
                  <Label check>
                  <Input type="checkbox" name='useFeedbackGuess'/>Use question:
                  </Label>
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                  <Label>Can you guess what the chunking task measured?</Label>
                  <Input className='w-75' style={{height: '30px', padding:'3px'}} id='feedbackGuess' type='text' name='feedbackGuess'/>
                </FormGroup>
                </Col>
              </Row>
              <Row>
              <Col md={2}  style={{paddingTop: "34px"}}>
                <FormGroup>
                  <Label check>
                  <Input type="checkbox" name='useFeedbackStratedy'/>Use question:
                  </Label>
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                  <Label>Did you consciously adopt some strategy in marking boundaries between chunks, if any?</Label>
                  <Input className='w-75' style={{height: '30px', padding:'3px'}} id='feedbackStratedy' type='text' name='feedbackStratedy'/>
                </FormGroup>
                </Col>
              </Row>
              <Row>
              <Col md={2}  style={{paddingTop: "34px"}}>
                <FormGroup>
                  <Label check>
                  <Input type="checkbox" name='useFeedbackEasier'/>Use question:
                  </Label>
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                  <Label>Did you have an impression that the task gradually became easier?</Label>
                  <Input className='w-75' style={{height: '30px', padding:'3px'}} id='feedbackEasier' type='text' name='feedbackEasier'/>
                </FormGroup>
                </Col>
              </Row>
              <Row>
              <Col md={2}  style={{paddingTop: "34px"}}>
                <FormGroup>
                  <Label check>
                  <Input type="checkbox" name='useFeedbackComments'/>Use question:
                  </Label>
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                  <Label>Do you have other comments?</Label>
                  <Input className='w-75' style={{height: '30px', padding:'3px'}} id='feedbackComments' type='text' name='feedbackComments'/>
                </FormGroup>
                </Col>
              </Row>
              <Row>
              <Col md={2}  style={{paddingTop: "34px"}}>
                <FormGroup>
                  <Label check>
                  <Input type="checkbox" name='useFeedbackComments'/>Use question:
                  </Label>
                </FormGroup>
                </Col>
                <Col>
                  <p>Your comments on the task and the app as well as possible suggestions for further development of the task/app are very much welcome. Thank you!</p>
                </Col>
              </Row>
              <Button id='addButtonFeedback' onClick={this.addBoolQuestion}>Add Bool</Button>
              <Button onClick={this.addTextQuestion}>Add Text</Button>
              <br/>
              <Button onClick={() => {this.props.toggle(String(+this.props.active - 1))}}>Back</Button><Button onClick={() => {this.props.toggle(String(+this.props.active + 1))}}>Next</Button>
            </Form>
            </>
        )
        }
}