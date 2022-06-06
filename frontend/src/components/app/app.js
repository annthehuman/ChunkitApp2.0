import React, {Component} from 'react';
import Home from '../home'
import Results from '../results';
import Signup from '../logging-in/signup';
import Login from '../logging-in/login';
import Authorized from '../logging-in/authtorized';
import SendEmailResetPassword from '../logging-in/email-link-pass-reset';
import PasswordReset from '../logging-in/pass-reset';
import Draft from '../home/test';
import './app.css';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Constructor from '../home/constructor/constructor';
import TestRun from '../home/test/test-run';
import ExperimentRun from '../experiment/experiment-run';
import ResultsHome from '../results/results-home';
const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`


export default class App extends Component {
    constructor(props){
        super(props);
        this.state ={
            experimentLinks: ['1']
        }
    }
    componentDidMount(){
        // console.log('experimentLinks',this.state.experimentLinks)
    }
    render () {return(
        <>
        <Router>
            <Route path='/' exact component={Home}/>
            <Route path='/constructor' exact component={Constructor} />
            <Route path={'/test'} exact component={TestRun}/>
            <Route path={'/experiment/:name'} exact component={ExperimentRun} />
            <Route path={'/results/:name'} exact component={Results}/>
            <Route path={'/results'} exact component={ResultsHome}/>
            <Route exact path={"/signup/"} component={Signup}/>
            <Route exact path={"/login/"} component={Login}/>
            <Route exact path={"/authorized"} component={Authorized}/>
            <Route exact path={"/reset_password"} component={SendEmailResetPassword}/>
            <Route exact path={"/password/reset/:uid/:token"} component={PasswordReset}/>
            <Route exact path={"/drafts"} component={Draft}/>
        </Router>
        </>
    )
    }
}