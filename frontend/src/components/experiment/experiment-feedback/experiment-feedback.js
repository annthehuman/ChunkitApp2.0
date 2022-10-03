import React, {Component} from 'react';

import {  Input, FormGroup, Label, Button, CustomInput } from 'reactstrap';

export default class ExperimentFeedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addedQFeed: []
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.getCookie = this.getCookie.bind(this)
        }
        componentDidMount() {
            let obj = []
            let s = 0
            for (let i in this.props.data.feedbackAddQ) {
                if (i.split('_')[1] == 'bool') {
                    let type = 'bool',
                        name = `FeedbackNew_bool_Qestion${i.slice(-1)}`,
                        text = this.props.data.feedbackAddQ[`FeedbackNew_bool_Qestion${i.slice(-1)}`][0];
                    obj.push({type, name, text})
                } else if (i.split('_')[1] == 'text') {
                    let type = 'text',
                        name = `FeedbackNew_text_Qestion${i.slice(-1)}`,
                        text = this.props.data.feedbackAddQ[`FeedbackNew_text_Qestion${i.slice(-1)}`][0];
                    obj.push({type, name, text})
                }
                s = s + 1
            }
            this.setState({addedQFeed: obj})
        }
        getCookie(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                let cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    let cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = cookie.substring(name.length + 1);
                        break;
                    }
                }
            }
            return cookieValue;
        }
        onSubmit(e) {
            e.preventDefault();
            const form = e.target,
                  formData = new FormData(form)
            const csrf = this.getCookie('csrftoken');
            const user = this.getCookie('user');
            if (!user) {
                this.props.nextPage()
            }
            const prolific = this.getCookie('prolific')
            prolific ? formData.append('prolific', prolific) : null
            formData.append("csrfmiddlewaretoken", csrf);
            formData.append('session_key', user);
            formData.append('experiment_name', this.props.data.nameExperementForParticipants)
            fetch('/feedback/', {
                method: "POST",
                body: formData
                }).then(data => {
                let store = require('store')
                store.clearAll();
                if (!data.ok){
                    throw Error(data.status);
                } else {
                    this.props.nextPage()
                }
                }).catch((data) => {
                console.log(`Try again! Error: ${Error(data.status)}`)
                }).finally(() => {
                form.reset();
                });
        }

        render() {
            return(
            <>
            <h3>Feedback</h3>
                <p>Please answer the questions below. Your responses are important for us! <br/>(Giving feedback is voluntary. If you do not want to answer the questions, you can simply click “Submit” at the end of the page.)</p>
                <form onSubmit={this.onSubmit} id='feedback'>
                {this.props.data.feedbackExample.useFeedbackinstructions?
                    <FormGroup>
                    <Label>The task instructions were clear.</Label>
                    <div> 
                    <CustomInput type="radio" name="instructions" id="TaskClearStrongly_disagree" value="Strongly disagree"  label="Strongly disagree" />
                    <CustomInput type="radio" name="instructions" id="TaskClearDisagree" value="Disagree"  label="Disagree" />
                    <CustomInput type="radio" name="instructions" id="TaskClearNeutral" value="Neutral"  label="Neutral" />
                    <CustomInput type="radio" name="instructions" id="TaskClearDisagree" value="Agree"  label="Agree" />
                    <CustomInput type="radio" name="instructions" id="TaskClearStrongly_agree" value="Strongly agree"  label="Strongly agree" />
                    </div>
                    </FormGroup>: null}
                {this.props.data.feedbackExample.useFeedbackdoing?
                    <FormGroup>
                    <Label>I knew what I was doing.</Label>
                    <div> 
                    <CustomInput type="radio" name="doing" id="KnewWhatDoingStrongly_disagree" value="Strongly disagree"  label="Strongly disagree" />
                    <CustomInput type="radio" name="doing" id="KnewWhatDoingDisagree" value="Disagree"  label="Disagree" />
                    <CustomInput type="radio" name="doing" id="KnewWhatDoingNeutral" value="Neutral"  label="Neutral" />
                    <CustomInput type="radio" name="doing" id="KnewWhatDoingDisagree" value="Agree"  label="Agree" />
                    <CustomInput type="radio" name="doing" id="KnewWhatDoingStrongly_agree" value="Strongly agree"  label="Strongly agree" />
                    </div>
                    </FormGroup>: null}
                {this.props.data.feedbackExample.useFeedbacksimple?
                    <FormGroup>
                    <Label>The task was relatively simple.</Label>
                    <div> 
                    <CustomInput type="radio" name="simple" id="TaskSimpleStrongly_disagree" value="Strongly disagree"  label="Strongly disagree"/>
                    <CustomInput type="radio" name="simple" id="TaskSimpleDisagree" value="Disagree"  label="Disagree" />
                    <CustomInput type="radio" name="simple" id="TaskSimpleNeutral" value="Neutral"  label="Neutral" />
                    <CustomInput type="radio" name="simple" id="TaskSimpleDisagree" value="Agree"  label="Agree" />
                    <CustomInput type="radio" name="simple" id="TaskSimpleStrongly_agree" value="Strongly agree"  label="Strongly agree" />
                    </div>
                    </FormGroup>:null}
                {this.props.data.feedbackExample.useFeedbackdemanding?
                    <FormGroup>
                    <Label>The task was very demanding. I feel tired now.</Label>
                    <div> 
                    <CustomInput type="radio" name="demanding" id="TaskDemandingStrongly_disagree" value="Strongly disagree"  label="Strongly disagree"/>
                    <CustomInput type="radio" name="demanding" id="TaskDemandingDisagree" value="Disagree"  label="Disagree" />
                    <CustomInput type="radio" name="demanding" id="TaskDemandingNeutral" value="Neutral"  label="Neutral" />
                    <CustomInput type="radio" name="demanding" id="TaskDemandingDisagree" value="Agree"  label="Agree" />
                    <CustomInput type="radio" name="demanding" id="TaskDemandingStrongly_agree" value="Strongly agree"  label="Strongly agree" />
                    </div>
                    </FormGroup>:null}
                {this.props.data.feedbackExample.useFeedbackpessure?
                    <FormGroup>
                    <Label>The task put a lot of pressure on me. I was in a hurry all the time and even panicked several times.</Label>
                    <div> 
                    <CustomInput type="radio" name="pessure" id="TaskPressureStrongly_disagree" value="Strongly disagree"  label="Strongly disagree"/>
                    <CustomInput type="radio" name="pessure" id="TaskPressureDisagree" value="Disagree"  label="Disagree" />
                    <CustomInput type="radio" name="pessure" id="TaskPressureNeutral" value="Neutral"  label="Neutral" />
                    <CustomInput type="radio" name="pessure" id="TaskPressureDisagree" value="Agree"  label="Agree" />
                    <CustomInput type="radio" name="pessure" id="TaskPressureStrongly_agree" value="Strongly agree"  label="Strongly agree" />
                    </div>
                    </FormGroup>:null}
                {this.props.data.feedbackExample.useFeedbackfun?
                    <FormGroup>
                    <Label>It was fun.</Label>
                    <div> 
                    <CustomInput type="radio" name="fun" id="FunStrongly_disagree" value="Strongly disagree"  label="Strongly disagree"/>
                    <CustomInput type="radio" name="fun" id="FunDisagree" value="Disagree"  label="Disagree" />
                    <CustomInput type="radio" name="fun" id="FunNeutral" value="Neutral"  label="Neutral" />
                    <CustomInput type="radio" name="fun" id="FunDisagree" value="Agree"  label="Agree" />
                    <CustomInput type="radio" name="fun" id="FunStrongly_agree" value="Strongly agree"  label="Strongly agree" />
                    </div>
                    </FormGroup>:null}
                {this.props.data.feedbackExample.useFeedbackreflects?
                    <FormGroup>
                    <Label>I think the task in some way reflects what I naturally do when I listen to speech.</Label>
                    <div> 
                    <CustomInput type="radio" name="reflects" id="ReflectsStrongly_disagree" value="Strongly disagree"  label="Strongly disagree"/>
                    <CustomInput type="radio" name="reflects" id="ReflectsDisagree" value="Disagree"  label="Disagree" />
                    <CustomInput type="radio" name="reflects" id="ReflectsNeutral" value="Neutral"  label="Neutral" />
                    <CustomInput type="radio" name="reflects" id="ReflectsDisagree" value="Agree"  label="Agree" />
                    <CustomInput type="radio" name="reflects" id="ReflectsStrongly_agree" value="Strongly agree"  label="Strongly agree" />
                    </div>
                    </FormGroup>:null}
                {this.props.data.feedbackExample.useFeedbackperformance?
                    <FormGroup>
                    <Label>How would you evaluate your performance in the task?</Label>
                    <div> 
                    <CustomInput type="radio" name="performance" id="PerformancePoor" value="Poor"  label="Poor" />
                    <CustomInput type="radio" name="performance" id="PerformanceSatisfactory" value="Satisfactory"  label="Satisfactory" />
                    <CustomInput type="radio" name="performance" id="PerformanceGood" value="Good"  label="Good" />
                    <CustomInput type="radio" name="performance" id="PerformanceVerygood" value="Very good"  label="Very good" />
                    </div>
                    </FormGroup>:null}
                {this.props.data.feedbackExample.useFeedbackunderstood?
                    <FormGroup>
                    <Label>I understood what the speaker was saying...</Label>
                    <div> 
                    <CustomInput type="radio" name="understood" id="UnderstoodAll" value="all the time"  label="all the time" />
                    <CustomInput type="radio" name="understood" id="UnderstoodMost" value="most of the time"  label="most of the time" />
                    <CustomInput type="radio" name="understood" id="UnderstoodSome" value="some of the time"  label="some of the time" />
                    <CustomInput type="radio" name="understood" id="UnderstoodLittle" value="very little"  label="very little" />
                    <CustomInput type="radio" name="understood" id="UnderstoodNotAtAll" value="not at all"  label="not at all" />
                    </div>
                    </FormGroup>:null}
                {this.props.data.feedbackExample.useFeedbackmeasured?
                    <FormGroup>
                    <Label>Can you guess what the chunking task measured?</Label>
                    <Input className='w-75' name="measured" style={{height: '30px', padding:'3px'}} id='feedbackGuess' type='text'/>
                    </FormGroup>:null}
                {this.props.data.feedbackExample.useFeedbackstrategy?
                    <FormGroup>
                    <Label>Did you consciously adopt some strategy in marking boundaries between chunks, if any?</Label>
                    <Input className='w-75' name="strategy" style={{height: '30px', padding:'3px'}} id='feedbackStratedy' type='text'/>
                    </FormGroup>:null}
                {this.props.data.feedbackExample.useFeedbackimpression?
                    <FormGroup>
                    <Label>Did you have an impression that the task gradually became easier?</Label>
                    <Input className='w-75' name="impression" style={{height: '30px', padding:'3px'}} id='feedbackEasier' type='text'/>
                    </FormGroup>:null}
                {this.props.data.feedbackExample.useFeedbackcomments?
                    <FormGroup>
                    <Label>Do you have other comments?</Label>
                    <Input className='w-75' name="comments" style={{padding:'3px'}} id='feedbackComments' type='textarea'/>
                    </FormGroup>:null}
                {this.props.data.feedbackExample.useFeedbackCommentsText?
                    <p>Your comments on the task and the app as well as possible suggestions for further development of the task/app are very much welcome. Thank you!</p>
                    :null}
                {this.state.addedQFeed?
                this.state.addedQFeed.map((item, index) => {
                    if (this.props.data.feedbackExample[`use${item.name}`])
                    {if(item.type == 'bool'){
                        return (
                        <FormGroup>
                        <Label>{item.text}</Label>
                        <div>
                            <CustomInput type="radio" name={`FeedbackNew_${item.type}_Qestion${index}`} id={`FeedbackNew_${item.type}_Qestion${index}_yes`} value="Yes"  label="Yes" />
                            <CustomInput type="radio" name={`FeedbackNew_${item.type}_Qestion${index}`} id={`FeedbackNew_${item.type}_Qestion${index}_no`} value="No"  label="No" />
                        </div>
                        </FormGroup>
                    )} else if (item.type == 'text'){
                        return (
                        <FormGroup>
                        <Label>{item.text}</Label>
                        <Input id={`FeedbackNew_${item.type}_Qestion${index}`} type='text' name={`FeedbackNew_${item.type}_Qestion${index}`}/>
                        </FormGroup>
                    )}
                    }
                    }):null}
                    <Button type='submit' name='ConfirmBackground' color="primary">Submit</Button>
                </form>
            </>
         )}
    }