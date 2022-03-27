import React, {Component} from 'react';
import Home from '../home'
import Results from '../results';
import Signup from '../logging-in/signup';
import Login from '../logging-in/login';
import Authorized from '../logging-in/authtorized';
import SendEmailResetPassword from '../logging-in/email-link-pass-reset';
import PasswordReset from '../logging-in/pass-reset';
// import Inputs from '../home/constructor/inputs'
// import Consent from '../home/constructor/constructor-consent'
// import HelloPage from '../home/constructor/constructor-hello-page'
// import Outline from '../home/constructor/constructor-outline'
// import Background from '../home/constructor/constructor-background';
// import Practice from '../home/constructor/constructor-practice';
// import Experiment from '../home/constructor/constructor-experiment';
// import Feedback from '../home/constructor/constructor-feedback';
// import Goodbye from '../home/constructor/constructor-goodbye';
import './app.css';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Constructor from '../home/constructor/constructor';
import TestRun from '../home/drafts/test-run';
import ExperimentRun from '../experiment/experiment-run';
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
        console.log('experimentLinks',this.state.experimentLinks)
    }
    render () {return(
        <>
        <Router>
            <Route path='/' exact render={(props) => <Home links={this.state.experimentLinks} {...props} />}/>
            <Route path='/constructor' exact render={(props) => <Constructor links={this.state.experimentLinks} {...props} />} />
            <Route path={'/test'} exact component={TestRun}/>
            <Route path={'/experiment/:name'} exact component={ExperimentRun} />
            <Route path={'/results/:name'} exact component={Results}/>
            <Route exact path={"/signup/"} component={Signup}/>
            <Route exact path={"/login/"} component={Login}/>
            <Route exact path={"/authorized"} component={Authorized}/>
            <Route exact path={"/reset_password"} component={SendEmailResetPassword}/>
            <Route exact path={"/password/reset/:uid/:token"} component={PasswordReset}/>

            {/* <Route path='/constructor/hellopage' component={HelloPage}/>
            <Route path='/constructor/consent' component={Consent}/>
            <Route path='/constructor/outline' component={Outline}/>
            <Route path='/constructor/background' component={Background}/>
            <Route path='/constructor/practice' component={Practice}/>
            <Route path='/constructor/experiment' component={Experiment}/>
            <Route path='/constructor/feedback' component={Feedback}/>
            <Route path='/constructor/goodbye' component={Goodbye}/> */}
        </Router>
        </>
    )
    }
}