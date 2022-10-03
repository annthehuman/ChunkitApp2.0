import React, {Component} from 'react';
import styled from 'styled-components';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import { Box } from '@mui/system';
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
import ExperimentClearResults from './results-experiment_clear';
import ExperimentRawResults from './results-experiment_raw';
import ExperimentResultsPermutation from './results-experiment_perm';
import { Tab } from '@mui/material';
import { withStyles } from '@mui/styles';

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

export default class ExperimentResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabExperimentResults: 0,
    }
    this.toggle = this.toggle.bind(this);
}
componentDidMount() {
    let store = require('store')
    if (store.get('activeTabExperimentResults'))
    {this.setState({ activeTabExperimentResults: store.get('activeTabExperimentResults') });}
}
toggle (event, tab) {
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
                <CustomTab label="Raw chunking results" />
                <CustomTab label="Aggregated chunking data"  />
                <CustomTab label="Permutation results" />
            </TabList>
            </Box>
            <TabPanel value={this.state.activeTabExperimentResults} index={0}>
            { this.state.activeTabExperimentResults == 0 ?   <ExperimentRawResults draft_list={this.props.drafts_list} name={this.props.name} toggle = {this.toggle} active={this.state.activeTabExperimentResults} />: null }
            </TabPanel>
            <TabPanel value={this.state.activeTabExperimentResults} index={1}>
            { this.state.activeTabExperimentResults == 1 ?  <ExperimentClearResults name={this.props.name} toggle = {this.toggle} active={this.state.activeTabExperimentResults} />:null}
            </TabPanel>
            <TabPanel value={this.state.activeTabExperimentResults} index={2}>
            { this.state.activeTabExperimentResults == 2 ?  <ExperimentResultsPermutation name={this.props.name} toggle = {this.toggle} active={this.state.activeTabExperimentResults} />:null}
            </TabPanel>
        </TabContext>
    </>
  )}
}