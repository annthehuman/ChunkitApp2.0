import React, {Component} from 'react';
import styled from 'styled-components';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
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
import ImitationLevi from './imitation-levi';
import ImitationResults from './results-imitation';

export default class ImitationResultsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabExperimentResults: 1,
    }
    this.toggle = this.toggle.bind(this);
}
componentDidMount() {
    let store = require('store')
    console.log('activeTabExperimentResults',store.get('activeTabExperimentResults'))
    if (store.get('activeTabExperimentResults'))
    {this.setState({ activeTabExperimentResults: store.get('activeTabExperimentResults') });}
    console.log(this.state.activeTabExperimentResults)
}
toggle (tab) {
  let store = require('store')
  if(this.state.activeTabExperimentResults !== tab) this.setState({ activeTabExperimentResults: tab });
  store.set('activeTabExperimentResults', tab)
}
  
  render() {
    return(
    <>
            <Nav tabs style={{textAlign:'center'}} className='justify-content-center'>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTabExperimentResults === 1 })}
                onClick={() => {this.toggle(1); }}
            >
                Imitation Results
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTabExperimentResults === 2 })}
                onClick={() => { this.toggle(2); }}
            >
                Levinstein 
            </NavLink>
            </NavItem>
            </Nav>
            <ConstructorBlock>
            <TabContent activeTab={this.state.activeTabExperimentResults.toString()}>
            <TabPane tabId="1">
            { this.state.activeTabExperimentResults == 1 ?   <ImitationResults name={this.props.name} toggle = {this.toggle} active={this.state.activeTabExperimentResults} />: null }
            </TabPane>
            <TabPane tabId="2">
            { this.state.activeTabExperimentResults == 2 ?  <ImitationLevi name={this.props.name} toggle = {this.toggle} active={this.state.activeTabExperimentResults} />:null}
            </TabPane>
            
        </TabContent>
        
        <br/>
        </ConstructorBlock>
    </>
  )}}