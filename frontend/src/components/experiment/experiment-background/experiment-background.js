import React, {Component} from 'react';
import styled from 'styled-components';
import {  Input, FormGroup, Label, Button,  CustomInput } from 'reactstrap';

export default class ExperimentBackground extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addedQBack: []
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.getCookie = this.getCookie.bind(this)
        }

        componentDidMount() {
            let obj = []
            let s = 0
            for (let i in this.props.data.backgroundAddQ) {
                if (i.split('_')[1] == 'bool') {
                    let type = 'bool',
                        name = `BackgroundNew_bool_Qestion${i.slice(-1)}`,
                        text = this.props.data.backgroundAddQ[`BackgroundNew_bool_Qestion${i.slice(-1)}`][0];
                    obj.push({type, name, text})
                } else if (i.split('_')[1] == 'text') {
                    let type = 'text',
                        name = `BackgroundNew_text_Qestion${i.slice(-1)}`,
                        text = this.props.data.backgroundAddQ[`BackgroundNew_text_Qestion${i.slice(-1)}`][0];
                    obj.push({type, name, text})
                }
                s = s + 1
                // console.log(this.props.data.backgroundAddQ[`BackgroundNew_bool_Qestion${i}`])
                // obj.push
            }
            this.setState({addedQBack: obj})
            // for (let key in Object.keys(JSON.parse(JSON.stringify(this.props.data.backgroundAddQ)))) {
            //     console.log('BackgroundNew_bool_Qestion'+key)
            // }  
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
            console.log(...formData)
            const csrf = this.getCookie('csrftoken');
            const user = this.getCookie('user');
            const prolific = this.getCookie('prolific')
            prolific ? formData.append('prolific', prolific) : null
            formData.append("csrfmiddlewaretoken", csrf);
            formData.append('session_key', user)
            formData.append('experiment_name', this.props.data.nameExperementForParticipants)
            fetch('/questionnaire/', {
                method: "POST",
                // headers: {
                //     'X-CSRFToken': csrf,
                //     "Content-Type": "application/json",
                //     "X-Requested-With": "XMLHttpRequest"
                // },
                body: formData
                }).then(data => {
                let store = require('store')
                store.clearAll();
                if (!data.ok){
                    throw Error(data.status);
                } else {
                    this.props.nextPage()
                }
                //console.log('так')
                }).catch((data) => {
                console.log(`Try again! Error: ${Error(data.status)}`)
                }).finally(() => {
                form.reset();
                });
        }

        render() {
            let store = require('store');
            // console.log(this.props.data, this.props.data.backgroundAddQ)
            return(
            <>        
                <h3>Background</h3>
                <p>Please fill in the form below. All information you provide will be handled confidentially.</p>
                    <form onSubmit={this.onSubmit} id='background' style={{margin: '30px auto'}}>
                    {this.props.data.backgroundExample.useBackgroundAge?
                    <FormGroup>
                    <Label>Age</Label>
                    <Input name='Age' required  style={{width: "50px", height: '30px', padding:'3px', marginRight: '10px'}}  type='number'/>
                    </FormGroup>:
                    null
                    }
                    {this.props.data.backgroundExample.useBackgroundGender?
                    <FormGroup>
                    <Label>Gender</Label>
                    <Input name='Gender' required className='w-25' style={{height: '30px', padding:'3px'}}  type="select" >
                        <option>-----</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </Input>
                    </FormGroup>:
                    null}
                    {this.props.data.backgroundExample.useBackgroundLevelEducation?
                    <FormGroup>
                        <Label>Which of the options below indicate the highest level of education you have completed?</Label>
                        <Input name='LevelEducation' required className='w-75' style={{height: '30px', padding:'3px'}} id='backgroundLevelEducation' type='select'>
                        <option>-----</option>
                        <option>Primary school</option>
                        <option>Lower secondary school</option>
                        <option>Upper secondary school, upper secondary school graduate, or vocational education graduate</option>
                        <option>University of applied sciences</option>
                        <option>University degree: BA or equivalent</option>
                        <option>University degree: MA or equivalent</option>
                        <option>University degree: Ph.D. or equivalent</option>
                        </Input>
                    </FormGroup> : null}
                    {this.props.data.backgroundExample.useBackgroundAcadmicField?
                    <FormGroup>
                        <Label>Major subject or academic field</Label>
                        <Input name='AcadmicField' autoComplete="off" className='w-75' style={{height: '30px', padding:'3px'}} type='text' />
                    </FormGroup>: null}
                    {this.props.data.backgroundExample.useBackgroundNativeLanguage?
                    <FormGroup>
                        <Label>Native language(s)</Label>
                        <Input name='NativeLanguage' autoComplete="off" required className='w-75' style={{height: '30px', padding:'3px'}}  type='text' />
                    </FormGroup>:null}
                    {this.props.data.backgroundExample.useBackgroundOtherLanguage?
                    <FormGroup>
                        <Label>Other languages</Label>
                        <Input name='OtherLanguage' autoComplete="off" className='w-75' style={{height: '30px', padding:'3px'}} id='backgroundOther' type='text' />
                    </FormGroup>:null}
                    {this.props.data.backgroundExample.useBackgroundDyslexsia?
                    <FormGroup>
                    <Label>Have you been diagnosed with dyslexsia?</Label>
                    <div>
                        <CustomInput name='Dyslexsia' required type="radio" id="dyslexsia_yes" label="Yes" value="Yes" />
                        <CustomInput name='Dyslexsia' required type="radio" id="dyslexsia_no" label="No" value="No" />
                    </div>
                    </FormGroup>:null}
                    {this.props.data.backgroundExample.useBackgroundHearingDiff?<FormGroup>
                    <Label>Do you have any hearing difficulties?</Label>
                    <div>
                        <CustomInput name='HearingDiff' required type="radio" id="hearing_yes" label="Yes" value="Yes" />
                        <CustomInput name='HearingDiff' required type="radio" id="hearing_no" label="No" value="No" />
                    </div>
                    </FormGroup>: null}
                    {this.props.data.backgroundExample.useBackgroundWhisper?<FormGroup>
                    <Label>Do you have difficulty hearing when someone speaks in a whisper?</Label>
                    <div>
                        <CustomInput name='Whisper' required type="radio" id="whisper_yes" label="Yes" value="Yes" />
                        <CustomInput name='Whisper' required type="radio" id="whisper_no" label="No" value="No" />
                    </div>
                    </FormGroup>: null}
                    {this.props.data.backgroundExample.useBackgroundComments?<FormGroup>
                        <Label>Any other comments?</Label>
                        <Input name='Comments' autoComplete="off" className='w-75' style={{padding:'3px'}} id='backgroundComments' type='textarea'/>
                    </FormGroup>:null}
                    {/* </Col>
                    </Row> */}
                    <div id='addedQBack'>
                    {this.state.addedQBack ?
                    this.state.addedQBack.map((item, index) => {
                        if (this.props.data.backgroundExample[`use${item.name}`]) {
                            if(item.type == 'bool'){
                                return (
                                <FormGroup>
                                <Label>{item.text}</Label>
                                <div>
                                    <CustomInput type="radio" required name={`BackgroundNew_${item.type}_Qestion${index}`} id={`BackgroundNew_${item.type}_Qestion${index}_yes`} label="Yes" value="Yes" />
                                    <CustomInput type="radio" required name={`BackgroundNew_${item.type}_Qestion${index}`} id={`BackgroundNew_${item.type}_Qestion${index}_no`} label="No" value="No" />
                                </div>
                                </FormGroup>
                            )} else if (item.type == 'text'){
                                return (
                                <FormGroup>
                                <Label className='w-75'>{item.text}</Label>
                                <Input id={`BackgroundNew_${item.type}_Qestion${index}`}  style={{height: '30px', padding:'3px'}} className='w-75' autoComplete="off" required type='text' name={`BackgroundNew_${item.type}_Qestion${index}`}/>
                                </FormGroup>
                            )
                            }}
                  }): null}                
                    </div>
                    <Button type='submit' name='ConfirmBackground' color="primary">Confirm</Button>
                </form>
            </>
         )}
    }