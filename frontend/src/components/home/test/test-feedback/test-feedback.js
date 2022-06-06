import React, {Component} from 'react';
import styled from 'styled-components';
import {  Input, FormGroup, Label, Button, CustomInput } from 'reactstrap';

export default class TestFeedback extends Component {
    constructor(props) {
        super(props);
        // this.htmlDecode = this.htmlDecode.bind(this)
        }
        componentDidMount(){
            // console.log(e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue)
            // return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
            }
        render() {
            let store = require('store');
            console.log('test feedback instructions')
            return(
            <>
            <h3>Feedback</h3>
                <p>Please answer the questions below. Your responses are important for us! </p>
                <p>(Giving feedback is voluntary. If you do not want to answer the questions, you can simply click “Submit” at the end of the page.)</p>
                {store.get('useFeedbackinstructions')?
                    <FormGroup>
                    <Label>The task instructions were clear.</Label>
                    <div> 
                    <CustomInput type="radio" id="TaskClearStrongly_disagree" label="Strongly disagree" />
                    <CustomInput type="radio" id="TaskClearDisagree" label="Disagree" />
                    <CustomInput type="radio" id="TaskClearNeutral" label="Neutral" />
                    <CustomInput type="radio" id="TaskClearDisagree" label="Agree" />
                    <CustomInput type="radio" id="TaskClearStrongly_agree" label="Strongly agree" />
                    </div>
                    </FormGroup>: null}
                {store.get('useFeedbackdoing')?
                    <FormGroup>
                    <Label>I knew what I was doing.</Label>
                    <div> 
                    <CustomInput type="radio" id="KnewWhatDoingStrongly_disagree" label="Strongly disagree" />
                    <CustomInput type="radio" id="KnewWhatDoingDisagree" label="Disagree" />
                    <CustomInput type="radio" id="KnewWhatDoingNeutral" label="Neutral" />
                    <CustomInput type="radio" id="KnewWhatDoingDisagree" label="Agree" />
                    <CustomInput type="radio" id="KnewWhatDoingStrongly_agree" label="Strongly agree" />
                    </div>
                    </FormGroup>: null}
                {store.get('useFeedbacksimple')?
                    <FormGroup>
                    <Label>The task was relatively simple.</Label>
                    <div> 
                    <CustomInput type="radio" id="TaskSimpleStrongly_disagree" label="Strongly disagree" />
                    <CustomInput type="radio" id="TaskSimpleDisagree" label="Disagree" />
                    <CustomInput type="radio" id="TaskSimpleNeutral" label="Neutral" />
                    <CustomInput type="radio" id="TaskSimpleDisagree" label="Agree" />
                    <CustomInput type="radio" id="TaskSimpleStrongly_agree" label="Strongly agree" />
                    </div>
                    </FormGroup>:null}
                {store.get('useFeedbackdemanding')?
                    <FormGroup>
                    <Label>The task was very demanding. I feel tired now.</Label>
                    <div> 
                    <CustomInput type="radio" id="TaskDemandingStrongly_disagree" label="Strongly disagree" />
                    <CustomInput type="radio" id="TaskDemandingDisagree" label="Disagree" />
                    <CustomInput type="radio" id="TaskDemandingNeutral" label="Neutral" />
                    <CustomInput type="radio" id="TaskDemandingDisagree" label="Agree" />
                    <CustomInput type="radio" id="TaskDemandingStrongly_agree" label="Strongly agree" />
                    </div>
                    </FormGroup>:null}
                {store.get('useFeedbackpessure')?
                    <FormGroup>
                    <Label>The task put a lot of pressure on me. I was in a hurry all the time and even panicked several times.</Label>
                    <div> 
                    <CustomInput type="radio" id="TaskPressureStrongly_disagree" label="Strongly disagree" />
                    <CustomInput type="radio" id="TaskPressureDisagree" label="Disagree" />
                    <CustomInput type="radio" id="TaskPressureNeutral" label="Neutral" />
                    <CustomInput type="radio" id="TaskPressureDisagree" label="Agree" />
                    <CustomInput type="radio" id="TaskPressureStrongly_agree" label="Strongly agree" />
                    </div>
                    </FormGroup>:null}
                {store.get('useFeedbackfun')?
                    <FormGroup>
                    <Label>It was fun.</Label>
                    <div> 
                    <CustomInput type="radio" id="FunStrongly_disagree" label="Strongly disagree" />
                    <CustomInput type="radio" id="FunDisagree" label="Disagree" />
                    <CustomInput type="radio" id="FunNeutral" label="Neutral" />
                    <CustomInput type="radio" id="FunDisagree" label="Agree" />
                    <CustomInput type="radio" id="FunStrongly_agree" label="Strongly agree" />
                    </div>
                    </FormGroup>:null}
                {store.get('useFeedbackreflects')?
                    <FormGroup>
                    <Label>I think the task in some way reflects what I naturally do when I listen to speech.</Label>
                    <div> 
                    <CustomInput type="radio" id="ReflectsStrongly_disagree" label="Strongly disagree" />
                    <CustomInput type="radio" id="ReflectsDisagree" label="Disagree" />
                    <CustomInput type="radio" id="ReflectsNeutral" label="Neutral" />
                    <CustomInput type="radio" id="ReflectsDisagree" label="Agree" />
                    <CustomInput type="radio" id="ReflectsStrongly_agree" label="Strongly agree" />
                    </div>
                    </FormGroup>:null}
                {store.get('useFeedbackperformance')?
                    <FormGroup>
                    <Label>How would you evaluate your performance in the task?</Label>
                    <div> 
                    <CustomInput type="radio" id="PerformancePoor" label="Poor" />
                    <CustomInput type="radio" id="PerformanceSatisfactory" label="Satisfactory" />
                    <CustomInput type="radio" id="PerformanceGood" label="Good" />
                    <CustomInput type="radio" id="PerformanceVerygood" label="Very good" />
                    </div>
                    </FormGroup>:null}
                {store.get('useFeedbackunderstood')?
                    <FormGroup>
                    <Label>I understood what the speaker was saying...</Label>
                    <div> 
                    <CustomInput type="radio" id="UnderstoodAll" label="all the time" />
                    <CustomInput type="radio" id="UnderstoodMost" label="most of the time" />
                    <CustomInput type="radio" id="UnderstoodSome" label="some of the time" />
                    <CustomInput type="radio" id="UnderstoodLittle" label="very little" />
                    <CustomInput type="radio" id="UnderstoodNotAtAll" label="not at all" />
                    </div>
                    </FormGroup>:null}
                {store.get('useFeedbackmeasured')?
                    <FormGroup>
                    <Label>Can you guess what the chunking task measured?</Label>
                    <Input className='w-75' style={{height: '30px', padding:'3px'}} id='feedbackGuess' type='text'/>
                    </FormGroup>:null}
                {store.get('useFeedbackstrategy')?
                    <FormGroup>
                    <Label>Did you consciously adopt some strategy in marking boundaries between chunks, if any?</Label>
                    <Input className='w-75' style={{height: '30px', padding:'3px'}} id='feedbackStratedy' type='text'/>
                    </FormGroup>:null}
                {store.get('useFeedbackimpression')?
                    <FormGroup>
                    <Label>Did you have an impression that the task gradually became easier?</Label>
                    <Input className='w-75' style={{height: '30px', padding:'3px'}} id='feedbackEasier' type='text'/>
                    </FormGroup>:null}
                {store.get('useFeedbackcomments')?
                    <FormGroup>
                    <Label>Do you have other comments?</Label>
                    <Input className='w-75'  style={{padding:'3px'}} id='feedbackComments' type='textarea'/>
                    </FormGroup>:null}
                {store.get('useFeedbackCommentsText')?
                    <p>Your comments on the task and the app as well as possible suggestions for further development of the task/app are very much welcome. Thank you!</p>
                    :null}
                {store.get('addQFeedback')?
                store.get('addQFeedback').map((item, index) => {
                    if (item.isChecked)
                    {if(item.question_type == 'bool'){
                        return (
                        <FormGroup>
                        <Label>{store.get(`FeedbackNew_${item.question_type}_Qestion${item.id}`)? store.get(`FeedbackNew_${item.question_type}_Qestion${item.id}`):'No question'}</Label>
                        <div>
                            <CustomInput type="radio" id={`FeedbackNew_${item.question_type}_Qestion${item.id}_yes`} label="Yes" />
                            <CustomInput type="radio" id={`FeedbackNew_${item.question_type}_Qestion${item.id}_no`} label="No" />
                        </div>
                        </FormGroup>
                    )} else if (item.question_type == 'text'){
                        return (
                        <FormGroup>
                        <Label>{store.get(`FeedbackNew_${item.question_type}_Qestion${item.id}`)? store.get(`FeedbackNew_${item.question_type}_Qestion${item.id}`):'No question'}</Label>
                        <Input className='w-75' style={{padding:'3px'}} id={`FeedbackNew_${item.question_type}_Qestion${item.id}`} type='textarea' name={`FeedbackNew_${item.question_type}_Qestion${item.id}`}/>
                        </FormGroup>
                    )}
                    }
                    }):null}
            </>
         )}
    }