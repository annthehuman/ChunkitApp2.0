import React, {Component} from 'react';
import {  Input, FormGroup, Label, Form, Button, Table  } from 'reactstrap';
import './constructor-practice.css';
import {ExcelRenderer } from 'react-excel-renderer';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
export default class Practice extends Component {
    constructor(props) {
        super(props);
        this.state = {
          cols: '',
          rows: '',
          editorState: EditorState.createEmpty(),
          practiceTranscripts: "Upload transcripts table",
          practiceAudio: "Upload audio zip"
        }
        this.onLoad = this.onLoad.bind(this)
        this.onLoadAudio = this.onLoadAudio.bind(this)
        this.onEditorStateChange = this.onEditorStateChange.bind(this)
    }
    componentDidMount() {
      let store = require('store');
      if (store.get('practiceInstructions')){
        const blocksFromHTML = convertFromHTML(store.get('practiceInstructions')),
              content = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
        this.setState({ editorState: store.get('practiceInstructions') });
        (this.onEditorStateChange(EditorState.createWithContent(content)))
        }
      if (store.get('uploadPracticeTranscriptsData') && store.get('audiosPractice')){
      if (store.get('uploadPracticeTranscriptsData').length > 0 && store.get('audiosPractice').length > 0){
        console.log("(store.get('uploadPracticeTranscriptsData') && store.get('audiosPractice'))",(store.get('uploadPracticeTranscriptsData'), store.get('audiosPractice')))
        this.setState({practiceTranscripts: store.get('uploadPracticeTranscripts'),
                      practiceAudio: store.get('uploadPracticeAudio')})
      }
    }}
    onEditorStateChange(editorState) {
      let store = require('store');
      this.setState({
        editorState,
      });
      this.props.appendForm('practiceInstructions', draftToHtml(convertToRaw(editorState.getCurrentContent())))
      store.set('practiceInstructions', draftToHtml(convertToRaw(editorState.getCurrentContent())))
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
            cols: resp.cols,
            rows: realRows
          }, function () { console.log('states',this.state.cols, this.state.rows), store.set('uploadPracticeTranscriptsData', this.state.rows)});
        }
      });
      ExcelRenderer(fileFile)
      const practiceFile = store.get('uploadPracticeTranscripts')
      console.log('practice',typeof(practiceFile),practiceFile)
      let file = e.target.value
      file = file.replace(/\\/g, '/').split('/').pop();
      console.log(e.target.files[0])
      e.target.previousElementSibling.innerHTML = file;
      this.props.allInputsAReHere();
    }  

    render () {
      let store = require('store');
        return(
          
            <>
            <h1>Upload your practice extracts</h1>
            <div>
            <p>The chunking task is intuitive and might take participants a few tries before their behaviour becomes consistent. In order not to contaminate the results, the segmentation behaviour during the practice extracts is not recorded. In this section, choose the number of practice extracts, and upload the following elements to the website: 
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
      <Label  for="uploadPracticeTranscripts" className="custom-file-upload">
      <span id="uploadPracticeTranscriptsSpan" className="fa fa-angle-double-up"></span>{' '}<span>{this.state.practiceTranscripts}</span>
      <Input id='uploadPracticeTranscripts' onChange={this.onLoad} style={{display:'none'}} type="file" name="uploadPracticeTranscripts" />
      </Label>{' '}
      <Label className="custom-file-upload" for="uploadPracticeAudio">
      <span id="uploadPracticeAudioSpan" className="fa fa-angle-double-up"></span>{' '}<span>{this.state.practiceAudio}</span>
      <Input id='uploadPracticeAudio' onChange={this.onLoadAudio} style={{display:'none'}} type="file" name="uploadPracticeAudio" />
      </Label>
    </FormGroup>
    <Button color='light' className="float-left"  onClick={() => {this.props.toggle(String(+this.props.active - 1))}}><span className="fa fa-angle-left"></span> Go back</Button>
    <Button color='light' className="float-right"  onClick={() => {this.props.toggle(String(+this.props.active + 1))}}>Next <span className="fa fa-angle-right"></span></Button>
    <div className='clearfix'></div>
  </>
  )
  }
}