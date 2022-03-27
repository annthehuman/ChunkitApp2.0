import React, {Component} from 'react';
import { FormGroup, Label, Button } from 'reactstrap';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


export default class Goodbye extends Component {
  constructor(props) {
      super(props);
      this.state = {
        isClicked: false,
        editorState: EditorState.createEmpty()
      }
      this.onEditorStateChange = this.onEditorStateChange.bind(this)
  }
  onEditorStateChange(editorState) {
    let store = require('store');
    this.setState({
      editorState,
    });
    this.props.appendForm('goodbyeEditor', draftToHtml(convertToRaw(editorState.getCurrentContent())))
    store.set('goodbyeEditor', draftToHtml(convertToRaw(editorState.getCurrentContent())))
  };
  componentDidMount() {
    let store = require('store');
    if (store.get('goodbyeEditor')){
      const blocksFromHTML = convertFromHTML(store.get('goodbyeEditor')),
            content = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
      this.setState({ editorState: store.get('goodbyeEditor') });
      (this.onEditorStateChange(EditorState.createWithContent(content)))
      }
  }
  render () {
    return(
      <>
      <h1>Goodbye</h1>
      <FormGroup>
      <Label for="goodbyeCastom" style={{marginBottom: '1rem'}}>Insert the goodbye message here. </Label> 
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
      <Button color='light' className="float-left"  onClick={() => {this.props.toggle(String(+this.props.active - 1))}}><span className="fa fa-angle-left"></span> Go back</Button>
      <div className='clearfix'></div>
      </>
    )
  }
}