import React, {Component} from 'react';
import {  Input, FormGroup, Label,  Button } from 'reactstrap';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class Outline extends Component {
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
    if (store.get('outlineEditor')){
      const blocksFromHTML = convertFromHTML(store.get('outlineEditor')),
            content = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
      this.setState({ editorState: store.get('outlineEditor') });
      (this.onEditorStateChange(EditorState.createWithContent(content)))
      }
      if (store.get('outlineClicked')){
      this.setState({ isClicked: store.get('outlineClicked') }, function () {this.exampleClick(this.state.isClicked)});
    }
  }

  onEditorStateChange(editorState) {
    let store = require('store');
    this.setState({
      editorState,
    });
    this.props.appendForm('outlineEditor', draftToHtml(convertToRaw(editorState.getCurrentContent())))
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    store.set('outlineEditor', draftToHtml(convertToRaw(editorState.getCurrentContent())))
    
  };
  

  exampleClick(click){
    let store = require('store')
    const a = document.getElementById('outlineCheck'),
          b = document.getElementById('outlineExample'),
          c = document.getElementById('outlineH6'),
          d = document.getElementById('checkboxOutline'),
          blocksFromHTML = convertFromHTML(b.innerHTML),
          content = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
    this.setState({isClicked: click}, function() {
      store.set('outlineClicked', this.state.isClicked)
      this.state.isClicked ?
      (this.onEditorStateChange(EditorState.createWithContent(content)), d.innerText='To stop usting text sample uncheck the box', b.style.display = 'none', c.style.display = 'none', a.checked = true):
      (this.onEditorStateChange(EditorState.createEmpty()), d.innerText='To use this text sample check the box.', b.style.display = 'block', c.style.display = 'block', a.checked = false );
    })
  }

  render () {
    return(
      <>
      <h1>Write your session outline page</h1>
      <FormGroup>
          <Label for="outlineCastom" style={{marginBottom: '1rem'}}>Insert here the text that will detail the experimental procedure.</Label> 
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
          <Input id='outlineCheck' type="checkbox"  name='outlineExample' onClick={(event) => {this.exampleClick(event.target.checked)}}/>{' '}
          <p id='checkboxOutline'>To use this text sample, check the box.</p>
          </Label>
      </FormGroup>
      <h6 id='outlineH6'>Text sample:</h6>
      <div id='outlineExample'>
      <div>This experiment session consists of&nbsp;several tasks listed below. It&nbsp;is&nbsp;essential that you complete each of&nbsp;them. Once you finish one task, you will be&nbsp;automatically guided to&nbsp;the next one. The approximate duration of&nbsp;each task is&nbsp;mentioned in&nbsp;parentheses. The main task takes the longest. We&nbsp;recommend that during this task you take a&nbsp;short break.</div>
      <ul>
        <li>Background questionnaire (~ <strong>[insert amount of minutes]</strong> min.)</li>
        <li>Main task (~ <strong>[insert amount of minutes]</strong> min. plus breaks)</li>
        <li>Feedback questionnaire (~ <strong>[insert amount of minutes]</strong> min.)</li>
      </ul>
      <div>We kindly remind you to plug in your headphones.</div>
      </div>
      <br/>
      <Button color='light' className="float-left"  onClick={() => {this.props.toggle(String(+this.props.active - 1))}}><span className="fa fa-angle-left"></span> Go back</Button>
      <Button color='light' className="float-right"  onClick={() => {this.props.toggle(String(+this.props.active + 1))}}>Next <span className="fa fa-angle-right"></span></Button>
      <div className='clearfix'></div>
      </>
    )
  }
}