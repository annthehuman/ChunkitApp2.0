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
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import { Box } from '@mui/system';
import TabContext from '@mui/lab/TabContext';
import CustomHeader from '../../../../common_components/header';
import CustomButton from '../../../../common_components/button';
import { Grid, Stack } from '@mui/material';
import { withStyles } from '@mui/styles';
import CustomBox from '../../../../common_components/box';
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


export default class TestRun extends Component {
  constructor(props) {
    super(props);
    let store = require('store')
    this.state = {
        pagesNeeded: store.get('pagesNeeded') ? store.get('pagesNeeded') : ['Hello', 'Consent', 'Outline', 
        'Background', 'Practice', 'Experiment', 
        'Imitation', 'Feedback', 'Goodbye'],
        activeTabNumber: 0,
        activeTabName: store.get('pagesNeeded') ? store.get('pagesNeeded')[0] : 'Hello'
    }
    this.toggle = this.toggle.bind(this);
}
componentDidMount() {
    // let store = require('store')
    // console.log('tabTest',store.get('tabTest'))
    // if (store.get('tabTest'))
    // {this.setState({ activeTabNumber: store.get('tabTest') });}
    // if (store.get('pagesNeeded')) {
    //     this.setState({pagesNeeded: store.get('pagesNeeded'), activeTabName: store.get('pagesNeeded')[this.state.activeTabNumber]})
    // }
    
    // console.log('this.state.activeTabName', store.get('pagesNeeded')[this.state.activeTabNumber] )
    // {const f = document.getElementById('constructorForm')
    
    // }
}
toggle (event, tab) {
  let store = require('store')
  console.log('toggle', tab, this.state.activeTabNumber)
  if(this.state.activeTabName != tab) {
    event.target.name == 'Back' ?
    (this.setState({ activeTabNumber: +this.state.activeTabNumber - 1, activeTabName: this.state.pagesNeeded[+this.state.activeTabNumber - 1]}),
    store.set('tabTest', +this.state.activeTabNumber - 1)):
    event.target.name == 'Next' ? 
    (this.setState({ activeTabNumber: +this.state.activeTabNumber + 1, activeTabName: this.state.pagesNeeded[+this.state.activeTabNumber + 1]}),
    store.set('tabTest', +this.state.activeTabNumber + 1)):
    (this.setState({ activeTabNumber: this.state.pagesNeeded.indexOf(tab), activeTabName: tab}),
    store.set('tabTest', tab))
//       this.setState({ activeTabNumber: tab, activeTabName: tab});
//   store.set('tabTest', tab)
}
}
  render() {
    let store = require('store')
    console.log('pages', this.state.pagesNeeded, this.state.activeTabNumber, this.state.activeTabName == 'Consent')
    return(
            <>
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
                
                <CustomHeader theme='small' text='Chunktapp 2.0'/>
                <Grid 
                    item
                    >
                    <Link to='/'>
                    <CustomButton theme='white' text='Home' size='small'/>
                    </Link>
                    <Link to='/'>
                    <CustomButton 
                        onClick={() => {console.log('log out', this.props.history);document.cookie = 'access_token' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                        this.setState({autorized: false})}} 
                        text='Log out' 
                        theme='black'
                        size='small'/>
                    </Link>
                </Grid>
            </Grid>
            </Box>
            <TabContext value={this.state.activeTabName}>
            <Box mt={2} sx={{display: 'flex',justifyContent: 'center', flexWrap: 'wrap'}}>
            <TabList 
                onChange={this.toggle}    
                variant="scrollable"
                scrollButtons="auto"
                >
            {this.state.pagesNeeded.map((item, index) => {
                return (
                <CustomTab
                    label={item}
                    value={item}
                    // className={classnames({ active: this.state.activeTabName === item })}
                    // onClick={() => {this.toggle(index); }}
                />)
            })}
            </TabList>
            </Box>
            <CustomBox> 
            <TabPanel value="Hello">
            { this.state.activeTabName == 'Hello' ? <TextTab key='Hello' header='Hello' textToTab={store.get('helloEditor')} toggle = {this.toggle} active={this.state.activeTabNumber} /> : <>No</>}
            </TabPanel>
            <TabPanel value="Consent">
            { this.state.activeTabName == "Consent" ? <TextTab key='Consent' header='Informed consent' textToTab={store.get('consentEditor')} toggle = {this.toggle} active={this.state.activeTabNumber} /> : <>No</> }
            </TabPanel>
            <TabPanel value="Outline">
            { this.state.activeTabName == 'Outline' ?    <TextTab header='Session outline' textToTab={store.get('outlineEditor')} toggle = {this.toggle} active={this.state.activeTabNumber} /> : null }
            </TabPanel>
            <TabPanel value="Background">
            <TestBackground textToTab={store.get('outlineEditor')} toggle = {this.toggle} active={this.state.activeTabNumber} />
            </TabPanel>
            <TabPanel value="Practice">
            <TestPractice appendForm={this.appendForm}  toggle = {this.toggle} active={this.state.activeTabNumber} />
            </TabPanel>
            <TabPanel value="Experiment">
            <TestExperiment appendForm={this.appendForm}  toggle = {this.toggle} active={this.state.activeTabNumber} />
            </TabPanel>
            <TabPanel value="Imitation">
            { this.state.activeTabName == 'Imitation' ?    <TestImitation appendForm={this.appendForm}  toggle = {this.toggle} active={this.state.activeTabNumber} />: null}
            </TabPanel>
            <TabPanel value="Feedback">
            <TestFeedback appendForm={this.appendForm}  toggle = {this.toggle} active={this.state.activeTabNumber} />
            </TabPanel>
            <TabPanel value="Goodbye">
            { this.state.activeTabName == 'Goodbye' ?     <TextTab header='Goodbye' textToTab={store.get('goodbyeEditor')} toggle = {this.toggle} active={this.state.activeTabNumber} /> : null }
            </TabPanel>
            
        <br/>
        <Stack
            direction='row'
            justifyContent="space-between">
        <Grid
            container
            direction='row'
            style={{ gap: '5px', padding: '0 24px 24px 24px' }}>
        <Link to='./constructor'>
        <CustomButton theme='blue' text='Go back to edit' size='small'/>
        </Link>
        </Grid>
        <Grid
            container
            direction='row'
            style={{gap: '5px', padding: '0 24px 24px 24px' }}
            justifyContent="flex-end">
        {this.state.activeTabNumber != 0 ? <CustomButton size='small' type='button' name='Back' onClick={this.toggle} theme='white' text='Back' startIcon={<ArrowBackIosIcon />} style={{border: '1px solid #6083FF'}}/> : null}
        {this.state.activeTabNumber != this.state.pagesNeeded.length ?<CustomButton size='small' type='button' name='Next' onClick={this.toggle} theme='blue' text='Next' endIcon={<ArrowForwardIosIcon />}/> : null}
        </Grid>
        </Stack>
      
        </CustomBox>
        </TabContext>
            </>

    </>
  )}
}