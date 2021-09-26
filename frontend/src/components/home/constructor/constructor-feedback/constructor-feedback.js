import React, {Component} from 'react';
import styled from 'styled-components';
import {  Input, FormGroup, Label, Form, Button, Row, Col, CustomInput } from 'reactstrap';


export default class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      additional_quesion_list: [],
      additional_quesion_id: 0
    }
    this.addQuestion = this.addQuestion.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onCheck = this.onCheck.bind(this)
  }
  onCheck(e){
    const papa = document.getElementById('feedback'),
          checks = papa.querySelectorAll('input[type="checkbox"]'),
          feedback_info = {};
    console.log(checks)
    checks.forEach(check => {
      feedback_info[check.name] = check.checked
      })
    this.props.appendForm('feedbackExample', JSON.stringify(feedback_info))
  }

  onChange(e) {
    console.log('target'+e.target.name)
    this.props.appendForm(e.target.name, e.target.value)
  }
  addQuestion(type){
    const item = this.state.additional_quesion_list,
          id = this.state.additional_quesion_id + 1,
          question_type = type,
          isChecked = true;
    item.push({ question_type, id, isChecked})
    this.setState({additional_quesion_list: item,
                    additional_quesion_id: id})
    console.log(this.state.additional_quesion_list)
  }
  componentDidUpdate() {
    this.onCheck()
 }
  render () {
    return(
      <>
      <h1>Write your feedback questionnaire</h1>
      <p>Pre-set questions (you can delete them by pressing a cross in the right upper corner):</p>

      <h6>Instruction text:</h6>
      <p>Please fill in the form below. All information you provide will be handled confidentially.</p>

      <div id='feedback'>
      <Row >
      <Col md={2}  style={{paddingTop: "34px"}}>
        <FormGroup >
        <Label check>
        <Input onClick={this.onCheck} type="checkbox" name='useFeedbackTaskClear'/>Use question:
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
        <Input onClick={this.onCheck} type="checkbox" name='useFeedbackKnewWhatDoing'/>Use question:
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
        <Input onClick={this.onCheck} type="checkbox" name='useFeedbackTaskSimple'/>Use question:
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
        <Input onClick={this.onCheck} type="checkbox" name='useFeedbackTaskDemanding'/>Use question:
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
        <Input onClick={this.onCheck} type="checkbox" name='useFeedbackTaskPressure'/>Use question:
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
        <Input onClick={this.onCheck} type="checkbox" name='useFeedbackTaskPressure'/>Use question:
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
        <Input onClick={this.onCheck} type="checkbox" name='useFeedbackFun'/>Use question:
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
        <Input onClick={this.onCheck} type="checkbox" name='useFeedbackReflects'/>Use question:
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
        <Input onClick={this.onCheck} type="checkbox" name='useFeedbackPerformance'/>Use question:
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
        <Input onClick={this.onCheck} type="checkbox" name='useFeedbackUnderstood'/>Use question:
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
          <Input onClick={this.onCheck} type="checkbox" name='useFeedbackGuess'/>Use question:
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
          <Input onClick={this.onCheck} type="checkbox" name='useFeedbackStratedy'/>Use question:
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
          <Input onClick={this.onCheck} type="checkbox" name='useFeedbackEasier'/>Use question:
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
          <Input onClick={this.onCheck} type="checkbox" name='useFeedbackComments'/>Use question:
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
      <Col md={2}  style={{paddingTop: "15px"}}>
        <FormGroup>
          <Label check>
          <Input onClick={this.onCheck} type="checkbox" name='useFeedbackComments'/>Use text:
          </Label>
        </FormGroup>
        </Col>
        <Col>
          <p>Your comments on the task and the app as well as possible suggestions for further development of the task/app are very much welcome. Thank you!</p>
        </Col>
      </Row>
      {this.state.additional_quesion_list.map((item, index) => {
          return (
            <Row key={index} >
            <Col md={2}  style={{paddingTop: "34px"}}>
            <FormGroup>
              <Label check>
              <Input onClick={this.onCheck} defaultChecked={item.isChecked} type="checkbox" id={`useFeedbackNew${item.question_type}Qestion${item.id}`} name={`useFeedbackNew${item.question_type}Qestion${item.id}`}/>Use question:
              </Label>
            </FormGroup>
            </Col>
            <Col>
            <FormGroup>
              <Label>Insert text of the {`${item.question_type}`} question:</Label>
              <Input className='w-75' onChange={this.onChange} style={{padding:'3px'}} id={`FeedbackNew${item.question_type}Qestion${item.id}`} type='textarea' name={`FeedbackNew${item.question_type}Qestion${item.id}`}/>
            </FormGroup>
            </Col>
          </Row>
          )
        })}
      <br/>
      <Button id='addButtonFeedback' onClick={() => this.addQuestion('bool')} color="info">Add Bool Question</Button>{' '}
      <Button onClick={() => this.addQuestion('text')} color="info">Add Text Question</Button>
      <br/>
      <br/>
      <Button color='light' className="float-left"  onClick={() => {this.props.toggle(String(+this.props.active - 1))}}><span className="fa fa-angle-left"></span> Go back</Button>
      <Button color='light' className="float-right"  onClick={() => {this.props.toggle(String(+this.props.active + 1))}}>Next <span className="fa fa-angle-right"></span></Button>
      <div className='clearfix'></div>
    </div>
      </>
    )
    }
}