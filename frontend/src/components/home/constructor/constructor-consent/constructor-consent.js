import React, {Component}  from 'react';
import {  Input, FormGroup, Label, Form, Button } from 'reactstrap';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class Consent extends Component {
  constructor(props) {
      super(props);
      this.state = {
        isClicked: false,
        editorState: EditorState.createEmpty()
      }
      this.exampleClick = this.exampleClick.bind(this)
      this.onEditorStateChange = this.onEditorStateChange.bind(this)
  }

  
  componentDidMount() {
    let store = require('store');
    if (store.get('consentEditor')){
      const blocksFromHTML = convertFromHTML(store.get('consentEditor')),
            content = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
      this.setState({ editorState: store.get('consentEditor') });
      (this.onEditorStateChange(EditorState.createWithContent(content)))
      }
      if (store.get('consentClicked')){
      this.setState({ isClicked: store.get('consentClicked') }, function () {this.exampleClick(this.state.isClicked)});
    }
  }

  onEditorStateChange(editorState) {
    let store = require('store');
    this.setState({
      editorState,
    });
    this.props.appendForm('consentExample', draftToHtml(convertToRaw(editorState.getCurrentContent())))
    store.set('consentEditor', draftToHtml(convertToRaw(editorState.getCurrentContent())))
  };


  exampleClick(click){
    let store = require('store');
    const a = document.getElementById('consentCheck'),
          b = document.getElementById('consentExample'),
          c = document.getElementById('consentH6'),
          d = document.getElementById('checkboxConsent'),
          blocksFromHTML = convertFromHTML(b.innerHTML),
          content = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
    this.setState({isClicked: click}, function() {
      store.set('consentClicked', this.state.isClicked)
      this.state.isClicked ?
      (this.onEditorStateChange(EditorState.createWithContent(content)), d.innerText='To stop usting text sample uncheck the box', b.style.display = 'none', c.style.display = 'none', a.checked = true):
      (this.onEditorStateChange(EditorState.createEmpty()), d.innerText='To use this text sample check the box.', b.style.display = 'block', c.style.display = 'block', a.checked = false );
    })
  }

  render() {
    return(
      <>
      <h1>Write your informed consent page</h1>
      <FormGroup>
        <Label for="consentCustom" style={{marginBottom: '1rem'}}>Insert here the text of your informed consent</Label> 
        <br/>
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
      <FormGroup check>
        <Label check>
        <Input id='consentCheck' type="checkbox"  name='consentExample' onClick={(event) => {this.exampleClick(event.target.checked)}}/>{' '}
        <p id='checkboxConsent'>To use this text sample, check the box.</p>
        </Label>
      </FormGroup>
      <h6 id='consentH6'>Text sample:</h6>
      <div id='consentExample'>
      <p>This experimental session is part of the researchproject carried out at <strong>[insert your university name]</strong>.
      By agreeing, you certify your willingness to participate in the study and give us your consent to use the responses for research purposes (preprocessing, analysis, publication, archiving and sharing).
      All your responses will be recorded automatically. Your participation in the study will be completely anonymous.
      </p>

          
      <p>The duration of the experiment is approximately <strong>[insert amount of minutes]</strong> minutes with a possibility to take short breaks (2-3 minutes). 
      However, please make sure to complete the experiment within <strong>[insert amount of time]</strong>.</p>
      <p> If you exceed this time limit, you will not be compensated.</p>
      <p>Please make sure that you are closely following task instructions. If you are not, unfortunately, we will not be able to compensate for your time.</p>
      </div>
      
      <Button color='light' className="float-left"  onClick={() => {this.props.toggle(String(+this.props.active - 1))}}><span className="fa fa-angle-left"></span> Go back</Button>
      <Button color='light' className="float-right"  onClick={() => {this.props.toggle(String(+this.props.active + 1))}}>Next <span className="fa fa-angle-right"></span></Button>
      <div className='clearfix'></div>
      </>
    )
  }
}