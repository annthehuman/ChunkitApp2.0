import React, {Component} from 'react';
import styled from 'styled-components';
import { TabContent, TabPane } from 'reactstrap';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {

    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';
import FeedbackResults from './results-feedback';
import ImitationResults from './results-imitation';
import classnames from 'classnames';
import BackgroundResults from './results-background';
import ExperimentResults from './results-experiment';
const ConstructorBlock = styled.div`
    @media (max-width: 1200px) {
        max-width: 100%;
    }
    @media (max-width: 1300px) {
        max-width: 100%;
    }
    margin: 30px auto;
    max-width: 100%;
`
export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activeTabTest: 1,
        collapsed: true,
        drafts_list: []
    }
    this.toggle = this.toggle.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.getCookie = this.getCookie.bind(this)
}
toggleNavbar () {
    this.setState({collapsed: !this.state.collapsed})
};

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

componentDidMount() {
    let store = require('store')
    console.log('tabTest',store.get('tabTest'))
    if (store.get('tabTest'))
    {this.setState({ activeTabTest: store.get('tabTest') });}
    console.log(this.state.activeTabTest)

    console.log('props',this.props.links)
    const usertoken = this.getCookie('access_token');
    fetch ('/drafts_list/?'+ new URLSearchParams({
        access_token: usertoken}), {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
      })
      .then(response => {
          // console.log(response.text())
          const result = response.json()
          console.log('result', result);
          const status_code = response.status;
          console.log(status_code)
          if(status_code != 200) {
              console.log('Error in getting brand info!')
              return false;
          }
          
          return result
        }).then(result => {
          console.log('result result', result);
          result.pop()
          result.forEach(item => {
              console.log('name', item.nameExperementForParticipants, this.props.match.params.name)
              if(item.nameExperementForParticipants == this.props.match.params.name) {
                this.setState({drafts_list: item},console.log('result result drafts_list', this.state.drafts_list))
              }
          })
          
          // Do something with the result
        })
        .catch(error => {
            console.log(error)
        })
}
toggle (tab) {
  let store = require('store')
  if(this.state.activeTabTest !== tab) this.setState({ activeTabTest: tab });
  store.set('tabTest', tab)
}
  render() {
    console.log('drafts_list', this.state.drafts_list)
    return(
            <>
            {this.state.drafts_list.ImitationTask ?
            <>
        <Navbar color="faded" light>
        <NavbarToggler onClick={this.toggleNavbar} className="float-left"/>
        <Collapse isOpen={!this.state.collapsed} navbar>
        <Nav navbar style={{textAlign:'left'}} className="float-left">
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTabTest === 1 })}
                onClick={() => {this.toggle(1); }}
            >
                Experiment results

            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTabTest === 2 })}
                onClick={() => { this.toggle(2); }}
            >
                Background results
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTabTest === 3 })}
                onClick={() => { this.toggle(3); }}
            >
                Imitation results
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTabTest === 4 })}
                onClick={() => { this.toggle(4); }}
            >
                Feedback results
            </NavLink>
            </NavItem>
            </Nav>
        </Collapse>
      </Navbar>        
            
            <ConstructorBlock>
            <TabContent activeTab={this.state.activeTabTest.toString()}>
            <TabPane tabId="1">
            <ExperimentResults name={this.props.match.params.name} toggle = {this.toggle} active={this.state.activeTabTest} />
            </TabPane>
            <TabPane tabId="2">
            <BackgroundResults backlabels={this.state.drafts_list.backgroundExample} name={this.props.match.params.name} toggle = {this.toggle} active={this.state.activeTabTest} />
            </TabPane>
            <TabPane tabId="3">
            <ImitationResults name={this.props.match.params.name} toggle = {this.toggle} active={this.state.activeTabTest} />
            </TabPane>
            <TabPane tabId="4">
            <FeedbackResults name={this.props.match.params.name} toggle = {this.toggle} active={this.state.activeTabTest} />
            </TabPane>
            
        </TabContent>
        
        <br/>
        </ConstructorBlock>
        </>:
        <>
                <Navbar color="faded" light>
                <NavbarToggler onClick={this.toggleNavbar} className="float-left"/>
                <Collapse isOpen={!this.state.collapsed} navbar>
                <Nav navbar style={{textAlign:'left'}} className="float-left">
                    <NavItem>
                    <NavLink
                        className={classnames({ active: this.state.activeTabTest === 1 })}
                        onClick={() => {this.toggle(1); }}
                    >
                        Experiment results
        
                    </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink
                        className={classnames({ active: this.state.activeTabTest === 2 })}
                        onClick={() => { this.toggle(2); }}
                    >
                        Background results
                    </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink
                        className={classnames({ active: this.state.activeTabTest === 3 })}
                        onClick={() => { this.toggle(3); }}
                    >
                        Feedback results
                    </NavLink>
                    </NavItem>
                    </Nav>
                </Collapse>
              </Navbar>        
                    
                    <ConstructorBlock>
                    <TabContent activeTab={this.state.activeTabTest.toString()}>
                    <TabPane tabId="1">
                    <ExperimentResults name={this.props.match.params.name} toggle = {this.toggle} active={this.state.activeTabTest} />
                    </TabPane>
                    <TabPane tabId="2">
                    <BackgroundResults name={this.props.match.params.name} toggle = {this.toggle} active={this.state.activeTabTest} />
                    </TabPane>
                    <TabPane tabId="3">
                    <FeedbackResults name={this.props.match.params.name} toggle = {this.toggle} active={this.state.activeTabTest} />
                    </TabPane>
                    
                </TabContent>
                
                <br/>
                </ConstructorBlock>
        </>}
    </>
  )}
}