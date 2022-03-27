import React, {Component} from 'react';
import styled from 'styled-components';
import {  Input, FormGroup, Label, Form, Button, Row, Col, CustomInput } from 'reactstrap';
import { render } from 'react-dom';

export default class Background extends Component {
  constructor(props) {
      super(props);
      this.state = {
        additional_quesion_list: [],
        additional_quesion_id: -1
      }
      this.addQuestion = this.addQuestion.bind(this)
      this.onCheck = this.onCheck.bind(this)
      this.onChange = this.onChange.bind(this)
    }
  componentDidMount() {
    let store = require('store');
    const papa = document.getElementById('background'),
          checks = papa.querySelectorAll('input[type="checkbox"]'),
          backgroundExample = store.get('backgroundExample'),
          backgroundAddQ = store.get('backgroundAddQ');
    if (backgroundExample){
    let item = this.state.additional_quesion_list
    Object.keys(backgroundExample).forEach((key) => {
      console.log('backgroundExample key',key, backgroundExample[key]);
      if (backgroundExample[key] == 'on') {
        if (key.indexOf('New')){
          console.log('New', key)
          if (key.split('_')[1] == 'text') {
            const question_type = 'text',
                  id = +key.split('_').at(-1).at(-1),
                  isChecked = true;
            console.log('id',id)
            
            item.push({ question_type, id, isChecked})

          }
          if (key.split('_')[1] == 'bool') {
            const question_type = 'bool',
                  id = +key.split('_').at(-1).at(-1),
                  isChecked = true;
            console.log('id',id)
            item.push({ question_type, id, isChecked})
          }
        }

        store.set(key, true)
        console.log('store.get(key)',key,store.get(key))
      }
    });
    store.set('addedQuestionsBackground', item)}
    if (backgroundAddQ) {
      Object.keys(backgroundAddQ).forEach((key) => {
        store.set(key, backgroundAddQ[key][0])
      })
    }
    checks.forEach(check => {
      if (store.get(check.name)) {
        console.log((store.get(check.name)))
        check.checked = store.get(check.name)
      }
    })
    if (store.get('addedQuestionsBackground') && store.get('addedQuestionsBackground').length > 0) {
      this.setState({additional_quesion_list: store.get('addedQuestionsBackground'),
      additional_quesion_id: +store.get('addedQuestionsBackground').pop().id})
      console.log(store.get('addedQuestionsBackground').pop().id)
    }
    
  }
  onCheck(){
    let store = require('store');
    const papa = document.getElementById('background'),
          checks = papa.querySelectorAll('input[type="checkbox"]'),
          feedback_info = {};
    // console.log(checks)
    checks.forEach(check => {
      feedback_info[check.name] = check.checked
      if (check.checked) {
        store.set(check.name, check.checked)
      }
      })
    this.props.allInputsAReHere()
    // this.props.appendForm('backgroundExample', JSON.stringify(feedback_info))
  }
  onChange(e) {
    let store = require('store');
    console.log('target'+e.target.name)
    this.props.appendForm(e.target.name, e.target.value)
    store.set(e.target.name, e.target.value)
  }
  addQuestion(type){
    let store = require('store'),
        id = this.state.additional_quesion_id+1;
    console.log(this.state.additional_quesion_id)
    const item = this.state.additional_quesion_list,
          question_type = type,
          isChecked = true;
    item.push({ question_type, id, isChecked})
    store.set('addedQuestionsBackground', item)
    // this.props.appendForm('addedQuestionsBackground', item)
    this.setState({additional_quesion_list: item,
                    additional_quesion_id: id})
    console.log(this.state.additional_quesion_list)
  }
//   componentDidUpdate() {
//     this.onCheck()
//  }
  render () {
    let store = require('store');
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
          <Input style={{width: "50px", height: '30px', padding:'3px', marginRight: '10px'}}  type='number'/>
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
          <Input className='w-25' style={{height: '30px', padding:'3px'}}  type="select" >
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
            <Input className='w-75' style={{height: '30px', padding:'3px'}} id='backgroundLevelEducation' type='select'>
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
            <Input className='w-75' style={{height: '30px', padding:'3px'}} type='text' />
          </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={2}  style={{paddingTop: "34px"}}>
          <FormGroup>
            <Label check>
            <Input onClick={this.onCheck} type="checkbox" name='useBackgroundNativeLanguage'/>Use question:
            </Label>
          
          </FormGroup>
          </Col>
          <Col>
          <FormGroup>
            <Label>Native language(s)</Label>
            <Input className='w-75' style={{height: '30px', padding:'3px'}}  type='text' />
          </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={2}  style={{paddingTop: "34px"}}>
          <FormGroup>
            <Label check>
            <Input onClick={this.onCheck} type="checkbox" name='useBackgroundOtherLanguage'/>Use question:
            </Label>
          </FormGroup>
          </Col>
          <Col>
          <FormGroup>
            <Label>Other languages</Label>
            <Input className='w-75' style={{height: '30px', padding:'3px'}} id='backgroundOther' type='text' />
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
            <CustomInput type="radio" id="dyslexsia_yes" label="Yes" />
            <CustomInput type="radio" id="dyslexsia_no" label="No" />
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
            <CustomInput type="radio" id="hearing_yes" label="Yes" />
            <CustomInput type="radio" id="hearing_no" label="No" />
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
            <CustomInput type="radio" id="hearing_yes" label="Yes" />
            <CustomInput type="radio" id="hearing_no" label="No" />
          </div>
        </FormGroup>
        </Col>
        </Row>

        <Row>
          <Col md={2}  style={{paddingTop: "34px"}}>
          <FormGroup>
            <Label check>
            <Input onClick={this.onCheck} type="checkbox" name='useBackgroundComments'/>Use question:
            </Label>
          </FormGroup>
          </Col>
          <Col>
          <FormGroup>
            <Label>Any other comments?</Label>
            <Input className='w-75' style={{padding:'3px'}} id='backgroundComments' type='textarea'/>
          </FormGroup>
          </Col>
        </Row>
        <div id='addedQBack'>
        {this.state.additional_quesion_list.map((item, index) => {
              console.log(`BackgroundNew_${item.question_type}_Qestion${item.id}`, store.get(`BackgroundNew_${item.question_type}_Qestion${item.id}`))
          return (
            <Row key={index} >
            <Col md={2}  style={{paddingTop: "34px"}}>
            <FormGroup>
              <Label check>
              <Input onClick={this.onCheck} defaultChecked={item.isChecked} type="checkbox" id={`useBackgroundNew_${item.question_type}_Qestion${index}`} name={`useBackgroundNew_${item.question_type}_Qestion${index}`}/>Use question:
              </Label>
            </FormGroup>
            </Col>
            <Col>
            <FormGroup>
              <Label>Insert text of the {`${item.question_type}`} question:</Label>
              <Input className='w-75' onChange={this.onChange} style={{padding:'3px'}} id={`BackgroundNew_${item.question_type}_Qestion${index}`} type='textarea' name={`BackgroundNew_${item.question_type}_Qestion${index}`} value={store.get(`BackgroundNew_${item.question_type}_Qestion${item.id}`)}/>
            </FormGroup>
            </Col>
          </Row>
          )
        })}
        </div>
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