import React  from 'react';

import Home from '../home'
import Inputs from '../home/constructor/inputs'
import Consent from '../home/constructor/constructor-consent'
import HelloPage from '../home/constructor/constructor-hello-page'
import Outline from '../home/constructor/constructor-outline'
import Background from '../home/constructor/constructor-background';
import Practice from '../home/constructor/constructor-practice';
import Experiment from '../home/constructor/constructor-experiment';
import Feedback from '../home/constructor/constructor-feedback';
import Goodbye from '../home/constructor/constructor-goodbye';
import './app.css';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Constructor from '../home/constructor/constructor';
const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`

const App = () => {
    return(
        <AppBlock>
        <Router>
            <Route path='/' exact component={Home}/>
            <Route path='/constructor' exact component={Constructor}/>
            <Route path='/constructor/hellopage' component={HelloPage}/>
            <Route path='/constructor/consent' component={Consent}/>
            <Route path='/constructor/outline' component={Outline}/>
            <Route path='/constructor/background' component={Background}/>
            <Route path='/constructor/practice' component={Practice}/>
            <Route path='/constructor/experiment' component={Experiment}/>
            <Route path='/constructor/feedback' component={Feedback}/>
            <Route path='/constructor/goodbye' component={Goodbye}/>
        </Router>
        </AppBlock>
    )
}

export default App;