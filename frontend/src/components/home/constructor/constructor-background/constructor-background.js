import React, {Component} from 'react';
import styled from 'styled-components';
import {  Input, FormGroup, Label, Form, Button, Row, Col, CustomInput } from 'reactstrap';
import { render } from 'react-dom';
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
import { SortGridMenuItems } from '@mui/x-data-grid';

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
      if (backgroundExample[key][0] == 'true') {
        if (key.indexOf('New') != -1){
          console.log('New', key)
          const question_type = key.split('_')[1],
                  id = +key.split('_').at(-1).at(-1),
                  isChecked = true;
          item.push({ question_type, id, isChecked})
        }
        store.set(key, true)
      }
      // console.log('backgroundExample key','addedQuestionsBackground', item, backgroundExample[key]);
    });
    
    store.set('addedQuestionsBackground', item)
    }
    console.log('backgroundAddQ', backgroundAddQ)
    if (backgroundAddQ) {
      Object.keys(backgroundAddQ).forEach((key) => {
        store.set(key, backgroundAddQ[key][0])
        // console.log('background added q', key,backgroundAddQ[key] ,backgroundAddQ[key][0])
      })
    }
    checks.forEach(check => {
      if (store.get(check.name)) {
        // console.log((store.get(check.name)))
        check.checked = store.get(check.name)
      }
    })
    if (store.get('addedQuestionsBackground') && store.get('addedQuestionsBackground').length > 0) {
      this.setState({additional_quesion_list: store.get('addedQuestionsBackground'),
      additional_quesion_id: +store.get('addedQuestionsBackground')[store.get('addedQuestionsBackground').length-1].id})
    }
    // if (store.get('backgroundAddQ')) {
    //   this.setState({additional_quesion_list: store.get('backgroundAddQ'),
    //   additional_quesion_id: +store.get('backgroundAddQ')[store.get('backgroundAddQ').length-1].id}, 
    //   () => {
    //     console.log('added from store', store.get('backgroundAddQ'), this.state.additional_quesion_id, this.state.additional_quesion_list)
    //   })
    // }
  }
  onCheck(e){
    let store = require('store');
    store.set(e.target.name, e.target.checked)
    console.log(e.target.name, e.target.checked)
    // const papa = document.getElementById('background'),
    //       checks = papa.querySelectorAll('input[type="checkbox"]'),
    //       feedback_info = {};
    // console.log('checks', checks)
    // checks.forEach(check => {
    //   feedback_info[check.name] = check.checked
    //   if (check.checked) {
    //     store.set(check.name, check.checked)
    //   }
    //   })
    this.props.appendForm(e.target.name, e.target.checked)
    // this.props.appendForm('backgroundExample', JSON.stringify(feedback_info))
  }
  onChange(e) {
    let store = require('store');
    const qName = e.target.name
    console.log('target'+e.target.name)
    store.set(qName, e.target.value)
    this.props.appendForm(qName, e.target.value)
    let addedQ = store.get('backgroundAddQ')
    addedQ[qName] = [e.target.value]
    store.set('backgroundAddQ', addedQ)
  }
  addQuestion(type){
    let store = require('store'),
        id = this.state.additional_quesion_id+1;
    // console.log(this.state.additional_quesion_id)
    const item = this.state.additional_quesion_list,
          question_type = type,
          isChecked = true;
    item.push({ question_type, id, isChecked})
    store.set('addedQuestionsBackground', item)
    store.set(`useBackgroundNew_${question_type}_Qestion${id}`, true)
    this.props.appendForm(`useBackgroundNew_${question_type}_Qestion${id}`, true)
    // this.props.appendForm('addedQuestionsBackground', item)
    this.setState({additional_quesion_list: item,
                    additional_quesion_id: id})
    // console.log(this.state.additional_quesion_list)
  }
  render () {
    let store = require('store');
    return(
      <>
        <CustomHeader text='Background questions'/>
        <Typography sx={{fontSize: '20px', marginTop: '10px', marginBottom: '10px'}}>Please mark the questions that will be on the questionnaire or add your own.</Typography> 
        <div id='background'>
        <Grid container
        direction='row'
        justifyContent="space-between">
        <FormControlLabel control={<Checkbox 
                                    id='useBackgroundAge'
                                    name='useBackgroundAge'
                                    onClick={this.onCheck}
                                    checked={store.get('useBackgroundAge')}
                                    />}
                                  label={<Typography style={{fontSize: '20px'}}>Age</Typography>}
                                  />
        <TextField 
        name="BackgroundAge" 
        id="BackgroundAge" 
        size="small" 
        sx={{ width:'200px', marginRight: '90px'}}
        label="Text input" 
        variant="outlined"
        type='text'
        inputProps={{style: {fontSize: '20px'}}}
        />
        </Grid>
        <Grid container
        direction='row'
        justifyContent="space-between">
        <FormControlLabel control={<Checkbox 
                                    id='useBackgroundGender'
                                    name='useBackgroundGender'
                                    onClick={this.onCheck}
                                    checked={store.get('useBackgroundGender')}
                                    />}
                                  label={<Typography style={{fontSize: '20px'}}>Gender</Typography>}
                                  />
        <Box>
        <FormControl fullWidth>
          <InputLabel sx={{ padding: '0 2px 50px 2px'}} id="demo-simple-select-label">Choice</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label='Choice'
            defaultValue = ""
            style={{height:'45.75px', width:'200px', marginRight: '90px'}}
          >
            <MenuItem value={'-----'}>-----</MenuItem>
            <MenuItem value={'Male'}>Male</MenuItem>
            <MenuItem value={'Female'}>Female</MenuItem>
            <MenuItem value={'Other'}>Other</MenuItem>
          </Select>
        </FormControl>
        </Box>
        </Grid>
        <Grid container
        direction='row'
        justifyContent="space-between">
        <FormControlLabel control={<Checkbox 
                                    id='useBackgroundLevelEducation'
                                    name='useBackgroundLevelEducation'
                                    onClick={this.onCheck}
                                    checked={store.get('useBackgroundLevelEducation')}
                                    />}
                                  label={<Typography style={{fontSize: '20px'}}>Level of education</Typography>}
                                  />
        <Box>
        <FormControl fullWidth>
          <InputLabel sx={{ padding: '0 2px 50px 2px'}} id="demo-simple-select-label">Choice</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Choice"
            defaultValue = ""
            style={{height:'45.75px', width:'200px', marginRight: '90px'}}
          >
            <MenuItem value={'-----'}>-----</MenuItem>
            <MenuItem value={'Primary school'}>Primary school</MenuItem>
            <MenuItem value={'Lower secondary school'}>Lower secondary school</MenuItem>
            <MenuItem value={'Upper secondary school, upper secondary school graduate, or vocational education graduate'}>Upper secondary school, upper secondary school graduate, or vocational education graduate</MenuItem>
            <MenuItem value={'Polytechnic degree'}>Polytechnic degree</MenuItem>
            <MenuItem value={'University degree: BA or equivalent'}>University degree: BA or equivalent</MenuItem>
            <MenuItem value={'University degree: MA or equivalent'}>University degree: MA or equivalent</MenuItem>
            <MenuItem value={'University degree: Ph.D. or equivalent'}>University degree: Ph.D. or equivalent</MenuItem>
          </Select>
        </FormControl>
        </Box>
        </Grid>
        <Grid container
        direction='row'
        justifyContent="space-between">
        <FormControlLabel control={<Checkbox 
                                    id='useBackgroundAcadmicField'
                                    name='useBackgroundAcadmicField'
                                    onClick={this.onCheck}
                                    checked={store.get('useBackgroundAcadmicField')}
                                    />}
                                  label={<Typography style={{fontSize: '20px'}}>Academic field</Typography>}
                                  />
        <TextField 
        name="BackgroundAcadmicField" 
        id="BackgroundAcadmicField" 
        size="small" 
        sx={{ width:'200px', marginRight: '90px'}}
        label="Text input" 
        variant="outlined"
        type='text'
        inputProps={{style: {fontSize: '20px'}}}
        />
        </Grid>
        <Grid container
        direction='row'
        justifyContent="space-between">
        <FormControlLabel control={<Checkbox 
                                    id='useBackgroundNativeLanguage'
                                    name='useBackgroundNativeLanguage'
                                    onClick={this.onCheck}
                                    checked={store.get('useBackgroundNativeLanguage')}
                                    />}
                                  label={<Typography style={{fontSize: '20px'}}>Native language</Typography>}
                                  />
        <TextField 
        name="BackgroundNativeLanguage" 
        id="BackgroundNativeLanguage" 
        size="small" 
        sx={{ width:'200px', marginRight: '90px'}}
        label="Text input" 
        variant="outlined"
        type='text'
        inputProps={{style: {fontSize: '20px'}}}
        />
        </Grid>
        <Grid container
        direction='row'
        justifyContent="space-between">
        <FormControlLabel control={<Checkbox 
                                    id='useBackgroundOtherLanguage'
                                    name='useBackgroundOtherLanguage'
                                    onClick={this.onCheck}
                                    checked={store.get('useBackgroundOtherLanguage')}
                                    />}
                                  label={<Typography style={{fontSize: '20px'}}>Other languages</Typography>}
                                  />
        <TextField 
        name="BackgroundOtherLanguage" 
        id="BackgroundOtherLanguage" 
        size="small" 
        sx={{ width:'200px', marginRight: '90px'}}
        label="Text input" 
        variant="outlined"
        type='text'
        inputProps={{style: {fontSize: '20px'}}}
        />
        </Grid>
        <Grid container
        direction='row'
        justifyContent="space-between">
        <FormControlLabel control={<Checkbox 
                                    id='useBackgroundDyslexsia'
                                    name='useBackgroundDyslexsia'
                                    onClick={this.onCheck}
                                    checked={store.get('useBackgroundDyslexsia')}
                                    />}
                                  label={<Typography style={{fontSize: '20px'}}>Have you been diagnosed with dyslexia</Typography>}
                                  />
        <RadioGroup name="Dyslexsia" row
                    sx={{ width:'200px', marginRight: '90px', color: '#8B8B8B'}}>
          <MyFormControlLabel id="dyslexsia_yes" value="Yes" label="Yes" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel id="dyslexsia_no" value="No" label="No" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
        </RadioGroup>
        </Grid>
        <Grid container
        direction='row'
        justifyContent="space-between">
        <FormControlLabel control={<Checkbox 
                                    id='useBackgroundHearingDiff'
                                    name='useBackgroundHearingDiff'
                                    onClick={this.onCheck}
                                    checked={store.get('useBackgroundHearingDiff')}
                                    />}
                                  label={<Typography style={{fontSize: '20px'}}>Do you have any hearing difficulties</Typography>}
                                  />
        <RadioGroup name="HearingDiff" row
                    sx={{ width:'200px', marginRight: '90px', color: '#8B8B8B'}}>
          <MyFormControlLabel id="hearing_yes" value="Yes" label="Yes" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel id="hearing_no" value="No" label="No" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
        </RadioGroup>
        </Grid>
        <Grid container
        direction='row'
        justifyContent="space-between">
        <FormControlLabel control={<Checkbox 
                                    id='useBackgroundWhisper'
                                    name='useBackgroundWhisper'
                                    onClick={this.onCheck}
                                    checked={store.get('useBackgroundWhisper')}
                                    />}
                                  label={<Typography style={{fontSize: '20px', maxWidth: '300px'}}>Do you have dificulty hearing someone speaks in a wisper</Typography>}
                                  />
        <RadioGroup name="Whisper" row
                    sx={{ width:'200px', marginRight: '90px', color: '#8B8B8B'}}>
          <MyFormControlLabel id="whisper_yes" value="Yes" label="Yes" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
          <MyFormControlLabel id="whisper_no" value="No" label="No" control={<Radio icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                                                          checkedIcon={<CheckBoxOutlinedIcon />}/>} />
        </RadioGroup>
        </Grid>
        <Grid container
        direction='row'
        justifyContent="space-between">
        <FormControlLabel control={<Checkbox 
                                    id='useBackgroundComments'
                                    name='useBackgroundComments'
                                    onClick={this.onCheck}
                                    checked={store.get('useBackgroundComments')}
                                    />}
                                  label={<Typography style={{fontSize: '20px'}}>Comments</Typography>}
                                  />
        <TextField 
        name="backgroundComments" 
        id="backgroundComments" 
        size="small" 
        sx={{ width:'200px', marginRight: '90px'}}
        label="Text input" 
        variant="outlined"
        type='text'
        inputProps={{style: {fontSize: '20px'}}}
        />
        </Grid>
        <div id='addedQBack'>
        {this.state.additional_quesion_list.map((item, index) => {
              console.log(`BackgroundNew_${item.question_type}_Qestion${item.id}`, store.get(`BackgroundNew_${item.question_type}_Qestion${item.id}`))
          let type = item.question_type == 'bool' ? 'Yes/No' : 'text'
          return (
        <Grid container
        direction='row'
        justifyContent="space-between">
        <FormControlLabel control={<Checkbox 
                                    id={`useBackgroundNew_${item.question_type}_Qestion${index}`} 
                                    name={`useBackgroundNew_${item.question_type}_Qestion${index}`}
                                    onClick={this.onCheck}
                                    checked={store.get(`useBackgroundNew_${item.question_type}_Qestion${index}`)}
                                    defaultChecked={item.isChecked} 
                                    />}
                                  label={<Typography style={{fontSize: '20px'}}>{`Use new ${type} question:`}</Typography>}
                                  />
            <TextField 
            id={`BackgroundNew_${item.question_type}_Qestion${index}`} 
            name={`BackgroundNew_${item.question_type}_Qestion${index}`} 
            value={store.get(`BackgroundNew_${item.question_type}_Qestion${item.id}`)}
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

        <CustomButton size='small' id='addButtonBackground' onClick={() => this.addQuestion('bool')} text='Add a Yes/No question' theme='green'/>
        <br/>
        <br/>
        <CustomButton size='small' id='addButtonBackground' onClick={() => this.addQuestion('text')} text='Add text Question' theme='green'/>
        </div>
      </div>
      </>
  )
  }
}