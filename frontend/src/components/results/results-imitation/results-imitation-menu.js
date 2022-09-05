import React, {Component} from 'react';
import styled from 'styled-components';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import { Box } from '@mui/system';

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
import { withStyles } from '@mui/styles';
import { Tab } from '@mui/material';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
}

const CustomTab = withStyles({
root: {
    textTransform: "none",
    fontSize: '24px'
}
})(Tab);

export default class ImitationResultsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabExperimentResults: 0,
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
toggle (event, tab) {
    console.log('tab', tab)
  let store = require('store')
  if(this.state.activeTabExperimentResults !== tab) this.setState({ activeTabExperimentResults: +tab });
  store.set('activeTabExperimentResults', +tab)
}
  
  render() {
    return(
    <>
        <TabContext value={this.state.activeTabExperimentResults}>
            <Box mt={2} sx={{margin: '0px auto',
                            width: '80%',
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap'}}>
            <TabList 
                onChange={this.toggle}    
                variant="scrollable"
                scrollButtons="auto"
                >
                <CustomTab label="Raw results" />
                <CustomTab label="Levenshtein distance"  />
            </TabList>
            </Box>
            <TabPanel value={this.state.activeTabExperimentResults} index={0}>
            { this.state.activeTabExperimentResults == 0 ?   <ImitationResults name={this.props.name} toggle = {this.toggle} active={this.state.activeTabExperimentResults} />: null }
            </TabPanel>
            <TabPanel value={this.state.activeTabExperimentResults} index={1}>
            { this.state.activeTabExperimentResults == 1 ?  <ImitationLevi name={this.props.name} toggle = {this.toggle} active={this.state.activeTabExperimentResults} />:null}
            </TabPanel>
        </TabContext>
    </>
  )}}