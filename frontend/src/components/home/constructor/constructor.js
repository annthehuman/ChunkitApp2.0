import React, { Component } from 'react';
import styled from 'styled-components';
import Inputs from './inputs'
import Background from './constructor-background';
import Practice from './constructor-practice';
import Experiment from './constructor-experiment';
import Feedback from './constructor-feedback';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import { Box } from '@mui/system';
import TabContext from '@mui/lab/TabContext';
import CustomHeader from '../../../common_components/header';
import CustomButton from '../../../common_components/button';
import { Grid, Stack, Popover, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { withStyles } from '@mui/styles';
import EditorPage from './constructor-editor';
import CustomBox from '../../../common_components/box';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Tooltip } from '@mui/material';

const ConstructorBlock = styled.div`
    @media (max-width: 1200px) {
        max-width: 80%;
    }
    @media (max-width: 1300px) {
        max-width: 70%;
    }
    margin: 30px auto;
    max-width: 50%;
`

const CustomTab = withStyles({
    root: {
      textTransform: "none",
      fontSize: '24px'
    }
  })(Tab);

export default class Constructor extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            controlSumm: new Set(['nameExperement',
            'nameExperementForParticipants']),
            activeTab: '1',
            submitButton: '',
            experementName: null,
            practiceTable: '',
            equal: false,
            disabled: true,
            difference: new Set(),
            spelling: {'nameExperement': 'name of experiment',
            'nameExperementForParticipants': 'name of experiment for participants', 'sessionTime': 'duration',
            'helloEditor': 'hello editor','outlineEditor': 'outline editor','consentEditor': 'consent editor',
            'backgroundExample': 'background questions','feedbackExample': 'feedback questions','goodbyeEditor': 'goodbye editor',
            'uploadPracticeAudio': 'audios for practice','uploadPracticeTranscripts': 'transcripts for practice',
            'practiceInstructions': 'instructions for practice','uploadExperimentAudio': 'audios for main task',
            'uploadExperimentTranscripts': 'transcripts for main task','experimentInstructions':'instructions for main task'}
        }
        this.toggleBack = this.toggleBack.bind(this);
        this.toggleNext = this.toggleNext.bind(this);
        this.toggle = this.toggle.bind(this);
        this.appendForm = this.appendForm.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.getCookie = this.getCookie.bind(this)
        this.getButton = this.getButton.bind(this)
        this.loadTest = this.loadTest.bind(this)
        this.allInputsAReHere = this.allInputsAReHere.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }
    allInputsAReHere() {
        let controlSumm = new Set(['nameExperement',
        'nameExperementForParticipants', 'sessionTime'])
        let store = require('store');
        const pagesNeeded = store.get('pagesNeeded')
        if (pagesNeeded) {
        if (pagesNeeded.indexOf('Hello') != -1) {
            controlSumm.add('helloEditor')
        }
        if (pagesNeeded.indexOf('Outline') != -1) {
            controlSumm.add('outlineEditor')
        }
        if (pagesNeeded.indexOf('Consent') != -1) {
            controlSumm.add('consentEditor')
        }
        if (pagesNeeded.indexOf('Background') != -1) {
            controlSumm.add('backgroundExample')
        }
        if (pagesNeeded.indexOf('Feedback') != -1) {
            controlSumm.add('feedbackExample')
        }
        if (pagesNeeded.indexOf('Goodbye') != -1) {
            controlSumm.add('goodbyeEditor')
        }
        if (pagesNeeded.indexOf('Practice') != -1) {
            controlSumm.add('uploadPracticeAudio')
            controlSumm.add('uploadPracticeTranscripts')
            controlSumm.add('practiceInstructions')
        }
        if (pagesNeeded.indexOf('Experiment') != -1) {
            controlSumm.add('uploadExperimentAudio')
            controlSumm.add('uploadExperimentTranscripts')
            controlSumm.add('experimentInstructions')
        }} else {
            controlSumm.add('helloEditor')
            controlSumm.add('outlineEditor')
            controlSumm.add('consentEditor')
            controlSumm.add('backgroundExample')
            controlSumm.add('feedbackExample')
            controlSumm.add('goodbyeEditor')
            controlSumm.add('uploadPracticeAudio')
            controlSumm.add('uploadPracticeTranscripts')
            controlSumm.add('practiceInstructions')
            controlSumm.add('uploadExperimentAudio')
            controlSumm.add('uploadExperimentTranscripts')
            controlSumm.add('experimentInstructions')
        }

    const form = document.getElementById('constructorForm')
    
    const formData = new FormData(form)
    this.setState({controlSumm, controlSumm})
    let formSum = new Set()

    formData.forEach((item, name) => {
        if (item && item != 'false' && item != '<p></p>' && !name.includes('pageNeeded')) {
        if (name.includes('Background')) {
            formSum.add('backgroundExample')
        } else if (name.includes('Feedback')) {
            formSum.add('feedbackExample')
        } else if (name.includes('upload')) {
            if (item.name) {
                formSum.add(name)
            }
        } else {
            formSum.add(name)
        }}
    })

    if (store.get('uploadExperimentTranscriptsData') && store.get('audiosExperement')){
    if (store.get('uploadExperimentTranscriptsData').length > 0 && store.get('audiosExperement').length > 0) {
        formSum.add('uploadExperimentAudio')
        formSum.add('uploadExperimentTranscripts')
    }}
    if (store.get('uploadPracticeTranscriptsData') && store.get('audiosPractice')){
    if (store.get('uploadPracticeTranscriptsData').length > 0 && store.get('audiosPractice').length > 0) {
        formSum.add('uploadPracticeAudio')
        formSum.add('uploadPracticeTranscripts')
    }}
    let difference = new Set(
        [...controlSumm].filter(x => !formSum.has(x)));
    this.setState({difference: difference})

    if (difference.size == 0) { 
        this.setState({equal: true, disabled: false})
    } else {
        this.setState({equal: false, disabled: true})
    }
    }
    toggle (event, tab) {
        let store = require('store')
        if(this.state.activeTab !== tab) {
            this.setState({ activeTab: tab })
            store.set('tab', tab)
          }
      }
  
    toggleBack () {
      let store = require('store')
      this.setState({ activeTab: String(+this.state.activeTab - 1 )})
      store.set('tab', String(+this.state.activeTab - 1))
    }
    toggleNext () {
        let store = require('store')
        this.setState({ activeTab: String(+this.state.activeTab + 1 )})
        store.set('tab', String(+this.state.activeTab + 1))
      }
    appendForm(...values){
        const f = document.getElementById('constructorForm')
        let child_name_array = []
        f.childNodes.forEach(child => {
            child_name_array.push(child.name)
            })
        const we_have_name = child_name_array.some(item => item == values[0]);
        // TODO: добавить обработку файлов
        if (values[2] != 'file') {
            if (we_have_name){
                const the_name = child_name_array.filter(item => item == values[0]),
                        the_element = f.querySelector(`input[name="${the_name}"]`);
                the_element.setAttribute('value', values[1]);
            } else {
                const i = document.createElement("input");
                i.setAttribute('name', values[0]);
                i.setAttribute('id', values[0]);
                i.setAttribute('hidden', true);
                i.setAttribute('value', values[1]);
                f.append(i);
            }
        } else {
            if (we_have_name){
                const the_name = child_name_array.filter(item => item == values[0]),
                      the_element = f.querySelector(`input[name="${the_name}"]`);
                f.removeChild(the_element)
                f.append(values[1]);
                let formData = new FormData(f);
            } else {
                f.append(values[1]);
                let formData = new FormData(f);
                }
        }
        this.allInputsAReHere()

    }
    componentDidMount() {
        this.allInputsAReHere()
        let store = require('store')
        if (store.get('tab'))
        this.setState({ activeTab: store.get('tab') })
        if(store.get('sessionTime')) 
        {this.appendForm('sessionTime', store.get('sessionTime'))}
        if(store.get('nameExperement') && store.get('nameExperement').length > 0) 
        {this.appendForm('nameExperement', store.get('nameExperement'))}
        if(store.get('nameExperementForParticipants') && store.get('nameExperementForParticipants').length > 0) 
        {this.appendForm('nameExperementForParticipants', store.get('nameExperementForParticipants'))}
        if (store.get('pagesNeeded')) {
        store.get('pagesNeeded').length > 0 ? this.setState({accordionExpanded: true}) : null
        store.get('pagesNeeded').forEach(item => {
            document.getElementById(`pageNeeded_${item}`).checked = true
            store.set(`pageNeeded_${item}`, true)
        })
        }
          if (store.get('UseQuestions')){
            document.getElementById('UseQuestions').checked = store.get('UseQuestions')}
        store.each((value, key) => {
            if (key.indexOf('Background') != -1 || key.indexOf('Feedback') != -1
                || key.indexOf('Editor') != -1 || key.indexOf('goodbyeEditor') != -1 || key.indexOf('Instructions') != -1 
                || key.indexOf('Prolific') != -1 || key.indexOf('shuffleExtracts') != -1
                || key.indexOf('shuffleExtractsPractice') != -1 || key.indexOf('pagesNeeded') != -1 
                || key.indexOf('background') != -1 || key.indexOf('feedback') != -1
                || key.indexOf('Questions') != -1){
            if (Boolean(value)){
                if (key.indexOf('backgroundEx') != -1 || key.indexOf('feedbackEx') != -1) {
                    Object.keys(value).map((item) => {this.appendForm(item, true), store.set(item, true)})}
                else if (key.indexOf('backgroundAdd') != -1 || key.indexOf('feedbackAdd') != -1) {
                    Object.keys(value).map((item) => {this.appendForm(item, value[item]), store.set(item, value[item])})}
                else {this.appendForm(key, value)}
}}
        })
          
    }
    getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    getButton(e){
        this.setState({submitButton: e.target.name})
        if (e.target.name == "SaveDraft" || e.target.name == "SaveFinalVersion") {
            e.target.innerHTML = 'Saved!'
            setTimeout(() => {e.target.innerHTML = e.target.name == "SaveDraft" ? 'Save Draft': 'Save Final Version'}, 1000)
        }
    }

    loadTest() {
        const name = document.getElementById('nameExperement').value
        this.setState({experementName: name})
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.submitButton == 'SaveDraft'){
            const form = e.target
            const formData = new FormData(form);
         
            const csrf = this.getCookie('csrftoken');
            const files = form.querySelectorAll(`input[type='file']`);
            const usertoken = this.getCookie('access_token');
            files.forEach(item => {
                formData.append("file", item.files[0]);
            })
            formData.append("csrfmiddlewaretoken", csrf);

            formData.append("accessToken", usertoken);
            fetch('/save_draft/', {
            method: "POST",

            body: formData
            }).then(data => {
            if (!data.ok){
                throw Error(data.status);
            } else {
                this.setState({open: true})
            }
            }).catch((data) => {
            console.log(`Try again! Error: ${Error(data.status)}`)
            })
        } else if (this.state.submitButton == 'TestRun') {
            const form = e.target
            const formData = new FormData(form);

            const csrf = this.getCookie('csrftoken');
            formData.append("csrfmiddlewaretoken", csrf);
            const usertoken = this.getCookie('access_token');
            formData.append("accessToken", usertoken);

            fetch('/save_draft/', {
            method: "POST",
            body: formData
            }).then(data => {
            if (!data.ok){
                throw Error(data.status);
            } else {
                const name = document.getElementById('nameExperementForParticipants').value
                fetch('/load_draft_to_test/'+ new URLSearchParams({
                    'name': name}), {
                    method: "GET",
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'
                  }
                  }).then(response => {
                    const result = response.json() 
                    const status_code = response.status;
                    if(status_code != 200) {
                      console.log('Error in getting brand info!')
                      return false;
                  }
                    return result
                }).then(result => {
                    let store = require('store')
                    Object.entries(result).forEach(([key, value]) => {
                        store.set(key, value);
                      })
                      if (formData) {
                        this.props.history.push("test")}
                }).catch(error => {
                  console.log(error)
                  })
                
            }
            }).catch((data) => {
            console.log(`Try again! Error: ${Error(data.status)}`)
            }).finally(() => {
            form.reset();
            });
        } else if (this.state.submitButton == 'SaveFinalVersion'){
            const form = e.target
            const formData = new FormData(form);
            const csrf = this.getCookie('csrftoken');
            let name = formData.get('nameExperementForParticipants')
            const prolific = Boolean(formData.get('UseProlific'))
            const usertoken = this.getCookie('access_token');
            formData.append("accessToken", usertoken);
            formData.append("csrfmiddlewaretoken", csrf);
            name.includes(" ") ? name = name.replace(' ', "_"): null
            if (prolific){ 
            formData.append('link', `experiment/${name}?PROLIFIC_PID=test`)}
            else {
            formData.append('link', `experiment/${name}`)}
            fetch('/save_draft/', {
            method: "POST",
            body: formData
            }).then(data => {
            if (!data.ok){
                throw Error(data.status);
            }
                }).catch(error => {
                  console.log(error)
            }).catch((data) => {
            console.log(`Try again! Error: ${Error(data.status)}`)
            })
        }
    }

    handleClose(){
        this.setState({open: false})
    }
    

    render () {
        let store = require('store');
        return(
            <>
            <Box mt={2} sx={{margin: '30px auto 15px auto',
                             width: '80%',
                             display: 'flex',
                             justifyContent: 'space-between', 
                             flexWrap: 'wrap'}}>
            <Grid container
                  direction='row'
                  justifyContent="space-between"
                  >
                
                <CustomHeader theme='small' text='ChunkitApp 2.0'/>
                <Grid 
                    item
                    >
                    <Link to='/'>
                    <CustomButton theme='white' text='Home' size='small'/>
                    </Link>
                    <Link to='/'>
                    <CustomButton 
                        onClick={() => {document.cookie = 'access_token' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                        this.setState({autorized: false}); this.props.history.push("/"); window.location.reload()}} 
                        text='Log out' 
                        theme='black'
                        size='small'/>
                    </Link>
                </Grid>
            </Grid>
            </Box>
            <TabContext value={this.state.activeTab}>
            <Box mt={2} sx={{display: 'flex',justifyContent: 'center', flexWrap: 'wrap'}}>
            <TabList 
                onChange={this.toggle}    
                variant="scrollable"
                scrollButtons="auto"
                >
                <CustomTab label="Basics" value="1" />
                <CustomTab label="Hello" value="2"  />
                <CustomTab label="Consent" value="3" />
                <CustomTab label="Outline" value="4" />
                <CustomTab label="Background" value="5"  />
                <CustomTab label="Practice" value="6" />
                <CustomTab label="Main task" value="7" />
                <CustomTab label="Feedback" value="8"  />
                <CustomTab label="Goodbye" value="9" />
            </TabList>
            </Box>
            <CustomBox> 
            <TabPanel value="1">
                <Inputs appendForm={this.appendForm} allInputsAReHere={this.allInputsAReHere} toggle = {this.toggle} active={this.state.activeTab} />
            </TabPanel>
            <TabPanel value="2">
                <EditorPage editorName='hello' header='Hello page' label='A text that will greet your participants.'
                        textSample='Please make sure that you have plugged in your headphones/earphones. It is vital that you complete the experiment while wearing them.'
                        appendForm={this.appendForm}  toggle={this.toggle} active={this.state.activeTab} />
            </TabPanel>
            <TabPanel value="3">
                <EditorPage editorName='consent' header='Informed consent page' label='Inset the text of your informed consent form here.'
                        textSample='<p>This experimental session is part of the research project carried out at <strong>[insert your university name]</strong>.
                        By agreeing, you certify your willingness to participate in the study and give us your consent to use the responses for research purposes (preprocessing, analysis, publication, archiving, and sharing).
                        All your responses will be recorded automatically. Your participation in the study will be completely anonymous.
                        </p>
                        <p>The duration of the experiment is approximately <strong>[insert amount of minutes]</strong> minutes with a possibility to take short breaks (2-3 minutes).
                        However, please make sure to complete the experiment within <strong>[insert amount of time]</strong>.</p>
                        <p> If you exceed this time limit, you will not be compensated.</p>
                        <p>Please make sure that you are closely following task instructions. If you are not, unfortunately, we will not be able to compensate for your time.</p>'
                        appendForm={this.appendForm}  toggle={this.toggle} active={this.state.activeTab} />
            </TabPanel>
            <TabPanel value="4">
                    <EditorPage editorName='outline' header='Session outline page' label='Insert the text explaining how your experiment is supposed to go.'
                        textSample='<div>This experiment session consists of several tasks listed below. It is essential that you complete each of them. Once you finish one task, you will be automatically guided to the next one. The approximate duration of each task is mentioned in parentheses. The main task takes the longest. We recommend that during this task you take a short break.</div>
                        <ul>
                          <li>Background questionnaire (~ <strong>[insert duration here]</strong> min.)</li>
                          <li>Main task (~ <strong>[insert duration here]</strong> min. plus breaks)</li>
                          <li>Feedback questionnaire (~ <strong>[insert duration here]</strong> min.)</li>
                        </ul>
                        <div>We kindly remind you to plug in your headphones.</div>'
                        appendForm={this.appendForm}  toggle = {this.toggle} active={this.state.activeTab} />
            </TabPanel>
            <TabPanel value="5">
                <Background appendForm={this.appendForm} allInputsAReHere={this.allInputsAReHere} toggle = {this.toggle} active={this.state.activeTab} />
            </TabPanel>
            <TabPanel value="6">
                <Practice appendForm={this.appendForm} allInputsAReHere={this.allInputsAReHere} toggle = {this.toggle} active={this.state.activeTab} />
            </TabPanel>
            <TabPanel value="7">
                <Experiment appendForm={this.appendForm} allInputsAReHere={this.allInputsAReHere} toggle = {this.toggle} active={this.state.activeTab} />
            </TabPanel>
            <TabPanel value="8">
                <Feedback appendForm={this.appendForm} allInputsAReHere={this.allInputsAReHere} toggle = {this.toggle} active={this.state.activeTab} />
            </TabPanel>
            <TabPanel value="9">
                <EditorPage editorName='goodbye' header='Goodbye' label='Fill in and format your goodbye message here.'
                        textSample=''
                        appendForm={this.appendForm}  toggle = {this.toggle} active={this.state.activeTab} />
            </TabPanel>
            
        <br/>
        
        <form encType="multipart/form-data" method="post" name="fileinfo" onSubmit={this.onSubmit} onChange={() =>this.onChange} id='constructorForm'> 
        <Stack
            direction='row'
            justifyContent="space-between">
        <Grid
            container
            direction='row'
            style={{ gap: '3px', padding: '0 0 24px 24px' }}>
        <CustomButton id='saved-popover' size='small' type='submit' onClick={this.getButton} name='SaveDraft' theme='blue' text='Save Draft'/>
        <CustomButton size='small' type='submit' onClick={this.getButton} name='TestRun' theme='blue' 
                      title={store.get('nameExperementForParticipants') ? 'Test Run':'You need to add a name of expriment for participants'}
                      text='Test Run'/>
        <Tooltip 
            style={{whiteSpace: 'pre-line'}}
            title={!this.state.equal ?
                `You need to add: ${[...this.state.difference].map(item => this.state.spelling[item]).join(', ')}`:
                'Save Final Version'}>
        <span>
        <CustomButton size='small' type='submit' onClick={this.getButton} disabled={this.state.disabled} id='SaveFinalVersion' name='SaveFinalVersion' theme='blue' 
                      text='Save Final Version'/>
        </span>
        </Tooltip>
        </Grid>
        <Grid
            container
            direction='row'
            style={{gap: '3px', padding: '0 24px 24px 0' }}
            justifyContent="flex-end">
        {this.state.activeTab != '1' ? <CustomButton size='small' type='button' name='Back' onClick={this.toggleBack} theme='white' text='Back' startIcon={<ArrowBackIosIcon />} style={{border: '1px solid #6083FF'}}/> : null}
        {this.state.activeTab != '9' ?<CustomButton size='small' type='button' name='Next' onClick={this.toggleNext} theme='blue' text='Next' endIcon={<ArrowForwardIosIcon />}/> : null}
        </Grid>
        </Stack>
        </form>         
        </CustomBox>
        </TabContext>
            </>
        )

        }
}