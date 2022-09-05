import React, {Component} from 'react';
import styled from 'styled-components';
import FeedbackResults from './results-feedback';
import ImitationResults from './results-imitation';
import BackgroundResults from './results-background';
import ExperimentResults from './results-experiment';
import CustomHeader from '../../common_components/header';
import CustomButton from '../../common_components/button';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { Tabs } from '@mui/material';
import { Tab } from '@mui/material';
import { Drawer } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import { withStyles } from '@mui/styles';
import { Box } from '@mui/system';

const CustomTab = withStyles({
root: {
    textTransform: "none",
    fontSize: '24px'
}
})(Tab);

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

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activeTabTest: 1,
        collapsed: true,
        drafts_list: [],
        menu: false,
        value: 0
    }
    this.toggle = this.toggle.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.getCookie = this.getCookie.bind(this)
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.handleChange = this.handleChange.bind(this)
}
toggleNavbar () {
    this.setState({collapsed: !this.state.collapsed})
};

handleChange = (event, newValue) => {
    this.setState({value : +newValue})
    // this.toggleDrawer('menu', false)
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
toggleDrawer = (anchor, open) => (event) => {
    console.log('menu closed')

    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    console.log('menu closed', open)

    this.setState({[anchor]: open });
  };

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
                this.setState({drafts_list: item})
              }
          })
          
          // Do something with the result
        })
        .catch(error => {
            console.log(error)
        })
}
toggle (e, tab) {
  console.log('toggle', tab)
  let store = require('store')
  if(this.state.value !== tab) this.setState({ value: tab });
  store.set('tabTest', tab)
}
  render() {
    console.log('drafts_list', typeof(this.state.drafts_list.pagesNeeded))
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
                <Grid item>
                <Grid container
                  direction='row'
                  justifyContent="space-between"
                  >
                {/* <IconButton onClick={this.toggleDrawer('menu', true)} aria-label="Menu">
                    <MenuIcon />
                </IconButton> */}
                <CustomHeader theme='small' text='ChunktApp 2.0'/>
                </Grid>
                </Grid>
                <Grid 
                    item
                    >
                    <Link to='/'>
                    <CustomButton theme='white' text='Home' size='small'/>
                    </Link>
                    <Link to='/'>
                    <CustomButton 
                        onClick={() => {document.cookie = 'access_token' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                        this.setState({autorized: false});; this.props.history.push("/"); window.location.reload()}} 
                        text='Log out' 
                        theme='black'
                        size='small'/>
                    </Link>
                </Grid>
            </Grid>
            </Box>
          
      <TabContext value={this.state.value}>
          <div>
          <Box mt={2} sx={{margin: '0px auto',
                            width: '80%',
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap'}}>
            {this.state.drafts_list.pagesNeeded && this.state.drafts_list.pagesNeeded.indexOf('Imitation') != -1 ?
            <TabList 
                onChange={this.toggle}    
                variant="scrollable"
                scrollButtons="auto"
                >
                <CustomTab label="Experiment results" />
                <CustomTab label="Background results"  />
                <CustomTab label="EIT results"  />
                <CustomTab label="Feedback results" /> 
                </TabList>
                :
            <TabList 
                onChange={this.toggle}    
                variant="scrollable"
                scrollButtons="auto"
                >
                <CustomTab label="Experiment results" />
                <CustomTab label="Background results"  />
                <CustomTab label="Feedback results" /> 
                </TabList>
              }
            </Box>
    </div>
            {this.state.drafts_list.pagesNeeded && this.state.drafts_list.pagesNeeded.indexOf('Imitation') != -1 ?
            <>
      <TabPanel value={this.state.value} index={0}>
        <ExperimentResults name={this.props.match.params.name} toggle = {this.toggle} active={this.state.activeTabTest} />
      </TabPanel>
      <TabPanel value={this.state.value} index={1}>
        <BackgroundResults backlabels={this.state.drafts_list.backgroundExample} name={this.props.match.params.name} toggle = {this.toggle} active={this.state.activeTabTest} />
      </TabPanel>
      <TabPanel value={this.state.value} index={2}>
        <ImitationResults name={this.props.match.params.name} toggle = {this.toggle} active={this.state.activeTabTest} />
      </TabPanel>
      <TabPanel value={this.state.value} index={3}>
        <FeedbackResults name={this.props.match.params.name} toggle = {this.toggle} active={this.state.activeTabTest} />
      </TabPanel>
        </>:
        <>
       <TabPanel value={this.state.value} index={0}>
        <ExperimentResults name={this.props.match.params.name} toggle = {this.toggle} active={this.state.activeTabTest} />
      </TabPanel>
      <TabPanel value={this.state.value} index={1}>
        <BackgroundResults backlabels={this.state.drafts_list.backgroundExample} name={this.props.match.params.name} toggle = {this.toggle} active={this.state.activeTabTest} />
      </TabPanel>
      <TabPanel value={this.state.value} index={2}>
        <FeedbackResults name={this.props.match.params.name} toggle = {this.toggle} active={this.state.activeTabTest} />
      </TabPanel>
      
        </>}
        </TabContext>
    </>
  )}
}