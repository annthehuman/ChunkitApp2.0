import React, {Component} from 'react';
import {  Input, Label, Button } from 'reactstrap';
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
import EditorPage from '../constructor-editor';

const useStyles = theme => ({
  root: { 
    "& .MuiPopover-paper": {
      borderRadius: '30px',
   },}
});

class HelloPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isClicked: false,
          editorState: EditorState.createEmpty(),
          anchorEl: null,
          textSample: 'Please make sure that you have plugged in your headphones/earphones. It is vital that you complete the experiment while wearing them.',
          label: 'Text that will greet your participants.'
        }
    }
    render () {
        const { classes } = this.props;
        let store = require('store');
        return(
            <>
            <EditorPage editorName='hello' header='Hello page' label='Text that will greet your participants.'
                        textSample='Please make sure that you have plugged in your headphones/earphones. It is vital that you complete the experiment while wearing them.'
                        toggle={this.props.toggle}
                        appendForm={this.props.appendForm} active={this.props.activeTab}/>
            
                <Button color='light' className="float-left"  onClick={() => {this.props.toggle(String(+this.props.active - 1))}}><span className="fa fa-angle-left"></span> Go back</Button>
                <Button color='light' className="float-right"  onClick={() => {this.props.toggle(String(+this.props.active + 1))}}>Next <span className="fa fa-angle-right"></span></Button>
                <div className='clearfix'></div>
            </>
        )
        }
}

export default withStyles(useStyles)(HelloPage)
