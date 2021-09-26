import React, {Component} from 'react';
import styled from 'styled-components';
import {  Input, FormGroup, Label, Form, Button, Row, Col, CustomInput } from 'reactstrap';
import { render } from 'react-dom';

export default class Background extends Component {
  constructor(props) {
      super(props);
      this.state = {
        additional_quesion_list: [],
        additional_quesion_id: 0
      }
      this.addQuestion = this.addQuestion.bind(this)
      this.onCheck = this.onCheck.bind(this)
      this.onChange = this.onChange.bind(this)
    }
  onCheck(){
    const papa = document.getElementById('background'),
          checks = papa.querySelectorAll('input[type="checkbox"]'),
          feedback_info = {};
    console.log(checks)
    checks.forEach(check => {
      feedback_info[check.name] = check.checked
      })
    this.props.appendForm('backgroundExample', JSON.stringify(feedback_info))
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
      <div>
      <h1>Write your background questionnaire</h1>
      <p>Pre-set questions (you can delete them by pressing a cross in the right upper corner):</p>

      <h6>Instruction text:</h6>
      <p>Please fill in the form below. All information you provide will be handled confidentially.</p>
        <div id='background'>
        <Row >
        <Col md={2}  style={{paddingTop: "34px"}}>
          <FormGroup >
          <Label check>
          <Input onClick={this.onCheck} type="checkbox" name='useBackgroundAge'/>Use question:
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
          <Input onClick={this.onCheck} type="checkbox" name='useBackgroundGender'/>Use question:
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
            <Input onClick={this.onCheck} type="checkbox" name='useBackgroundLevelEducation'/>Use question:
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
            <Input onClick={this.onCheck} type="checkbox" name='useBackgroundAcadmicField'/>Use question:
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
            <Input onClick={this.onCheck} type="checkbox" name='useBackgroundNative'/>Use question:
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
            <Input onClick={this.onCheck} type="checkbox" name='useBackgroundOther'/>Use question:
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
            <Input onClick={this.onCheck} type="checkbox" name='useBackgroundDyslexsia'/>Use question:
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
            <Input onClick={this.onCheck} type="checkbox" name='useBackgroundHearingDiff'/>Use question:
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
            <Input onClick={this.onCheck} type="checkbox" name='useBackgroundWhisper'/>Use question:
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
            <Input onClick={this.onCheck} type="checkbox" name='useBackgroundComments '/>Use question:
            </Label>
          </FormGroup>
          </Col>
          <Col>
          <FormGroup>
            <Label>Any other comments?</Label>
            <Input className='w-75' style={{padding:'3px'}} id='backgroundComments' type='textarea' name='backgroundComments'/>
          </FormGroup>
          </Col>
        </Row>
        {this.state.additional_quesion_list.map((item, index) => {
          return (
            <Row key={index} >
            <Col md={2}  style={{paddingTop: "34px"}}>
            <FormGroup>
              <Label check>
              <Input onClick={this.onCheck} defaultChecked={item.isChecked} type="checkbox" id={`useBackgroundNew${item.question_type}Qestion${item.id}`} name={`useBackgroundNew${item.question_type}Qestion${item.id}`}/>Use question:
              </Label>
            </FormGroup>
            </Col>
            <Col>
            <FormGroup>
              <Label>Insert text of the {`${item.question_type}`} question:</Label>
              <Input className='w-75' onChange={this.onChange} style={{padding:'3px'}} id={`BackgroundNew${item.question_type}Qestion${item.id}`} type='textarea' name={`BackgroundNew${item.question_type}Qestion${item.id}`}/>
            </FormGroup>
            </Col>
          </Row>
          )
        })}
        <br/>
        <Button id='addButtonBackground' onClick={() => this.addQuestion('bool')} color="info">Add Bool Question</Button>{' '}
        <Button onClick={() => this.addQuestion('text')} color="info">Add Text Question</Button>
        <br/>
        <br/>
        <Button color='light' className="float-left"  onClick={() => {this.props.toggle(String(+this.props.active - 1))}}><span className="fa fa-angle-left"></span> Go back</Button>
        <Button color='light' className="float-right"  onClick={() => {this.props.toggle(String(+this.props.active + 1))}}>Next <span className="fa fa-angle-right"></span></Button>
        <div className='clearfix'></div>
      </div>
    </div>
  )
  }
}