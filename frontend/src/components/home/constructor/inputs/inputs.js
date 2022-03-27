import React, {Component} from 'react';
import { Button, FormGroup, Label, Input, FormText, InputGroup } from 'reactstrap';

export default class Inputs extends Component {
    constructor(props) {
        super(props);
        this.state = {
          initialValue: 0,
          useProlific: false,
          nameExperiment: '',
          shuffle: false
        }
        this.onCheck = this.onCheck.bind(this)
        this.onChange = this.onChange.bind(this)
        this.copyURL = this.copyURL.bind(this)
    }
    componentDidMount() {
      let store = require('store');
      console.log('store', store)
      if (store.get('ImitationTask')){
        document.getElementById('ImitationTask').checked = store.get('ImitationTask')}
        // document.getElementById('sentences').checked = store.get('sentences')}
      if (store.get('UseQuestions')){
        document.getElementById('UseQuestions').checked = store.get('UseQuestions')}
      
      if (store.get('UseProlific')){
        this.setState({useProlific: store.get('UseProlific')}, () => {
          if (this.state.useProlific && store.get('linkToProlific')) {
            document.getElementById('linkToProlific').value = store.get('linkToProlific')}
          }
        )
        document.getElementById('UseProlific').checked = store.get('UseProlific')}
      
      // if (this.state.useProlific && store.get('linkToProlific')){
      //   document.getElementById('linkToProlific').value = store.get('linkToProlific')}
      if (store.get('nameExperement')){
          document.getElementById('nameExperement').value = store.get('nameExperement')}
      if (store.get('nameExperementForParticipants')){
          document.getElementById('nameExperementForParticipants').value = store.get('nameExperementForParticipants')
          this.setState({nameExperiment: store.get('nameExperementForParticipants')})}
      if (store.get('shuffleExtracts')){
        this.setState({shuffle: store.get('shuffleExtracts')}, () => {
          if (this.state.shuffle && store.get('shuffleExtractsPractice')){
            document.getElementById('shuffleExtractsPractice').value = store.get('shuffleExtractsPractice')}
        })
        document.getElementById('shuffleExtracts').checked = store.get('shuffleExtracts')}
      
      
  }
    
    onCheck(){
      let store = require('store')
      const papa = document.getElementById('basics'),
            checks = papa.querySelectorAll('input[type="checkbox"]'),
            feedback_info = {};
      console.log(checks)
      checks.forEach(check => {
        feedback_info[check.name] = check.checked
        store.set(check.name, check.checked)
        })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
      // this.props.appendForm('basics', JSON.stringify(feedback_info))
      
    }
    onChange(e) {
      let store = require('store')
      console.log('change'+e.target.name)
      store.set(e.target.name, e.target.value)
      e.target.name == 'nameExperementForParticipants' ?
      this.setState({nameExperiment: e.target.value}):null
      // this.props.appendForm(e.target.name, e.target.value)
    }
    copyURL() {
      const url = document.getElementById('urltoStudy');
      url.select();
      url.setSelectionRange(0, 99999); /* For mobile devices */

      /* Copy the text inside the text field */
      navigator.clipboard.writeText(url.value);
    }
    render() {
      let store = require('store') 
    return(
      <>
    <h1>The basics</h1>
    <div id='basics'>
      <FormGroup>
        <Label for="nameExperement">Insert the name of the experiment</Label>
        <Input
          required 
          id='nameExperement'
          type='text'
          placeholder='Name of the experiment'
          name='nameExperement'
          onChange={this.onChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="nameExperementForParticipants">Insert the name of the experiment as it will show to the participants</Label>
        <Input
          required 
          id='nameExperementForParticipants'
          type='text'
          placeholder='Name of the experiment as it will show to the participants'
          name='nameExperementForParticipants'
          onChange={this.onChange}
        />
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input onClick={() => {this.onCheck(); this.state.shuffle ? this.setState({shuffle: false}): this.setState({shuffle: true})}} type="checkbox" id='shuffleExtracts' name='shuffleExtracts'/>{' '}
          Do you need to shuffle extracts in experiment?
        </Label>
      </FormGroup>
      <br/>
      <div>
        { this.state.shuffle ?
      <>
      <FormGroup>
        <Label for="shuffleExtractsPractice">Number of practice extracts</Label>
        <Input
          required 
          id='shuffleExtractsPractice'
          type='text'
          placeholder="Number of extracts in the begining of the experiment which will not be shuffled. If you don't need one, insert 0"
          name='shuffleExtractsPractice'
          onChange={this.onChange}
        />
      </FormGroup>
      </>:
      null
    }
      </div>
      <FormGroup check>
        <Label check>
          <Input onClick={this.onCheck} type="checkbox" id='ImitationTask' name='ImitationTask'/>{' '}
          Will you use the Elicited Imitation task?
        </Label>
        <FormText>This part is not customizable. The sentences come from Ortega et al., 1999 but are re-recorded with a male non-native English speaker. In this version of the test, we kept 24 sentences.</FormText>
      </FormGroup>
      <br/>
      <FormGroup check>
        <Label check>
          <Input onClick={this.onCheck} type="checkbox" id='UseQuestions' name='UseQuestions'/>{' '}
          Will you use comprehension questions?
        </Label>
      </FormGroup>
      <br/>
      <FormGroup check>
        <Label check>
          <Input 
          onClick={() => {this.onCheck(); this.state.useProlific ? this.setState({useProlific: false}): this.setState({useProlific: true})}} 
          type="checkbox" id='UseProlific' name='UseProlific'/>{' '}
          Do you need to integrate your experiment with Prolific?
        </Label>
      </FormGroup>
      <br/>
      <div>
        { this.state.useProlific ?
      <>
      <Label for="urltoStudy">URL of your study</Label>
      <br/>
      <InputGroup>
        <Input
          required 
          id='urltoStudy'
          type='text'
          name='urltoStudy'
          readOnly
          value = {`http://${window.location.hostname}/experiment/${this.state.nameExperiment}`}
        />
        <Button id='copyButton' color='info' onClick={this.copyURL}> Copy </Button>
      </InputGroup>
      <br/>
      <FormGroup>
        <Label for="linkToProlific">Link back to Prolific</Label>
        <Input
          required 
          id='linkToProlific'
          type='text'
          placeholder='Link back to Prolific'
          name='linkToProlific'
          onChange={this.onChange}
        />
      </FormGroup>
      </>:
      null
    }
      </div>
      <br/>
      <Button color='light' className="float-right" onClick={() => {this.props.toggle(String(+this.props.active + 1))}}>Next <span className="fa fa-angle-right"></span></Button>
      <div className='clearfix'></div>
    </div>
    </>
    )
    }
}
