import React, {Component} from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";
import TextTab from '../texts';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import TestBackground from '../test-background';
import TestFeedback from '../test-feedback';
import TestExperiment from '../test-experiment';
import TestPractice from '../test-practice/test-practice';
import TestImitation from '../test-imitation/test-imitation';
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
export default class TestRun extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activeTabTest: 1,
    }
    this.toggle = this.toggle.bind(this);
}
componentDidMount() {
    let store = require('store')
    console.log('tabTest',store.get('tabTest'))
    if (store.get('tabTest'))
    {this.setState({ activeTabTest: store.get('tabTest') });}
    console.log(this.state.activeTabTest)
    // {const f = document.getElementById('constructorForm')
    
    // }
}
toggle (tab) {
  let store = require('store')
  if(this.state.activeTabTest !== tab) this.setState({ activeTabTest: tab });
  store.set('tabTest', tab)
}
  render() {
    let store = require('store')
    console.log(store.get('helloEditor'))
    return(
            <>
            { !store.get('ImitationTask') ?
            <>      
            <Nav tabs style={{textAlign:'center'}} className='justify-content-center'>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTabTest === 1 })}
                onClick={() => {this.toggle(1); }}
            >
                Hello
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTabTest === 2 })}
                onClick={() => { this.toggle(2); }}
            >
                Informed consent
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTabTest === 3 })}
                onClick={() => { this.toggle(3); }}
            >
                Session outline
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTabTest === 4 })}
                onClick={() => { this.toggle(4); }}
            >
            Background
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTabTest === 5 })}
                onClick={() => { this.toggle(5); }}
            >
                The chunking practice
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTabTest === 6 })}
                onClick={() => { this.toggle(6); }}
            >
                The chunking task
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTabTest === 7 })}
                onClick={() => { this.toggle(7); }}
            >
                Feedback
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTabTest === 8 })}
                onClick={() => { this.toggle(8); }}
            >
                Goodbye
            </NavLink>
            </NavItem>
            </Nav>
            <ConstructorBlock>
            <TabContent activeTab={this.state.activeTabTest.toString()}>
            <TabPane tabId="1">
            { this.state.activeTabTest == 1 ? <TextTab key='hello' header='Hello' textToTab={store.get('helloEditor')} toggle = {this.toggle} active={this.state.activeTabTest} /> : (console.log('tab1',this.state.activeTabTest))}
            </TabPane>
            <TabPane tabId="2">
            { this.state.activeTabTest == 2 ? <TextTab key='consent' header='Informed consent' textToTab={store.get('consentEditor')} toggle = {this.toggle} active={this.state.activeTabTest} /> : null }
            </TabPane>
            <TabPane tabId="3">
            { this.state.activeTabTest == 3 ?    <TextTab header='Session outline' textToTab={store.get('outlineEditor')} toggle = {this.toggle} active={this.state.activeTabTest} /> : null }
            </TabPane>
            <TabPane tabId="4">
                <TestBackground textToTab={store.get('outlineEditor')} toggle = {this.toggle} active={this.state.activeTabTest} />
            </TabPane>
            <TabPane tabId="5">
                <TestPractice appendForm={this.appendForm}  toggle = {this.toggle} active={this.state.activeTabTest} />
            </TabPane>
            <TabPane tabId="6">
                <TestExperiment appendForm={this.appendForm}  toggle = {this.toggle} active={this.state.activeTabTest} />
            </TabPane>
            <TabPane tabId="7">
                <TestFeedback appendForm={this.appendForm}  toggle = {this.toggle} active={this.state.activeTabTest} />
            </TabPane>
            <TabPane tabId="8">
            { this.state.activeTabTest == 8 ?     <TextTab header='Goodbye' textToTab={store.get('goodbyeEditor')} toggle = {this.toggle} active={this.state.activeTabTest} /> : null }
            </TabPane>
        </TabContent>
        
        <br/>
        <Link to='./constructor'>
        <Button>Go back to edit</Button>{' '}
        </Link>
        </ConstructorBlock>
        </>
        :
        <>      
        <Nav tabs style={{textAlign:'center'}} className='justify-content-center'>
        <NavItem>
        <NavLink
            className={classnames({ active: this.state.activeTabTest === 1 })}
            onClick={() => {this.toggle(1); }}
        >
            Hello
        </NavLink>
        </NavItem>
        <NavItem>
        <NavLink
            className={classnames({ active: this.state.activeTabTest === 2 })}
            onClick={() => { this.toggle(2); }}
        >
            Informed consent
        </NavLink>
        </NavItem>
        <NavItem>
        <NavLink
            className={classnames({ active: this.state.activeTabTest === 3 })}
            onClick={() => { this.toggle(3); }}
        >
            Session outline
        </NavLink>
        </NavItem>
        <NavItem>
        <NavLink
            className={classnames({ active: this.state.activeTabTest === 4 })}
            onClick={() => { this.toggle(4); }}
        >
        Background
        </NavLink>
        </NavItem>
        <NavItem>
        <NavLink
            className={classnames({ active: this.state.activeTabTest === 5 })}
            onClick={() => { this.toggle(5); }}
        >
            The chunking practice
        </NavLink>
        </NavItem>
        <NavItem>
        <NavLink
            className={classnames({ active: this.state.activeTabTest === 6 })}
            onClick={() => { this.toggle(6); }}
        >
            The chunking task
        </NavLink>
        </NavItem>
        <NavItem>
        <NavLink
            className={classnames({ active: this.state.activeTabTest === 7 })}
            onClick={() => { this.toggle(7); }}
        >
            Imitation task
        </NavLink>
        </NavItem>
        <NavItem>
        <NavLink
            className={classnames({ active: this.state.activeTabTest === 8 })}
            onClick={() => { this.toggle(8); }}
        >
            Feedback
        </NavLink>
        </NavItem>
        <NavItem>
        <NavLink
            className={classnames({ active: this.state.activeTabTest === 9 })}
            onClick={() => { this.toggle(9); }}
        >
            Goodbye
        </NavLink>
        </NavItem>
        </Nav>
        <ConstructorBlock>
        <TabContent activeTab={this.state.activeTabTest.toString()}>
        <TabPane tabId="1">
        { this.state.activeTabTest == 1 ? <TextTab key='hello' header='Hello' textToTab={store.get('helloEditor')} toggle = {this.toggle} active={this.state.activeTabTest} /> : (console.log('tab1',this.state.activeTabTest))}
        </TabPane>
        <TabPane tabId="2">
        { this.state.activeTabTest == 2 ? <TextTab key='consent' header='Informed consent' textToTab={store.get('consentEditor')} toggle = {this.toggle} active={this.state.activeTabTest} /> : null }
        </TabPane>
        <TabPane tabId="3">
        { this.state.activeTabTest == 3 ?    <TextTab header='Session outline' textToTab={store.get('outlineEditor')} toggle = {this.toggle} active={this.state.activeTabTest} /> : null }
        </TabPane>
        <TabPane tabId="4">
            <TestBackground textToTab={store.get('outlineEditor')} toggle = {this.toggle} active={this.state.activeTabTest} />
        </TabPane>
        <TabPane tabId="5">
            <TestPractice appendForm={this.appendForm}  toggle = {this.toggle} active={this.state.activeTabTest} />
        </TabPane>
        <TabPane tabId="6">
            <TestExperiment appendForm={this.appendForm}  toggle = {this.toggle} active={this.state.activeTabTest} />
        </TabPane>
        <TabPane tabId="7">
            <TestImitation appendForm={this.appendForm}  toggle = {this.toggle} active={this.state.activeTabTest} />
        </TabPane>
        <TabPane tabId="8">
            <TestFeedback appendForm={this.appendForm}  toggle = {this.toggle} active={this.state.activeTabTest} />
        </TabPane>
        <TabPane tabId="9">
        { this.state.activeTabTest == 9 ?     <TextTab header='Goodbye' textToTab={store.get('goodbyeEditor')} toggle = {this.toggle} active={this.state.activeTabTest} /> : null }
        </TabPane>
    </TabContent>
    
    <br/>
    <Link to='./constructor'>
    <Button>Go back to edit</Button>{' '}
    </Link>
    </ConstructorBlock>
    </>
        }
    </>
  )}
}