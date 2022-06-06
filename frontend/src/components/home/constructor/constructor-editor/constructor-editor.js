import React, {Component} from 'react';
import { Button } from 'reactstrap';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import CustomBox from '../../../../common_components/box';
import { Typography } from '@mui/material';
import { FormGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import CustomButton from '../../../../common_components/button';
import { Grid } from '@mui/material';
import { Popover } from '@mui/material';
import { withStyles } from '@mui/styles';
import CustomHeader from '../../../../common_components/header';

const useStyles = theme => ({
  root: { 
    "& .MuiPopover-paper": {
      borderRadius: '30px',
   },}
});

class EditorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isClicked: false,
          editorState: EditorState.createEmpty(),
          anchorEl: null,
        }
        this.exampleClick = this.exampleClick.bind(this);
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        // this.handleClose = this.handleClose(this);
    }
    componentDidMount() {
      let store = require('store');
      if (store.get(`${this.props.editorName}Editor`)){
        const blocksFromHTML = convertFromHTML(store.get(`${this.props.editorName}Editor`)),
              content = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
        this.setState({ editorState: store.get(`${this.props.editorName}Editor`) });
        (this.onEditorStateChange(EditorState.createWithContent(content)))
        // this.props.appendForm(`${this.props.editorName}Editor`, store.get(`${this.props.editorName}Editor`))
        }
        if (store.get(`${this.props.editorName}Clicked`)){
        this.setState({ isClicked: store.get(`${this.props.editorName}Clicked`) }, function () {this.exampleClick(this.state.isClicked)});
      }
    }

    onEditorStateChange(editorState) {
      let store = require('store');
      this.setState({
        editorState,
      });
      this.props.appendForm(`${this.props.editorName}Editor`, draftToHtml(convertToRaw(editorState.getCurrentContent())))
      store.set(`${this.props.editorName}Editor`, draftToHtml(convertToRaw(editorState.getCurrentContent())))
    };
  
    exampleClick(click){
      let store = require('store')
      const blocksFromHTML = convertFromHTML(this.props.textSample),
            content = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
      // console.log('click',click)
      this.setState({isClicked: click}, function() {
      store.set(`${this.props.editorName}Clicked`, this.state.isClicked)
      this.state.isClicked ?
      (this.onEditorStateChange(EditorState.createWithContent(content))):
      (this.onEditorStateChange(EditorState.createEmpty()));
      })
    }
    onValueChange(){

    }
    render () {
        const { classes } = this.props;
        let store = require('store');
        return(
            <>
              <CustomHeader text={this.props.header}/>
              <Grid container
                    direction='column'>
                    <Typography sx={{fontSize: '20px', marginTop: '10px'}}>{this.props.label}</Typography> 
                      <Editor
                        editorState={this.state.editorState}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        onEditorStateChange={this.onEditorStateChange}
                        wrapperStyle={{border: '1px  solid #ced4da', borderRadius: '0.25rem', marginTop: '10px'}}
                        editorStyle={{ margin: '0 1em 0 1em' }}
                      />
                    {this.props.textSample ? 
                    <FormGroup style={{marginTop: '10px'}}>
                    <Grid container
                    direction='row'
                    alignItems="center">
                      <FormControlLabel control={<Checkbox 
                                                    id={`useSample${this.props.editorName}Editor`} 
                                                    name={`useSample${this.props.editorName}Editor`} 
                                                    onClick={(event) => {this.exampleClick(event.target.checked)}}
                                                    checked={this.state.isClicked}
                                                    />}
                                        label={<Typography style={{fontSize: '20px'}}>Use sample</Typography>}
                                        />
                      <CustomButton onClick={(event) => this.setState({anchorEl: event.currentTarget})} text='i' theme='gray' size='icon' style={{marginBottom:'5px'}}/>
                      <Popover
                        className={classes.root}
                        id='popover'
                        open={Boolean(this.state.anchorEl)}
                        anchorEl={this.state.anchorEl}
                        onClose={() => this.setState({anchorEl: null})}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left'
                        }}
                      ><CustomBox theme='white' header='Text sample'>
                        <Typography sx={{fontSize: '20px'}} dangerouslySetInnerHTML={{__html: this.props.textSample}}></Typography>
                      </CustomBox>
                      </Popover>
                    </Grid>
                    </FormGroup>:null}
                    </Grid>
                
            </>
        )
        }
}

export default withStyles(useStyles)(EditorPage)
