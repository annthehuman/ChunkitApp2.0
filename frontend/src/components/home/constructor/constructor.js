import React, { Component } from 'react';
import styled from 'styled-components';
import Inputs from './inputs'
import Consent from './constructor-consent'
import HelloPage from './constructor-hello-page'
import Outline from './constructor-outline'
import Background from './constructor-background';
import Practice from './constructor-practice';
import Experiment from './constructor-experiment';
import Feedback from './constructor-feedback';
import Goodbye from './constructor-goodbye';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button} from 'reactstrap';
import classnames from 'classnames';
import { convertFromRaw } from 'draft-js';

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

export default class Constructor extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            submitButton: '',
            experementName: null,
            practiceTable: '',
            equal: false,
            disabled: true
            
        }
        this.toggle = this.toggle.bind(this);
        this.appendForm = this.appendForm.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.getCookie = this.getCookie.bind(this)
        this.getButton = this.getButton.bind(this)
        this.loadTest = this.loadTest.bind(this)
        this.allInputsAReHere = this.allInputsAReHere.bind(this)
    }
    allInputsAReHere() {
        const controlSumm = new Set(['nameExperement',
        'nameExperementForParticipants',
        'helloEditor',
        'consentEditor',
        'outlineEditor',
        'backgroundExample',
        'feedbackExample',
        'goodbyeEditor',
        'uploadPracticeAudio',
        'uploadPracticeTranscripts',
        'uploadExperementAudio',
        'uploadExperementTranscripts',
        'experimentInstructions',
        'practiceInstructions']),
        form = document.getElementById('constructorForm'),
        store = require('store');
    console.log('childnodes',form.childNodes)
    const formData = new FormData(form)
    let formSum = new Set()
    console.log('what in the form',...formData)

    formData.forEach((item, name) => {
        // console.log(item, name)
        if (item) {
        if (name.includes('Background')) {
            formSum.add('backgroundExample')
        } else if (name.includes('Feedback')) {
            formSum.add('feedbackExample')
        } else if (name.includes('upload')) {
            if (item.name) {
                formSum.add(name)
            }
            console.log('file.name', item.name)
        } else {
            formSum.add(name)
        }}
    })
    if (store.get('uploadExperimentTranscriptsData') && store.get('audiosExperement')){
    if (store.get('uploadExperimentTranscriptsData').length > 0 && store.get('audiosExperement').length > 0) {
        formSum.add('uploadExperementAudio')
        formSum.add('uploadExperementTranscripts')
    }}
    if (store.get('uploadPracticeTranscriptsData') && store.get('audiosPractice')){
    if (store.get('uploadPracticeTranscriptsData').length > 0 && store.get('audiosPractice').length > 0) {
        formSum.add('uploadPracticeAudio')
        formSum.add('uploadPracticeTranscripts')
    }}
    let difference = new Set(
        [...controlSumm].filter(x => !formSum.has(x)));
    if (difference.size == 0) { 
        this.setState({equal: true, disabled: false})
    } else {
        this.setState({equal: false})
    }
    }
    componentDidMount() {
        console.log('constructor props',this.props)
        this.allInputsAReHere()
        let store = require('store')
        if (store.get('tab'))
        {this.setState({ activeTab: store.get('tab') });}
    }
    toggle (tab) {
      let store = require('store')
      if(this.state.activeTab !== tab) this.setState({ activeTab: tab });
      store.set('tab', tab)
    }
    appendForm(...values){
        this.allInputsAReHere()
        const f = document.getElementById('constructorForm')
        let child_name_array = []
        f.childNodes.forEach(child => {
            child_name_array.push(child.name)
            })
        console.log('child_name_array', child_name_array)
        const we_have_name = child_name_array.some(item => item == values[0]);
        // TODO: добавить обработку файлов
        if (values[2] != 'file') {

                // console.log(we_have_name)
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
                the_element.setAttribute('value', values[1]);
            } else {
                const i = document.createElement("input");
                i.setAttribute('name', values[0]);
                i.setAttribute('id', values[0]);
                i.setAttribute('hidden', true);
                i.setAttribute('value', values[1]);
                i.setAttribute('type', 'file');
                f.append(i);
                }
        }

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
    }
    loadTest() {
        const name = document.getElementById('nameExperement').value
        console.log(`/test/${name}`)
        this.setState({experementName: name}, function() {
             console.log(`/test/${this.state.experementName}`)})
    }



    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.submitButton)
        if (this.state.submitButton == 'SaveDraft'){
            const form = e.target
            const formData = new FormData(form);
            // object = ...formData
            //TODO по кнопке загружать файл            
            const csrf = this.getCookie('csrftoken');
            const files = form.querySelectorAll(`input[type='file']`);
            const usertoken = this.getCookie('access_token');
            
            console.log('files',files)
            files.forEach(item => {
                console.log(item.name)
                formData.append("file", item.files[0]);
            })
            formData.append("csrfmiddlewaretoken", csrf);
            formData.append("file", files[0].files[0]);
            formData.append("accessToken", usertoken);
            console.log(...formData)
            fetch('/save_draft/', {
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
            }
            //console.log('так')
            }).catch((data) => {
            console.log(`Try again! Error: ${Error(data.status)}`)
            }).finally(() => {
            form.reset();
            });
            if (formData) {
                this.props.history.push("/");
                this.componentDidMount()
            }
        } else if (this.state.submitButton == 'TestRun') {
            console.log(this.state.submitButton)
            const form = e.target
            const formData = new FormData(form);
            // object = ...formData
            //TODO по кнопке загружать файлы
            const csrf = this.getCookie('csrftoken');
            formData.append("csrfmiddlewaretoken", csrf);
            const usertoken = this.getCookie('access_token');
            formData.append("accessToken", usertoken);
            console.log(...formData)
            fetch('/save_draft/', {
            method: "POST",
            // headers: {
            //     'X-CSRFToken': csrf,
            //     "Content-Type": "application/json",
            //     "X-Requested-With": "XMLHttpRequest"
            // },
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
                    console.log(status_code)
                    if(status_code != 200) {
                      console.log('Error in getting brand info!')
                      return false;
                  }
                    console.log('audios',result)
    
                    return result
                }).then(result => {
                    let store = require('store')
                    Object.entries(result).forEach(([key, value]) => {
                        console.log('res', key, value)
                        store.set(key, value);
                      })
                      if (formData) {
                        this.props.history.push("test")}
                }).catch(error => {
                  console.log(error)
                  })
                
            }
            //console.log('так')
            }).catch((data) => {
            console.log(`Try again! Error: ${Error(data.status)}`)
            }).finally(() => {
            form.reset();
            });
        } else if (this.state.submitButton == 'SaveFinalVersion'){
            const form = e.target
            const formData = new FormData(form);
            // object = ...formData
            //TODO по кнопке загружать файлы
            const csrf = this.getCookie('csrftoken');
            let name = document.getElementById('nameExperementForParticipants').value
            const prolific = document.getElementById('UseProlific').checked
            const usertoken = this.getCookie('access_token');
            formData.append("accessToken", usertoken);
            formData.append("csrfmiddlewaretoken", csrf);
            console.log('prolific', prolific,  document.getElementById('UseProlific'))
            name.includes(" ") ? (name = name.replace(' ', "_"), console.log('name', name) ): null
            if (prolific == true){ 
            formData.append('link', `experiment/${name}?PROLIFIC_PID=test`)}
            else {
            formData.append('link', `experiment/${name}`)}
            console.log(...formData)
            fetch('/save_draft/', {
            method: "POST",
            // headers: {
            //     'X-CSRFToken': csrf,
            //     "Content-Type": "application/json",
            //     "X-Requested-With": "XMLHttpRequest"
            // },
            body: formData
            }).then(data => {
            if (!data.ok){
                throw Error(data.status);
            } else {let name = document.getElementById('nameExperementForParticipants').value
                    const prolific = document.getElementById('UseProlific').checked      
                    name.includes(" ") ? (name = name.replace(' ', "_"), console.log('name', name) ): null
                    
                    console.log('constructor props',prolific.checked)
                    if (prolific == true){ 
                    console.log('constructor prolific',prolific)
                    this.props.history.push(`experiment/${name}?PROLIFIC_PID=test`)
                    this.props.links.push(`experiment/${name}?PROLIFIC_PID=test`)
                }
                else if (prolific == false) {
                    (this.props.history.push(`experiment/${name}`),
                    this.props.links.push(`experiment/${name}`))}
                    console.log('constructor props',this.props.links)
                    }
                }).catch(error => {
                  console.log(error)
            //console.log('так')
            }).catch((data) => {
            console.log(`Try again! Error: ${Error(data.status)}`)
            })
        }
    }
    render () {
        return(
            <>        
            <Nav tabs style={{textAlign:'center'}} className='justify-content-center'>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => {this.toggle('1'); }}
            >
                Basics
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
            >
                Hello
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => { this.toggle('3'); }}
            >
                Consent
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTab === '4' })}
                onClick={() => { this.toggle('4'); }}
            >
            Outline
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTab === '5' })}
                onClick={() => { this.toggle('5'); }}
            >
                Background
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTab === '6' })}
                onClick={() => { this.toggle('6'); }}
            >
                Practice
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTab === '7' })}
                onClick={() => { this.toggle('7'); }}
            >
                Experiment
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTab === '8' })}
                onClick={() => { this.toggle('8'); }}
            >
                Feedback
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTab === '9' })}
                onClick={() => { this.toggle('9'); }}
            >
                Goodbye
            </NavLink>
            </NavItem>
            </Nav>
            <ConstructorBlock>
            <form encType="multipart/form-data" method="post" name="fileinfo" onSubmit={this.onSubmit} onChange={() =>this.onChange} id='constructorForm'> 
            <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
                <Inputs appendForm={this.appendForm} toggle = {this.toggle} active={this.state.activeTab} />
            </TabPane>
            <TabPane tabId="2">
                <HelloPage appendForm={this.appendForm}  toggle = {this.toggle} active={this.state.activeTab} />
            </TabPane>
            <TabPane tabId="3">
                <Consent appendForm={this.appendForm}  toggle = {this.toggle} active={this.state.activeTab} />
            </TabPane>
            <TabPane tabId="4">
                <Outline appendForm={this.appendForm} toggle = {this.toggle} active={this.state.activeTab} />
            </TabPane>
            <TabPane tabId="5">
                <Background appendForm={this.appendForm} allInputsAReHere={this.allInputsAReHere} toggle = {this.toggle} active={this.state.activeTab} />
            </TabPane>
            <TabPane tabId="6">
                <Practice appendForm={this.appendForm} allInputsAReHere={this.allInputsAReHere} toggle = {this.toggle} active={this.state.activeTab} />
            </TabPane>
            <TabPane tabId="7">
                <Experiment appendForm={this.appendForm} allInputsAReHere={this.allInputsAReHere} toggle = {this.toggle} active={this.state.activeTab} />
            </TabPane>
            <TabPane tabId="8">
                <Feedback appendForm={this.appendForm} allInputsAReHere={this.allInputsAReHere} toggle = {this.toggle} active={this.state.activeTab} />
            </TabPane>
            <TabPane tabId="9">
                <Goodbye appendForm={this.appendForm}  toggle = {this.toggle} active={this.state.activeTab} />
            </TabPane>
        </TabContent>
        
        <br/>
               
            <Button type='submit' onClick={this.getButton} name='SaveDraft' color="primary">Save Draft</Button>{' '}
            <Button type='submit' onClick={this.getButton} name='TestRun' color="primary">Test Run</Button>{' '}
            <Button type='submit' onClick={this.getButton} disabled={this.state.disabled} id='SaveFinalVersion' name='SaveFinalVersion' color={this.state.equal ? 'primary': 'secondary'}>Save Final Version</Button>{' '}
        </form>
        </ConstructorBlock>
            </>
        )

        }
}