import React, {Component} from 'react';
import {  Input, FormGroup, Label, Form, Button, Row, Col, CustomInput } from 'reactstrap';


export default class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      additional_quesion_list: [],
      additional_quesion_id: -1
    }
    this.addQuestion = this.addQuestion.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onCheck = this.onCheck.bind(this)
  }
  componentDidMount() {
    let store = require('store');
    const papa = document.getElementById('feedback'),
          checks = papa.querySelectorAll('input[type="checkbox"]'),
          feedbackExpample = store.get('feedbackExample'),
          feedbackAddQ = store.get('feedbackAddQ');
    if (feedbackExpample){
    let item = this.state.additional_quesion_list
    Object.keys(feedbackExpample).forEach(function (key){
      if (feedbackExpample[key] == 'on') {
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
    store.set('addQFeedback', item)}
    if (feedbackAddQ) {
      Object.keys(feedbackAddQ).forEach((key) => {
        store.set(key, feedbackAddQ[key][0])
      })
    }
    checks.forEach(check => {
        if (store.get(check.name)) {
          console.log((store.get(check.name)))
          check.checked = store.get(check.name)
        }
    })
    if (store.get('addQFeedback') && store.get('addQFeedback').length > 0){
    this.setState({additional_quesion_list: store.get('addQFeedback'),
    additional_quesion_id: +store.get('addQFeedback').pop().id})}
    // console.log('additional_quesion_id', store.get('addQFeedback') && store.get('addQFeedback').length > 0)
  }
  onCheck(){
    let store = require('store');
    const papa = document.getElementById('feedback'),
          checks = papa.querySelectorAll('input[type="checkbox"]'),
          feedback_info = {};
    console.log(checks)
    checks.forEach(check => {
      feedback_info[check.name] = check.checked
      console.log(check.checked)
      if (check.checked) {
        store.set(check.name, check.checked)
      }
      })
    this.props.allInputsAReHere()
    // this.props.appendForm('feedbackExample', JSON.stringify(feedback_info))
  }

  onChange(e) {
    let store = require('store');
    store.set(e.target.name, e.target.value)
    console.log('target'+e.target.name)
    this.props.appendForm(e.target.name, e.target.value)
  }
  addQuestion(type){
    let store = require('store');
    
    const item = this.state.additional_quesion_list,
          id = this.state.additional_quesion_id+1,
          question_type = type,
          isChecked = true;
    console.log('id additional_quesion_id', id)
    item.push({ question_type, id, isChecked})
    this.setState({additional_quesion_list: item,
                    additional_quesion_id: id}, function(){
                      console.log(this.state.additional_quesion_id)
                      store.set('addQFeedback', this.state.additional_quesion_list)
                    })
    
    console.log(this.state.additional_quesion_list)
  }
//   componentDidUpdate() {
//     this.onCheck()
//  }
  render () {
    let store = require('store');
    console.log('additional_quesion_id', this.state.additional_quesion_id)
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
        <Input onClick={this.onCheck} type="checkbox" name='useFeedbackinstructions'/>Use question:
        </Label>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
        <Label>The task instructions were clear.</Label>
        <div> 
          <CustomInput type="radio" id="TaskClearStrongly_disagree" label="Strongly disagree" />
          <CustomInput type="radio" id="TaskClearDisagree" label="Disagree" />
          <CustomInput type="radio" id="TaskClearNeutral" label="Neutral" />
          <CustomInput type="radio" id="TaskClearDisagree" label="Agree" />
          <CustomInput type="radio" id="TaskClearStrongly_agree" label="Strongly agree" />
        </div>
        </FormGroup>
      </Col>
      </Row>
      <Row >
      <Col md={2}  style={{paddingTop: "34px"}}>
        <FormGroup >
        <Label check>
        <Input onClick={this.onCheck} type="checkbox" name='useFeedbackdoing'/>Use question:
        </Label>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
        <Label>I knew what I was doing.</Label>
        <div> 
          <CustomInput type="radio" id="KnewWhatDoingStrongly_disagree" label="Strongly disagree" />
          <CustomInput type="radio" id="KnewWhatDoingDisagree" label="Disagree" />
          <CustomInput type="radio" id="KnewWhatDoingNeutral" label="Neutral" />
          <CustomInput type="radio" id="KnewWhatDoingDisagree" label="Agree" />
          <CustomInput type="radio" id="KnewWhatDoingStrongly_agree" label="Strongly agree" />
        </div>
        </FormGroup>
      </Col>
      </Row>
      <Row >
      <Col md={2}  style={{paddingTop: "34px"}}>
        <FormGroup >
        <Label check>
        <Input onClick={this.onCheck} type="checkbox" name='useFeedbacksimple'/>Use question:
        </Label>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
        <Label>The task was relatively simple.</Label>
        <div> 
          <CustomInput type="radio" id="TaskSimpleStrongly_disagree" label="Strongly disagree" />
          <CustomInput type="radio" id="TaskSimpleDisagree" label="Disagree" />
          <CustomInput type="radio" id="TaskSimpleNeutral" label="Neutral" />
          <CustomInput type="radio" id="TaskSimpleDisagree" label="Agree" />
          <CustomInput type="radio" id="TaskSimpleStrongly_agree" label="Strongly agree" />
        </div>
        </FormGroup>
      </Col>
      </Row>
      <Row >
      <Col md={2}  style={{paddingTop: "34px"}}>
        <FormGroup >
        <Label check>
        <Input onClick={this.onCheck} type="checkbox" name='useFeedbackdemanding'/>Use question:
        </Label>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
        <Label>The task was very demanding. I feel tired now.</Label>
        <div> 
          <CustomInput type="radio" id="TaskDemandingStrongly_disagree" label="Strongly disagree" />
          <CustomInput type="radio" id="TaskDemandingDisagree" label="Disagree" />
          <CustomInput type="radio" id="TaskDemandingNeutral" label="Neutral" />
          <CustomInput type="radio" id="TaskDemandingDisagree" label="Agree" />
          <CustomInput type="radio" id="TaskDemandingStrongly_agree" label="Strongly agree" />
        </div>
        </FormGroup>
      </Col>
      </Row>
      <Row >
      <Col md={2}  style={{paddingTop: "34px"}}>
        <FormGroup >
        <Label check>
        <Input onClick={this.onCheck} type="checkbox" name='useFeedbackpessure'/>Use question:
        </Label>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
        <Label>The task put a lot of pressure on me. I was in a hurry all the time and even panicked several times.</Label>
        <div> 
          <CustomInput type="radio" id="TaskPressureStrongly_disagree" label="Strongly disagree" />
          <CustomInput type="radio" id="TaskPressureDisagree" label="Disagree" />
          <CustomInput type="radio" id="TaskPressureNeutral" label="Neutral" />
          <CustomInput type="radio" id="TaskPressureDisagree" label="Agree" />
          <CustomInput type="radio" id="TaskPressureStrongly_agree" label="Strongly agree" />
        </div>
        </FormGroup>
      </Col>
      </Row>
      <Row >
      <Col md={2}  style={{paddingTop: "34px"}}>
        <FormGroup >
        <Label check>
        <Input onClick={this.onCheck} type="checkbox" name='useFeedbackfun'/>Use question:
        </Label>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
        <Label>It was fun.</Label>
        <div> 
          <CustomInput type="radio" id="FunStrongly_disagree" label="Strongly disagree" />
          <CustomInput type="radio" id="FunDisagree" label="Disagree" />
          <CustomInput type="radio" id="FunNeutral" label="Neutral" />
          <CustomInput type="radio" id="FunDisagree" label="Agree" />
          <CustomInput type="radio" id="FunStrongly_agree" label="Strongly agree" />
        </div>
        </FormGroup>
      </Col>
      </Row>
      <Row >
      <Col md={2}  style={{paddingTop: "34px"}}>
        <FormGroup >
        <Label check>
        <Input onClick={this.onCheck} type="checkbox" name='useFeedbackreflects'/>Use question:
        </Label>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
        <Label>I think the task in some way reflects what I naturally do when I listen to speech.</Label>
        <div> 
          <CustomInput type="radio" id="ReflectsStrongly_disagree" label="Strongly disagree" />
          <CustomInput type="radio" id="ReflectsDisagree" label="Disagree" />
          <CustomInput type="radio" id="ReflectsNeutral" label="Neutral" />
          <CustomInput type="radio" id="ReflectsDisagree" label="Agree" />
          <CustomInput type="radio" id="ReflectsStrongly_agree" label="Strongly agree" />
        </div>
        </FormGroup>
      </Col>
      </Row>
      <Row >
      <Col md={2}  style={{paddingTop: "34px"}}>
        <FormGroup >
        <Label check>
        <Input onClick={this.onCheck} type="checkbox" name='useFeedbackperformance'/>Use question:
        </Label>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
        <Label>How would you evaluate your performance in the task?</Label>
        <div> 
          <CustomInput type="radio" id="PerformancePoor" label="Poor" />
          <CustomInput type="radio" id="PerformanceSatisfactory" label="Satisfactory" />
          <CustomInput type="radio" id="PerformanceGood" label="Good" />
          <CustomInput type="radio" id="PerformanceVerygood" label="Very good" />
        </div>
        </FormGroup>
      </Col>
      </Row>
      <Row >
      <Col md={2}  style={{paddingTop: "34px"}}>
        <FormGroup >
        <Label check>
        <Input onClick={this.onCheck} type="checkbox" name='useFeedbackunderstood'/>Use question:
        </Label>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
        <Label>I understood what the speaker was saying...</Label>
        <div> 
          <CustomInput type="radio" id="UnderstoodAll" label="all the time" />
          <CustomInput type="radio" id="UnderstoodMost" label="most of the time" />
          <CustomInput type="radio" id="UnderstoodSome" label="some of the time" />
          <CustomInput type="radio" id="UnderstoodLittle" label="very little" />
          <CustomInput type="radio" id="UnderstoodNotAtAll" label="not at all" />
        </div>
        </FormGroup>
      </Col>
      </Row>
      <Row>
        <Col md={2}  style={{paddingTop: "34px"}}>
        <FormGroup>
          <Label check>
          <Input onClick={this.onCheck} type="checkbox" name='useFeedbackmeasured'/>Use question:
          </Label>
        </FormGroup>
        </Col>
        <Col>
        <FormGroup>
          <Label>Can you guess what the chunking task measured?</Label>
          <Input className='w-75' style={{height: '30px', padding:'3px'}} id='feedbackGuess' type='text'/>
        </FormGroup>
        </Col>
      </Row>
      <Row>
      <Col md={2}  style={{paddingTop: "34px"}}>
        <FormGroup>
          <Label check>
          <Input onClick={this.onCheck} type="checkbox" name='useFeedbackstrategy'/>Use question:
          </Label>
        </FormGroup>
        </Col>
        <Col>
        <FormGroup>
          <Label>Did you consciously adopt some strategy in marking boundaries between chunks, if any?</Label>
          <Input className='w-75' style={{height: '30px', padding:'3px'}} id='feedbackStratedy' type='text'/>
        </FormGroup>
        </Col>
      </Row>
      <Row>
      <Col md={2}  style={{paddingTop: "34px"}}>
        <FormGroup>
          <Label check>
          <Input onClick={this.onCheck} type="checkbox" name='useFeedbackimpression'/>Use question:
          </Label>
        </FormGroup>
        </Col>
        <Col>
        <FormGroup>
          <Label>Did you have an impression that the task gradually became easier?</Label>
          <Input className='w-75' style={{height: '30px', padding:'3px'}} id='feedbackEasier' type='text'/>
        </FormGroup>
        </Col>
      </Row>
      <Row>
      <Col md={2}  style={{paddingTop: "34px"}}>
        <FormGroup>
          <Label check>
          <Input onClick={this.onCheck} type="checkbox" name='useFeedbackcomments'/>Use question:
          </Label>
        </FormGroup>
        </Col>
        <Col>
        <FormGroup>
          <Label>Do you have other comments?</Label>
          <Input className='w-75' style={{padding:'3px'}} id='feedbackComments' type='textarea'/>
        </FormGroup>
        </Col>
      </Row>
      <Row>
      <Col md={2}  style={{paddingTop: "15px"}}>
        <FormGroup>
          <Label check>
          <Input onClick={this.onCheck} type="checkbox" name='useFeedbackCommentsText'/>Use text:
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
              <Input onClick={this.onCheck} defaultChecked={item.isChecked} type="checkbox" id={`useFeedbackNew${item.question_type}_Qestion${item.id}`} name={`useFeedbackNew_${item.question_type}_Qestion${item.id}`}/>Use question:
              </Label>
            </FormGroup>
            </Col>
            <Col>
            <FormGroup>
              <Label>Insert text of the {`${item.question_type}`} question:</Label>
              <Input className='w-75' onChange={this.onChange} style={{padding:'3px'}} id={`FeedbackNew${item.question_type}_Qestion${item.id}`} type='textarea' name={`FeedbackNew_${item.question_type}_Qestion${item.id}`} value={store.get(`FeedbackNew_${item.question_type}_Qestion${item.id}`)}/>
            </FormGroup>
            </Col>
          </Row>
          )
        })}
      <br/>
      <Button id='addButtonFeedback' onClick={() =>  this.addQuestion('bool')} color="info">Add Bool Question</Button>{' '}
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