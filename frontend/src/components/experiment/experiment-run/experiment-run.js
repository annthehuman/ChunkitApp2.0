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
        experimentStopped: false
    }
    this.nextPage = this.nextPage.bind(this);
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
componentDidMount() {
    document.cookie = `user=${uuidv4()}; max-age=5400`
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
        // console.log(status_code)
        if(status_code != 200) {
        console.log('Error in getting brand info!')
        }
        return result
    }).then(result => {
        console.log(result)
        this.setState({experimentData: result}, () => {
            let search = window.location.search;
            let params = new URLSearchParams(search);
            const prolificCookie = this.getCookie('prolific')
            // console.log('this.state.experimentData.pagesNeeded', this.state.experimentData.pagesNeeded[0])
            this.state.experimentData.pagesNeeded ? 
                    store.get('pageNumber') ? 
                    this.setState({currentPage: this.state.experimentData.pagesNeeded[+store.get('pageNumber')]}):
                    this.setState({currentPage: this.state.experimentData.pagesNeeded[0]}):
                null
            this.state.experimentData.UseProlific ? 
                params.get('PROLIFIC_PID') ? 
                    Boolean(prolificCookie) ? 
                        this.setState({prolificIsHere: true}) : (document.cookie = `prolific=${params.get('PROLIFIC_PID')}; max-age=5400`, this.setState({prolificIsHere: true}))
                    :this.setState({prolificIsHere: false}) 
                : console.log('no', this.state.experimentData.UseProlific)
            

            // console.log('params', !(this.state.experimentData.UseProlific && Boolean(this.state.prolific)),Boolean(this.state.prolific) )
        })
    }).catch((data) => {
        console.log(`Try again! Error: ${Error(data.status)}`)
    })
    }
    nextPage () {
    let store = require('store');
    !this.state.experimentData.pagesNeeded[+this.state.pageNumber] ?
    this.setState({pageNumber: +this.state.pageNumber+1, currentPage: 'Goodbye'}) :
    this.setState({pageNumber: +this.state.pageNumber+1, currentPage: this.state.experimentData.pagesNeeded[+this.state.pageNumber+1]}, function() {
        store.set('pageNumber', this.state.pageNumber)
        console.log('nextpage', this.state.pageNumber, this.state.currentPage, this.state.experimentData.pagesNeeded)
    })
    }
  render() {
    // console.log(this.state.experimentData.uploadPracticeTranscriptsData)
    return(
            <AppBlock>
            {this.state.experimentData ? 
                this.state.experimentData.experimentStopped ? 
                <>
                <h3>This experiment is finished.</h3>
                <p>See you in our future experiments!</p>
                </>
                :
                    this.state.experimentData.UseProlific && !(this.state.prolificIsHere) ? 
                        <>
                        <h3>Oops!</h3>
                        <p>Something went wrong! We didn't get your Prolific ID. Please try again or contact us.</p>
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
                        <ExperimentBackground nextPage={this.nextPage} data={this.state.experimentData}/>
                        :
                        this.state.currentPage == "Practice" ? 
                        <ExperimentPractice nextPage={this.nextPage} data={this.state.experimentData} />
                        :
                        this.state.currentPage == "Experiment" ? 
                        <ExperimentExperiment nextPage={this.nextPage} data={this.state.experimentData} />
                        :
                        this.state.currentPage == "Imitation" ? 
                        <ExperimentImitation nextPage={this.nextPage} data={this.state.experimentData} />
                        :
                        this.state.currentPage == "Feedback" ? 
                        <ExperimentFeedback nextPage={this.nextPage} data={this.state.experimentData} />
                        :
                        this.state.currentPage == "Goodbye" ? 
                        <TextTab header='Goodbye!' textToTab={this.state.experimentData.goodbyeEditor} link={this.state.experimentData.linkToProlific} />
                        : null 
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