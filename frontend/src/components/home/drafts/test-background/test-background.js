import React, {Component} from 'react';
import {  Input, FormGroup, Label, Button, CustomInput } from 'reactstrap';


export default class TestBackground extends Component {
    constructor(props) {
        super(props);
        }
        render() {
            let store = require('store');
            return(
            <>        
                <h3>Background</h3>
                <p>Please fill in the form below. All information you provide will be handled confidentially.</p>
                    <div id='background'>
                    {store.get('useBackgroundAge')?
                    <FormGroup>
                    <Label>Age</Label>
                    <Input style={{width: "50px", height: '30px', padding:'3px', marginRight: '10px'}}  type='number'/>
                    </FormGroup>:
                    null
                    }
                    {store.get('useBackgroundGender')?
                    <FormGroup>
                    <Label>Gender</Label>
                    <Input className='w-25' style={{height: '30px', padding:'3px'}}  type="select" >
                        <option>-----</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </Input>
                    </FormGroup>:
                    null}
                    {store.get('useBackgroundLevelEducation')?
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
                    </FormGroup> : null}
                    {store.get('useBackgroundAcadmicField')?
                    <FormGroup>
                        <Label>Major subject or academic field</Label>
                        <Input className='w-75' style={{height: '30px', padding:'3px'}} type='text' />
                    </FormGroup>: null}
                    {store.get('useBackgroundNative')?
                    <FormGroup>
                        <Label>Native language(s)</Label>
                        <Input className='w-75' style={{height: '30px', padding:'3px'}}  type='text' />
                    </FormGroup>:null}
                    {store.get('useBackgroundOther')?
                    <FormGroup>
                        <Label>Other languages</Label>
                        <Input className='w-75' style={{height: '30px', padding:'3px'}} id='backgroundOther' type='text' />
                    </FormGroup>:null}
                    {store.get('useBackgroundDyslexsia')?
                    <FormGroup>
                    <Label>Have you been diagnosed with dyslexsia?</Label>
                    <div>
                        <CustomInput type="radio" id="dyslexsia_yes" label="Yes" />
                        <CustomInput type="radio" id="dyslexsia_no" label="No" />
                    </div>
                    </FormGroup>:null}
                    {store.get('useBackgroundHearingDiff')?<FormGroup>
                    <Label>Do you have any hearing difficulties?</Label>
                    <div>
                        <CustomInput type="radio" id="hearing_yes" label="Yes" />
                        <CustomInput type="radio" id="hearing_no" label="No" />
                    </div>
                    </FormGroup>: null}
                    {store.get('useBackgroundWhisper')?<FormGroup>
                    <Label>Do you have difficulty hearing when someone speaks in a whisper?</Label>
                    <div>
                        <CustomInput type="radio" id="hearing_yes" label="Yes" />
                        <CustomInput type="radio" id="hearing_no" label="No" />
                    </div>
                    </FormGroup>: null}
                    {store.get('useBackgroundComments')?<FormGroup>
                        <Label>Any other comments?</Label>
                        <Input className='w-75' style={{padding:'3px'}} id='backgroundComments' type='textarea'/>
                    </FormGroup>:null}
                    <div id='addedQBack'>
                    {store.get('addedQuestionsBackground')?
                    store.get('addedQuestionsBackground').map((item, index) => {
                        if (item.isChecked)
                        {if(item.question_type == 'bool'){
                            return (
                            <FormGroup>
                            <Label>{store.get(`BackgroundNew_${item.question_type}_Qestion${item.id}`)? store.get(`BackgroundNew_${item.question_type}_Qestion${item.id}`):'No question'}</Label>
                            <div>
                                <CustomInput type="radio" id={`BackgroundNew_${item.question_type}_Qestion${item.id}_yes`} label="Yes" />
                                <CustomInput type="radio" id={`BackgroundNew_${item.question_type}_Qestion${item.id}_no`} label="No" />
                            </div>
                            </FormGroup>
                        )} else if (item.question_type == 'text'){
                            return (
                            <FormGroup>
                            <Label>{store.get(`BackgroundNew_${item.question_type}_Qestion${item.id}`)? store.get(`BackgroundNew_${item.question_type}_Qestion${item.id}`):'No question'}</Label>
                            <Input className='w-75' style={{padding:'3px'}} id={`BackgroundNew_${item.question_type}_Qestion${item.id}`} type='textarea' name={`BackgroundNew_${item.question_type}_Qestion${item.id}`}/>
                            </FormGroup>
                        )}
                        }
                        }):null}
                    </div>
                    <Button color='light' className="float-left"  onClick={() => {this.props.toggle(String(+this.props.active - 1))}}><span className="fa fa-angle-left"></span> Go back</Button>
                    <Button color='light' className="float-right"  onClick={() => {this.props.toggle(String(+this.props.active + 1))}}>Next <span className="fa fa-angle-right"></span></Button>
                    <div className='clearfix'></div>
                </div>
            </>
         )}
    }