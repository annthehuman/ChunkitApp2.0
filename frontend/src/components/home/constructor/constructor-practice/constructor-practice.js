import React, {Component} from 'react';
import styled from 'styled-components';
import {  Input, FormGroup, Label, Form, Button, Table  } from 'reactstrap';
import './constructor-practice.css';

export default class Practice extends Component {
    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this)
    }

    onLoad(e){
      let file = e.target.value
      console.log(e.target, file)
      file = file.replace(/\\/g, '/').split('/').pop();
      console.log(e.target.previousElementSibling)
      e.target.previousElementSibling.innerHTML = file;

    }  

    render () {
        return(
            <>
            <h1>Upload your practice extracts</h1>
      <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Audio name</th>
          <th>Transcript</th>
          <th>Question</th>
          <th>Answer1</th>
          <th>Answer2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>stim_001</td>
          <td>The fault, dear Brutus, is not in our stars, but in ourselves.</td>
          <td>Is the fault in ourselves?</td>
          <td>Yes</td>
          <td>No</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>stim_014</td>
          <td>My tongue will tell the anger of my heart, or else my heart concealing it will break.</td>
          <td>Will my tongue tell the anger of my pancreas?</td>
          <td>Yes</td>
          <td>No</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>stim_145</td>
          <td>Though this be madness, yet there is method in't.</td>
          <td>Is there method in this madness?</td>
          <td>Yes</td>
          <td>No</td>
        </tr>
      </tbody>
    </Table>
    <br/>
    <FormGroup>
      <Label  for="uploadPracticeTranscripts" className="custom-file-upload">
      <span className="fa fa-angle-double-up"></span>{' '}<span>Upload transcripts table</span>
      <Input id='uploadPracticeTranscripts' onChange={this.onLoad} style={{display:'none'}} type="file" name="uploadPracticeTranscripts" />
      </Label>{' '}
      <Label className="custom-file-upload" for="uploadPracticeAudio">
      <span className="fa fa-angle-double-up"></span>{' '}<span>Upload audio zip</span>
      <Input id='uploadPracticeAudio' onChange={this.onLoad} style={{display:'none'}} type="file" name="uploadPracticeAudio" />
      </Label>
    </FormGroup>
    <Button color='light' className="float-left"  onClick={() => {this.props.toggle(String(+this.props.active - 1))}}><span className="fa fa-angle-left"></span> Go back</Button>
    <Button color='light' className="float-right"  onClick={() => {this.props.toggle(String(+this.props.active + 1))}}>Next <span className="fa fa-angle-right"></span></Button>
    <div className='clearfix'></div>
  </>
  )
  }
}