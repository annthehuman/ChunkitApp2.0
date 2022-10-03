import React, {Component} from 'react';
import styled from 'styled-components';
import { Spinner } from 'reactstrap';
import TextTab from '../texts';
import ExperimentBackground from '../experiment-background';
import ExperimentPractice from '../experiment-practice';
import ExperimentExperiment from '../experiment-experiment';
import ExperimentFeedback from '../experiment-feedback';
import ExperimentImitation from '../experiment-imitation';
import { v4 as uuidv4 } from 'uuid';
const AppBlock = styled.div`
    margin: 80px auto;
    max-width: 60%;
`
export default class ExperimentRun extends Component {
  constructor(props) {
    super(props);
    this.state = {
        experimentData: '',
        pageNumber: 0,
        prolificIsHere: true,
        currentPage: 'Hello',
        experimentStopped: false,
        user: null,
        prolificIsDouble: false
    }
    this.nextPage = this.nextPage.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.checkuser = this.checkuser.bind(this);
}
getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = cookie.substring(name.length + 1);
                break;
            }
        }
    }
    return cookieValue;
}
checkuser(){
    this.getCookie('user') ? null : this.setState({user: false})
}
componentDidMount() {
    let store = require('store');
    store.get('pageNumber') ? this.setState({pageNumber: store.get('pageNumber')}) : null
    const name = this.props.match.params.name
    fetch('/load_experement/'+ new URLSearchParams({
        'name': name}), {
        method: "GET",
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    }).then(response => {
        const result = response.json() 
        const status_code = response.status;
        if(status_code != 200) {
            throw Error(status_code);
        }
        return result
    }).then(result => {
        this.setState({experimentData: result}, () => {
            let search = window.location.search;
            let params = new URLSearchParams(search);
            const prolificCookie = this.getCookie('prolific')
            store.get("prolificCheck") == 'double' ? this.setState({prolificIsDouble: true}) : null
            this.state.experimentData.pagesNeeded ? 
                    store.get('pageNumber') ? 
                    this.setState({currentPage: this.state.experimentData.pagesNeeded[+store.get('pageNumber')]}):
                    this.setState({currentPage: this.state.experimentData.pagesNeeded[0]}):
                null
            this.state.experimentData.UseProlific ? 
                params.get('PROLIFIC_PID') ? 
                    Boolean(prolificCookie) ? (
                        !Boolean(store.get("prolificCheck")) && store.get("prolificCheck") != 'double'? 
                    fetch('/get_all_prolific/' + new URLSearchParams({
                        'name': name}), {
                        method: "GET",
                        headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                    }).then(response => {return response.json()})
                        .then(prolific_ids => {
                        if (prolificCookie != 'test' && prolific_ids.prolific_id_set.includes(prolificCookie)) {
                            this.setState({prolificIsDouble: true})
                            store.set("prolificCheck", 'double')
                        } else {this.setState({prolificIsHere: true})
                                store.set("prolificCheck", true)}
                        
                    }) : null)
                    
                        : (document.cookie = `prolific=${params.get('PROLIFIC_PID')}; max-age=5400`, this.setState({prolificIsHere: true}))
                    : this.setState({prolificIsHere: false}) 
                : null
            if (!this.getCookie('user') && !store.get('user')) {
                document.cookie = `user=${uuidv4()}; max-age=${+this.state.experimentData.sessionTime*60}`
                this.setState({user: this.getCookie('user')})
                store.set('user', 'set')
            }
        })
    }).catch((data) => {
        console.log(`Try again! Error: ${Error(data)}`)
    })
    }
    nextPage () {
    let store = require('store');
    !this.state.experimentData.pagesNeeded[+this.state.pageNumber] ?
    this.setState({pageNumber: +this.state.pageNumber+1, currentPage: 'Goodbye'}) :
    this.setState({pageNumber: +this.state.pageNumber+1, currentPage: this.state.experimentData.pagesNeeded[+this.state.pageNumber+1]}, function() {
        store.set('pageNumber', this.state.pageNumber)
    })
    }
    getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = cookie.substring(name.length + 1);
                    break;
                }
            }
        }
        return cookieValue;
    }
  render() {
    return(
            <AppBlock>
            {this.state.experimentData ? 
                this.state.experimentData.experimentStopped ? 
                <>
                <h3>This experiment is finished.</h3>
                <p>See you in our future experiments!</p>
                </>
                :
                 this.getCookie('user') ? 
                    this.state.experimentData.UseProlific && !(this.state.prolificIsHere) ? 
                        <>
                        <h3>Oops!</h3>
                        <p>Something went wrong! We didn't get your Prolific ID. Please try again or contact us.</p>
                        </> :
                    this.state.experimentData.UseProlific && this.state.prolificIsDouble ?
                        <>
                        <h3>Oops!</h3>
                        <p>Thank you for the interest in our research! Our data show that you have already taken 
                            part in this experiment. Unfortunately, you cannot repeat it. Look out for our new studies!</p>
                        </>
                    :
                        this.state.currentPage == "Hello" ? 
                        <TextTab key='hello' nextPage={this.nextPage} header='Hello' textToTab={this.state.experimentData.helloEditor}/>
                        :
                        this.state.currentPage == "Consent" ? 
                        <TextTab key='consent' nextPage={this.nextPage} header='Informed consent' textToTab={this.state.experimentData.consentEditor} />
                        : 
                        this.state.currentPage == "Outline" ? 
                        <TextTab key='outline' nextPage={this.nextPage} header='Session outline' textToTab={this.state.experimentData.outlineEditor} />
                        :
                        this.state.currentPage == "Background" ? 
                        <ExperimentBackground user={this.user} nextPage={this.nextPage} data={this.state.experimentData}/>
                        :
                        this.state.currentPage == "Practice" ? 
                        <ExperimentPractice nextPage={this.nextPage} data={this.state.experimentData} />
                        :
                        this.state.currentPage == "Experiment" ? 
                        <ExperimentExperiment user={this.user} nextPage={this.nextPage} data={this.state.experimentData} />
                        :
                        this.state.currentPage == "Imitation" ? 
                        <ExperimentImitation user={this.user}  nextPage={this.nextPage} data={this.state.experimentData} />
                        :
                        this.state.currentPage == "Feedback" ? 
                        <ExperimentFeedback user={this.user} nextPage={this.nextPage} data={this.state.experimentData} />
                        :
                        this.state.currentPage == "Goodbye" ? 
                        <TextTab header='Goodbye!' textToTab={this.state.experimentData.goodbyeEditor} link={this.state.experimentData.linkToProlific} />
                        : null 
                      :
                      <>
                      <h3>Your session has expired!</h3>
                      <p>See you in our future experiments!</p>
                      </>
            :
            <Spinner
              color="primary"
              size=""
              style={{margin:'10px auto'}}
            >
              Loading...
            </Spinner>}
            </AppBlock>
  )}
}