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

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 70%;
`

export default class Constructor extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
        }
        this.toggle = this.toggle.bind(this)
    }
    toggle (tab) {
      if(this.state.activeTab !== tab) this.setState({ activeTab: tab });
    }
    render () {
        return(
            <div className='Constructor'>        
            <Nav tabs>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { console.log(this.state.activeTab); this.toggle('1'); }}
            >
                The basics
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
            >
                HelloPage
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
            <TabContent activeTab={this.state.activeTab} componentdidmount={console.log(this.state.activeTab)}>
            <TabPane tabId="1">
                <Inputs toggle = {this.toggle} active={this.state.activeTab} />
            </TabPane>
            <TabPane tabId="2">
                <HelloPage toggle = {this.toggle} active={this.state.activeTab} />
            </TabPane>
            <TabPane tabId="3">
                <Consent toggle = {this.toggle} active={this.state.activeTab} />
            </TabPane>
            <TabPane tabId="4">
                <Outline toggle = {this.toggle} active={this.state.activeTab} />
            </TabPane>
            <TabPane tabId="5">
                <Background toggle = {this.toggle} active={this.state.activeTab} />
            </TabPane>
            <TabPane tabId="6">
                <Practice toggle = {this.toggle} active={this.state.activeTab} />
            </TabPane>
            <TabPane tabId="7">
                <Experiment toggle = {this.toggle} active={this.state.activeTab} />
            </TabPane>
            <TabPane tabId="8">
                <Feedback toggle = {this.toggle} active={this.state.activeTab} />
            </TabPane>
            <TabPane tabId="9">
                <Goodbye toggle = {this.toggle} active={this.state.activeTab} />
            </TabPane>
        </TabContent>
        <br/>        
            <Button>Save Draft
            </Button>
            </div>
        )
        }
}