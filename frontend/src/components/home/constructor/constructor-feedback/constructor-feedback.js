import React, {Component} from 'react';
import styled from 'styled-components';
import {  Input, FormGroup, Label, Form, Button, Row, Col, CustomInput } from 'reactstrap';
import CustomBox from '../../../../common_components/box';
import CustomHeader from '../../../../common_components/header';
import { Grid, Typography } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CustomButton from '../../../../common_components/button/button';
import { Stack } from '@mui/material';

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
  ({ theme, checked }) => ({
    '.MuiFormControlLabel-label': checked && {
      color: '#6083FF',
    },
    '.PrivateSwitchBase-input': {
      border: '8px'
    },
    '.MuiRadio-root': checked && {
      color: '#6083FF',
    },
  }),
);

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

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
    if (!store.get('addQFeedback') && feedbackExpample){
    let item = this.state.additional_quesion_list
    Object.keys(feedbackExpample).forEach(function (key){
      if (feedbackExpample[key][0] == 'true') {
        if (key.indexOf('New') != -1){
          const question_type = key.split('_')[1],
                  id = +key.split('_').at(-1).at(-1),
                  isChecked = true;
          item.push({ question_type, id, isChecked})
        }
        store.set(key, true)
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
          check.checked = store.get(check.name)
        }
    })
    if (store.get('addQFeedback') && store.get('addQFeedback').length > 0){
    this.setState({additional_quesion_list: store.get('addQFeedback'),
    additional_quesion_id: +store.get('addQFeedback').pop().id})}
  }
  onCheck(e){
    let store = require('store');
    store.set(e.target.name, e.target.checked)
    this.props.appendForm(e.target.name, e.target.checked)
  }

  onChange(e) {
    let store = require('store');
    const qName = e.target.name
    store.set(qName, e.target.value)
    this.props.appendForm(qName, e.target.value)
    let addedQ = store.get('feedbackAddQ') ? store.get('feedbackAddQ') : new Object()
    addedQ[qName] = [e.target.value]
    store.set('feedbackAddQ', addedQ)
  }
  addQuestion(type){
    let store = require('store');
    const item = this.state.additional_quesion_list,
          id = this.state.additional_quesion_id+1,
          question_type = type,
          isChecked = true;
    item.push({ question_type, id, isChecked})
    store.set(`useFeedbackNew_${question_type}_Qestion${id}`, true)
    this.props.appendForm(`useFeedbackNew_${question_type}_Qestion${id}`, true)
    this.setState({additional_quesion_list: item,
                    additional_quesion_id: id}, function(){
                      store.set('addQFeedback', this.state.additional_quesion_list)
                    })
  }

  render () {
    let store = require('store');
    return(
      <>
        <CustomHeader text='Feedback questions'/>
        <Typography sx={{fontSize: '20px', marginTop: '10px', marginBottom: '10px'}}>Please mark the questions that you want to use in your questionnaire or add your own.</Typography> 
      <div id='feedback'>
      <Grid container
        direction='row'
        justifyContent="space-between">
        <FormControlLabel control={<Checkbox 
                                    id='useFeedbackinstructions'
                                    name='useFeedbackinstructions'
                                    onClick={this.onCheck}
                                    checked={store.get('useFeedbackinstructions')}
                                    />}
                                  label={<Typography style={{fontSize: '20px'}}>The task instructions were clear.</Typography>}
                                  />
        <RadioGroup name="instructions"
                    sx={{ marginRight: '90px', color: '#8B8B8B'}}>
          <MyFormControlLabel sx={{height: '20px'}} id="TaskClearStrongly_disagree" value="Strongly disagree" label="Strongly disagree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="TaskClearDisagree" value="Disagree" label="Disagree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="TaskClearNeutral" value="Neutral" label="Neutral" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="TaskClearAgree" value="Agree" label="Agree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="TaskClearStrongly_agree" value="Strongly agree" label="Strongly agree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
        </RadioGroup>
        </Grid>
        <br/>
        <Grid container
        direction='row'
        justifyContent="space-between">
        <FormControlLabel control={<Checkbox 
                                    id='useFeedbackdoing'
                                    name='useFeedbackdoing'
                                    onClick={this.onCheck}
                                    checked={store.get('useFeedbackdoing')}
                                    />}
                                  label={<Typography style={{fontSize: '20px'}}>I knew what I was doing.</Typography>}
                                  />
        <RadioGroup name="doing"
                    sx={{ marginRight: '90px', color: '#8B8B8B'}}>
          <MyFormControlLabel sx={{height: '20px'}} id="KnewWhatDoingStrongly_disagree" value="Strongly disagree" label="Strongly disagree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="KnewWhatDoingDisagree" value="Disagree" label="Disagree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="KnewWhatDoingNeutral" value="Neutral" label="Neutral" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="KnewWhatDoingAgree" value="Agree" label="Agree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="KnewWhatDoingStrongly_agree" value="Strongly agree" label="Strongly agree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
        </RadioGroup>
        </Grid>
        <br/>
        <Grid container
        direction='row'
        justifyContent="space-between">
        <FormControlLabel control={<Checkbox 
                                    id='useFeedbacksimple'
                                    name='useFeedbacksimple'
                                    onClick={this.onCheck}
                                    checked={store.get('useFeedbacksimple')}
                                    />}
                                  label={<Typography style={{fontSize: '20px'}}>The task was relatively simple.</Typography>}
                                  />
        <RadioGroup name="simple"
                    sx={{ marginRight: '90px', color: '#8B8B8B'}}>
          <MyFormControlLabel sx={{height: '20px'}} id="TaskSimpleStrongly_disagree" value="Strongly disagree" label="Strongly disagree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="TaskSimpleDisagree" value="Disagree" label="Disagree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="TaskSimpleNeutral" value="Neutral" label="Neutral" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="TaskSimpleAgree" value="Agree" label="Agree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="TaskSimpleStrongly_agree" value="Strongly agree" label="Strongly agree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
        </RadioGroup>
        </Grid>
        <br/>
        <Grid container
        direction='row'
        justifyContent="space-between">
        <FormControlLabel control={<Checkbox 
                                    id='useFeedbackdemanding'
                                    name='useFeedbackdemanding'
                                    onClick={this.onCheck}
                                    checked={store.get('useFeedbackdemanding')}
                                    />}
                                  label={<Typography style={{fontSize: '20px'}}>The task was very demanding. I feel tired now.</Typography>}
                                  />
        <RadioGroup name="demanding"
                    sx={{ marginRight: '90px', color: '#8B8B8B'}}>
          <MyFormControlLabel sx={{height: '20px'}} id="TaskDemandingStrongly_disagree" value="Strongly disagree" label="Strongly disagree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="TaskDemandingDisagree" value="Disagree" label="Disagree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="TaskDemandingNeutral" value="Neutral" label="Neutral" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="TaskDemandingAgree" value="Agree" label="Agree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="TaskDemandingStrongly_agree" value="Strongly agree" label="Strongly agree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
        </RadioGroup>
        </Grid>
        <br/>
        <Grid container
        direction='row'
        justifyContent="space-between">
        <FormControlLabel control={<Checkbox 
                                    id='useFeedbackpessure'
                                    name='useFeedbackpessure'
                                    onClick={this.onCheck}
                                    checked={store.get('useFeedbackpessure')}
                                    />}
                                  label={<Typography style={{fontSize: '20px', maxWidth: '400px'}}>The task put a lot of pressure on me. I was in a hurry all the time and even panicked several times.</Typography>}
                                  />
        <RadioGroup name="pessure"
                    sx={{ marginRight: '90px', color: '#8B8B8B'}}>
          <MyFormControlLabel sx={{height: '20px'}} id="TaskPressureStrongly_disagree" value="Strongly disagree" label="Strongly disagree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="TaskPressureDisagree" value="Disagree" label="Disagree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="TaskPressureNeutral" value="Neutral" label="Neutral" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="TaskPressureAgree" value="Agree" label="Agree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="TaskPressureStrongly_agree" value="Strongly agree" label="Strongly agree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
        </RadioGroup>
        </Grid>
        <br/>
        <Grid container
        direction='row'
        justifyContent="space-between">
        <FormControlLabel control={<Checkbox 
                                    id='useFeedbackfun'
                                    name='useFeedbackfun'
                                    onClick={this.onCheck}
                                    checked={store.get('useFeedbackfun')}
                                    />}
                                  label={<Typography style={{fontSize: '20px'}}>It was fun.</Typography>}
                                  />
        <RadioGroup name="fun"
                    sx={{ marginRight: '90px', color: '#8B8B8B'}}>
          <MyFormControlLabel sx={{height: '20px'}} id="FunStrongly_disagree" value="Strongly disagree" label="Strongly disagree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="FunDisagree" value="Disagree" label="Disagree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="FunNeutral" value="Neutral" label="Neutral" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="FunAgree" value="Agree" label="Agree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="FunStrongly_agree" value="Strongly agree" label="Strongly agree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
        </RadioGroup>
        </Grid>
        <br/>
        <Grid container
        direction='row'
        justifyContent="space-between">
        <FormControlLabel control={<Checkbox 
                                    id='useFeedbackreflects'
                                    name='useFeedbackreflects'
                                    onClick={this.onCheck}
                                    checked={store.get('useFeedbackreflects')}
                                    />}
                                  label={<Typography style={{fontSize: '20px', maxWidth: '400px'}}>I think the task in some way reflects what I naturally do when I listen to speech.</Typography>}
                                  />
        <RadioGroup name="reflects"
                    sx={{ marginRight: '90px', color: '#8B8B8B'}}>
          <MyFormControlLabel sx={{height: '20px'}} id="ReflectsStrongly_disagree" value="Strongly disagree" label="Strongly disagree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="ReflectsDisagree" value="Disagree" label="Disagree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="ReflectsNeutral" value="Neutral" label="Neutral" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="ReflectsAgree" value="Agree" label="Agree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="ReflectsStrongly_agree" value="Strongly agree" label="Strongly agree" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
        </RadioGroup>
        </Grid>
        <br/>
        <Grid container
        direction='row'
        justifyContent="space-between">
        <FormControlLabel control={<Checkbox 
                                    id='useFeedbackperformance'
                                    name='useFeedbackperformance'
                                    onClick={this.onCheck}
                                    checked={store.get('useFeedbackperformance')}
                                    />}
                                  label={<Typography style={{fontSize: '20px', maxWidth: '400px'}}>How would you evaluate your performance in the task?</Typography>}
                                  />
        <RadioGroup name="performance"
                    sx={{ marginRight: '128px', color: '#8B8B8B'}}>
          <MyFormControlLabel sx={{height: '20px'}} id="PerformancePoor" value="Poor" label="Poor" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="PerformanceSatisfactory" value="Satisfactory" label="Satisfactory" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="PerformanceGood" value="Good" label="Good" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="PerformanceVerygood" value="Very good" label="Very good" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
        </RadioGroup>
        </Grid>
        <br/>
        <Grid container
        direction='row'
        justifyContent="space-between">
        <FormControlLabel control={<Checkbox 
                                    id='useFeedbackunderstood'
                                    name='useFeedbackunderstood'
                                    onClick={this.onCheck}
                                    checked={store.get('useFeedbackunderstood')}
                                    />}
                                  label={<Typography style={{fontSize: '20px', maxWidth: '400px'}}>I understood what the speaker was saying...</Typography>}
                                  />
        <RadioGroup name="understood"
                    sx={{ marginRight: '92px', color: '#8B8B8B'}}>
          <MyFormControlLabel sx={{height: '20px'}} id="UnderstoodAll" value="all the time" label="all the time" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="UnderstoodMost" value="most of the time" label="most of the time" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="UnderstoodSome" value="some of the time" label="some of the time" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="UnderstoodLittle" value="very little" label="very little" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel sx={{height: '20px'}} id="UnderstoodNotAtAll" value="not at all" label="not at all" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
        </RadioGroup>
        </Grid>
        <br/>
        <Grid container
        direction='row'
        justifyContent="space-between">
        <FormControlLabel control={<Checkbox 
                                    id='useFeedbackmeasured'
                                    name='useFeedbackmeasured'
                                    onClick={this.onCheck}
                                    checked={store.get('useFeedbackmeasured')}
                                    />}
                                  label={<Typography style={{fontSize: '20px', maxWidth: '400px'}}>Can you guess what the chunking task measured?</Typography>}
                                  />
        <TextField 
        name="Feedbackmeasured" 
        id="Feedbackmeasured" 
        size="small" 
        sx={{ width:'200px', marginRight: '90px'}}
        label="Text input" 
        variant="outlined"
        type='text'
        inputProps={{style: {fontSize: '20px'}}}
        />
        </Grid>
        <br/>
        <Grid container
        direction='row'
        justifyContent="space-between">
        <FormControlLabel control={<Checkbox 
                                    id='useFeedbackstrategy'
                                    name='useFeedbackstrategy'
                                    onClick={this.onCheck}
                                    checked={store.get('useFeedbackstrategy')}
                                    />}
                                  label={<Typography style={{fontSize: '20px', maxWidth: '400px'}}>Did you consciously adopt some strategy in marking boundaries between chunks, if any?</Typography>}
                                  />
        <TextField 
        name="Feedbackstrategy" 
        id="Feedbackstrategy" 
        size="small" 
        sx={{ width:'200px', marginRight: '90px'}}
        label="Text input" 
        variant="outlined"
        type='text'
        inputProps={{style: {fontSize: '20px'}}}
        />
        </Grid>
        <br/>
        <Grid container
        direction='row'
        justifyContent="space-between">
        <FormControlLabel control={<Checkbox 
                                    id='useFeedbackimpression'
                                    name='useFeedbackimpression'
                                    onClick={this.onCheck}
                                    checked={store.get('useFeedbackimpression')}
                                    />}
                                  label={<Typography style={{fontSize: '20px', maxWidth: '400px'}}>Did you have an impression that the task gradually became easier?</Typography>}
                                  />
        <TextField 
        name="Feedbackimpression" 
        id="Feedbackimpression" 
        size="small" 
        sx={{ width:'200px', marginRight: '90px'}}
        label="Text input" 
        variant="outlined"
        type='text'
        inputProps={{style: {fontSize: '20px'}}}
        />
        </Grid>
        <br/>
        <Grid container
        direction='row'
        justifyContent="space-between">
        <FormControlLabel control={<Checkbox 
                                    id='useFeedbackcomments'
                                    name='useFeedbackcomments'
                                    onClick={this.onCheck}
                                    checked={store.get('useFeedbackcomments')}
                                    />}
                                  label={<Typography style={{fontSize: '20px', maxWidth: '400px'}}>Do you have other comments?</Typography>}
                                  />
        <TextField 
        name="Feedbackcomments" 
        id="Feedbackcomments" 
        size="small" 
        sx={{ width:'200px', marginRight: '90px'}}
        label="Text input" 
        variant="outlined"
        type='text'
        inputProps={{style: {fontSize: '20px'}}}
        />
        </Grid>
        <br/>
        {/* <Grid container
        direction='row'
        justifyContent="space-between">
        <FormControlLabel control={<Checkbox 
                                    id='useFeedbackcomments'
                                    name='useFeedbackcomments'
                                    onClick={this.onCheck}
                                    checked={store.get('useFeedbackcomments')}
                                    />}
                                  label={<Typography style={{fontSize: '20px', maxWidth: '700px'}}>Your comments on the task and the app as well as possible suggestions for further development of the task/app are very much welcome. Thank you!</Typography>}
                                  />
      </Grid> */}
      {this.state.additional_quesion_list.map((item, index) => {
        let type = item.question_type == 'bool' ? 'Yes/No' : 'text'
          return (
            <Grid container
            direction='row'
            justifyContent="space-between">
            <FormControlLabel control={<Checkbox 
                                        id={`useFeedbackNew${item.question_type}_Qestion${index}`} 
                                        name={`useFeedbackNew_${item.question_type}_Qestion${index}`}
                                        onClick={this.onCheck}
                                        checked={store.get(`useFeedbackNew${item.question_type}_Qestion${index}`)}
                                        defaultChecked={item.isChecked} 
                                        />}
                                      label={<Typography style={{fontSize: '20px'}}>{`Use a new ${type} question:`}</Typography>}
                                      />
                <TextField 
                id={`FeedbackNew${item.question_type}_Qestion${index}`} 
                name={`FeedbackNew_${item.question_type}_Qestion${index}`} 
                value={store.get(`FeedbackNew_${item.question_type}_Qestion${item.id}`)}
                size="small" 
                sx={{ width:'700px', marginRight: '90px'}}
                label={`Insert text of the ${type} question`}
                variant="outlined"
                type='text'
                onChange={this.onChange}
                inputProps={{style: {fontSize: '20px'}}}
                />
                <br/>
              </Grid>
          )
        })}
      <Stack
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={'10px'}>
      <CustomButton  size='small' id='addButtonFeedback' onClick={() => this.addQuestion('bool')} text='Add a Yes/No question' theme='green'/> 

      <CustomButton  size='small' id='addButtonFeedback' onClick={() => this.addQuestion('text')} text='Add a text question' theme='green'/>
      </Stack>
        </div>
    
      </>
    )
    }
}