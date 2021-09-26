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
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

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
        }
        this.toggle = this.toggle.bind(this);
        this.appendForm = this.appendForm.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        let store = require('store')
        // console.log(store.get('tab'))
        if (store.get('tab'))
        {this.setState({ activeTab: store.get('tab') });}
        // if (store.get('form'))
        // {const f = document.getElementById('constructorForm')
        
        // }
    }
    toggle (tab) {
      let store = require('store')
      if(this.state.activeTab !== tab) this.setState({ activeTab: tab });
      store.set('tab', tab)
    }
    appendForm(...values){
        let store = require('store')
        const f = document.getElementById('constructorForm')
        let child_name_array = []
        f.childNodes.forEach(child => {
            child_name_array.push(child.name)
            })
        const we_have_name = child_name_array.some(item => item == values[0]);
        // console.log(we_have_name)
        if (we_have_name){
            const the_name = child_name_array.filter(item => item == values[0]),
                  the_element = f.querySelector(`input[name="${the_name}"]`);
            the_element.setAttribute('value', values[1]);
        } else {
            const i = document.createElement("input");
            i.setAttribute('name', values[0]);
            i.setAttribute('id', values[0]);
            i.setAttribute('value', values[1]);
            i.setAttribute('hidden', true);
            f.append(i);
            // store.set('form', f)
        };
        // const formData = new FormData(f);
        // const formJSON = Object.fromEntries(formData.entries());
        // store.set('form', formJSON)
        console.log(f)
        console.log(typeof(f))
        // console.log(formJSON)
    }
    onSubmit(e) {
        e.preventDefault();
        const form = e.target
        const formData = new FormData(form);
        fetch('/experement_data/', {
          method: "POST",
          // headers: {
          //   'X-CSRFToken': object.csrfmiddlewaretoken
          // },
          body: formData
        }).then(data => {
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
            this.props.history.push("/constructor/consent");
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
                <Background appendForm={this.appendForm}  toggle = {this.toggle} active={this.state.activeTab} />
            </TabPane>
            <TabPane tabId="6">
                <Practice appendForm={this.appendForm}  toggle = {this.toggle} active={this.state.activeTab} />
            </TabPane>
            <TabPane tabId="7">
                <Experiment appendForm={this.appendForm}  toggle = {this.toggle} active={this.state.activeTab} />
            </TabPane>
            <TabPane tabId="8">
                <Feedback appendForm={this.appendForm}  toggle = {this.toggle} active={this.state.activeTab} />
            </TabPane>
            <TabPane tabId="9">
                <Goodbye appendForm={this.appendForm}  toggle = {this.toggle} active={this.state.activeTab} />
            </TabPane>
        </TabContent>
        
        <br/>
        <form id='constructorForm'>        
            <Button color="primary">Save Draft</Button>{' '}
            <Button color="primary">Test Run</Button>{' '}
            <Button>Save Final Version</Button>{' '}
        </form>
        </ConstructorBlock>
            </>
        )

        }
}