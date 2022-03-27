import React, {Component} from 'react';
import {  Input, FormGroup, Label, Button } from 'reactstrap';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class HelloPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isClicked: false,
          editorState: EditorState.createEmpty()
        }
        this.exampleClick = this.exampleClick.bind(this);
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
    }
    componentDidMount() {
      let store = require('store');
      if (store.get('helloEditor')){
        const blocksFromHTML = convertFromHTML(store.get('helloEditor')),
              content = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
        this.setState({ editorState: store.get('helloEditor') });
        (this.onEditorStateChange(EditorState.createWithContent(content)))
        }
        if (store.get('helloClicked')){
        this.setState({ isClicked: store.get('helloClicked') }, function () {this.exampleClick(this.state.isClicked)});
      }
    }

    onEditorStateChange(editorState) {
      let store = require('store');
      this.setState({
        editorState,
      });
      this.props.appendForm('helloEditor', draftToHtml(convertToRaw(editorState.getCurrentContent())))
      store.set('helloEditor', draftToHtml(convertToRaw(editorState.getCurrentContent())))
    };

    exampleClick(click){
      let store = require('store')
      const a = document.getElementById('helloCheck'),
            b = document.getElementById('helloExample'),
            c = document.getElementById('helloH6'),
            d = document.getElementById('helloCheckText'),
            blocksFromHTML = convertFromHTML(b.innerHTML),
            content = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
      console.log('click',click)
      this.setState({isClicked: click}, function() {
      store.set('helloClicked', this.state.isClicked)
      this.state.isClicked ?
      (this.onEditorStateChange(EditorState.createWithContent(content)), d.innerText='To stop usting text sample uncheck the box', b.style.display = 'none', c.style.display = 'none', a.checked = true):
      (this.onEditorStateChange(EditorState.createEmpty()), d.innerText='To use this text sample check the box.', b.style.display = 'block', c.style.display = 'block', a.checked = false );
      })
    }
    onValueChange(){

    }
    render () {
        return(
            <>
            <h1>Write your hello page</h1>
                <FormGroup>
                    <Label for="helloCustom" style={{marginBottom: '1rem'}}>Insert here the text that will greet your participants</Label> 
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
                    <Input id='helloCheck' type="checkbox"  name='helloExample' onClick={(event) => {this.exampleClick(event.target.checked)}}/>{' '}
                    <p id='helloCheckText'>To use this text sample, check the box.</p>
                    </Label>
                </FormGroup>
                <h6 id='helloH6'>Text sample:</h6>
                <p id='helloExample'>Please make sure that you have plugged in&nbsp;your headphones/earphones. It&nbsp;is&nbsp;vital that you complete the experiment while wearing them.</p>
                <Button color='light' className="float-left"  onClick={() => {this.props.toggle(String(+this.props.active - 1))}}><span className="fa fa-angle-left"></span> Go back</Button>
                <Button color='light' className="float-right"  onClick={() => {this.props.toggle(String(+this.props.active + 1))}}>Next <span className="fa fa-angle-right"></span></Button>
                <div className='clearfix'></div>
            </>
        )
        }
}