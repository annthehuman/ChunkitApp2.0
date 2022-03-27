import React, {Component} from 'react';
import {  Input, FormGroup, Label,Button, Table  } from 'reactstrap';
import {ExcelRenderer} from 'react-excel-renderer';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

export default class Experiment extends Component {
    constructor(props) {
        super(props);
        this.state = {
          colsEx: '',
          rowsEx: '',
          editorState: EditorState.createEmpty(),
          experimentTranscripts: "Upload transcripts table",
          experimentAudio: "Upload audio zip"
        }
        this.onLoad = this.onLoad.bind(this)
        this.onLoadAudio = this.onLoadAudio.bind(this)
        this.onEditorStateChange = this.onEditorStateChange.bind(this)
    }
    componentDidMount() {
      let store = require('store');
      if (store.get('experimentInstructions')){
        const blocksFromHTML = convertFromHTML(store.get('experimentInstructions')),
              content = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
        this.setState({ editorState: store.get('experimentInstructions') });
        (this.onEditorStateChange(EditorState.createWithContent(content)))
        }
        if (store.get('uploadExperimentTranscriptsData') && store.get('audiosExperement')){
      if (store.get('uploadExperimentTranscriptsData').length > 0 && store.get('audiosExperement').length > 0){
        this.setState({experimentAudio: store.get('uploadExperementAudio'),
                       experimentTranscripts: store.get('uploadExperementTranscripts')})
      }
    }}
    onEditorStateChange(editorState) {
      let store = require('store');
      this.setState({
        editorState,
      });
      this.props.appendForm('experimentInstructions', draftToHtml(convertToRaw(editorState.getCurrentContent())))
      store.set('experimentInstructions', draftToHtml(convertToRaw(editorState.getCurrentContent())))
    };
    onLoadAudio(e) {
      let file = e.target.value
      file = file.replace(/\\/g, '/').split('/').pop();
      console.log(e.target.files[0])
      e.target.previousElementSibling.innerHTML = file;
      this.props.allInputsAReHere();
    }
    onLoad(e){
      let store = require('store');
      let fileFile = e.target.files[0]
      console.log('state',this.props)
      ExcelRenderer(fileFile, (err, resp) => {
        let realRows = []
        resp.rows.forEach(row =>{
          if(row.length !=0) {
            realRows.push(row)
          }})
        if(err){
          console.log(err);            
        }
        else{
          this.setState({
            colsEx: resp.cols,
            rowsEx: realRows
          }, function () { console.log('states',this.state.colsEx, this.state.rowsEx), store.set('uploadExperimentTranscriptsData', this.state.rowsEx)});
        }
      });
      ExcelRenderer(fileFile)
      let file = e.target.value
      file = file.replace(/\\/g, '/').split('/').pop();
      console.log(e.target.files[0])
      e.target.previousElementSibling.innerHTML = file;
      this.props.allInputsAReHere();
    }  //TODO SAVE LOAD 

    render () {
      let store = require('store');
      return(
          <>
          <h1>Upload your experiment extracts</h1>
          <div>
            <p>In this section, you design your segmentation task via the stimuli and upload the following elements to the website: 
            </p>
            <ul>
              <li>A zip of audio extracts in any format*.</li>
              <li>The instructions for the task**.</li>
              <li>Transcripts for the extracts in a table format according to the following example:</li>
            </ul>
            <p>
            *You should choose the sound format according to the purpose of your experiment. The MP3 format is compact but slightly degrades the signal. Thus, it will take no time to buffer and is well suited for experiments that do not require acoustical precision. For those that do, it is possible to upload the audio in WAV format which preserves the high sound quality but might take a while to load.
            </p>
            <p>
            High-quality extracts may require several seconds to load before the experiment starts. They are loaded all at once, so buffering will only happen before the first extract starts playing. We provide here an example of the warning: “We are using high-quality audio files that could take a minute to load. Please do not refresh, they will be ready in a few seconds!”).
            </p>
            <p>
            **What would you like your participants to do?
            </p>
            </div>
            <FormGroup>
          <Label for="outlineCastom" style={{marginBottom: '1rem'}}>Write the instructions for the task:</Label> 
      <div>
      <Editor
        editorState={this.state.editorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        onEditorStateChange={this.onEditorStateChange}
        wrapperStyle={{border: '1px  solid #ced4da', borderRadius: '0.25rem'}}
        editorStyle={{ margin: '0 1em 0 1em' }}
      />
      </div>
      </FormGroup>
          <div>
      {store.get('UseQuestions') ?
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
      :
      <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Audio name</th>
          <th>Transcript</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>stim_001</td>
          <td>The fault, dear Brutus, is not in our stars, but in ourselves.</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>stim_014</td>
          <td>My tongue will tell the anger of my heart, or else my heart concealing it will break.</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>stim_145</td>
          <td>Though this be madness, yet there is method in't.</td>
        </tr>
      </tbody>
      </Table>
    }
    </div>
    <br/>
    <FormGroup>
    <Label  for="uploadExperementTranscripts" className="custom-file-upload">
    <span id="uploadExperimentTranscriptsSpan" className="fa fa-angle-double-up"></span>{' '}<span>{this.state.experimentTranscripts}</span>
    <Input id='uploadExperementTranscripts' onChange={this.onLoad} style={{display:'none'}} type="file" name="uploadExperementTranscripts" />
    </Label>{' '}
    <Label className="custom-file-upload" for="uploadExperementAudio">
    <span id="uploadExperimentAudioSpan" className="fa fa-angle-double-up"></span>{' '}<span>{this.state.experimentAudio}</span>
    <Input id='uploadExperementAudio' onChange={this.onLoadAudio} style={{display:'none'}} type="file" name="uploadExperementAudio" />
    </Label>
    </FormGroup>
    {/* <br/> */}
    <Button color='light' className="float-left"  onClick={() => {this.props.toggle(String(+this.props.active - 1))}}><span className="fa fa-angle-left"></span> Go back</Button>
    <Button color='light' className="float-right"  onClick={() => {this.props.toggle(String(+this.props.active + 1))}}>Next <span className="fa fa-angle-right"></span></Button>
    <div className='clearfix'></div>
  </>
        )
        }
}