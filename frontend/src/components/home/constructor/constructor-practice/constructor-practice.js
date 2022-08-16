import React, {Component} from 'react';
import {  Input, FormGroup, Label, Form, Button, Table  } from 'reactstrap';
import './constructor-practice.css';
import {ExcelRenderer } from 'react-excel-renderer';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import CustomBox from '../../../../common_components/box';
import { Typography } from '@mui/material';
import CustomButton from '../../../../common_components/button';
import { Popover } from '@mui/material';
import { withStyles } from '@mui/styles';
import CustomHeader from '../../../../common_components/header';
import { DataGrid } from '@mui/x-data-grid';
import { Stack } from '@mui/material';
import { Grid } from '@mui/material';

const useStyles = theme => ({
  root: { 
    "& .MuiPopover-paper": {
      borderRadius: '30px',
   },}
});

class Practice extends Component {
    constructor(props) {
        super(props);
        this.state = {
          columns: '',
          rows: '',
          columnsTable: [{field: 'id', hide: true},
          {field: 'audioName', headerName: 'Audio name', width: 171},
          {field: 'transcript', headerName: 'Transcript', width: 513}],
          rowsTable: [{id: '1', audioName: 'stim_001', transcript: 'The fault, dear Brutus, is not in our stars, but in ourselves.'},
          {id: '2', audioName: 'stim_014', transcript: 'My tongue will tell the anger of my heart, or else my heart concealing it will break.'},
          {id: '3', audioName: 'stim_145', transcript: "Though this be madness, yet there is method in't."} ],
          editorState: EditorState.createEmpty(),
          practiceTranscripts: "Upload transcripts table",
          practiceAudio: "Upload audio zip",
          anchorElAudio: null,
          anchorElInst: null,
          errorTable: false
        }
        this.onLoad = this.onLoad.bind(this)
        this.onLoadAudio = this.onLoadAudio.bind(this)
        this.onEditorStateChange = this.onEditorStateChange.bind(this)
        this.arrayEquals = this.arrayEquals.bind(this)
    }
    componentDidMount() {
      let store = require('store');
      if (store.get('practiceInstructions')){
        const blocksFromHTML = convertFromHTML(store.get('practiceInstructions')),
              content = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
        this.setState({ editorState: store.get('practiceInstructions') });
        (this.onEditorStateChange(EditorState.createWithContent(content)))
        }
      
      if (store.get('uploadPracticeTranscriptsData')){
      if (store.get('uploadPracticeTranscriptsData').length > 0){
        console.log("(store.get('uploadPracticeTranscriptsData')",(store.get('uploadPracticeTranscriptsData')))
        this.setState({practiceTranscripts: store.get('uploadPracticeTranscripts')})
      }
      if (store.get('audiosPractice')){
        if (store.get('audiosPractice').length > 0){
          console.log("store.get('audiosPractice'))",store.get('audiosPractice'))
          this.setState({practiceAudio: store.get('uploadPracticeAudio')})
        }}
      store.get('UseQuestions') ?
        this.setState({columnsTable: [{ field: 'id', hide: true },
        {field: 'audioName', headerName: 'Audio name', width: 80},
        {field: 'transcript', headerName: 'Transcript', width: 290},
        {field: 'question', headerName: 'Question', width: 145},
        {field: 'answer1', headerName: 'Answer1', width: 80},
        {field: 'answer2', headerName: 'Answer2', width: 80},
        {field: 'rightAnswer', headerName: 'Right answer', width: 80}],
        rowsTable: [{id: '1',audioName: 'stim_001', transcript: 'The fault, dear Brutus, is not in our stars, but in ourselves.',
      question: 'Is the fault in ourselves?', answer1: 'Yes', answer2: 'No', rightAnswer: 'Yes'},
        {id: '2',audioName: 'stim_014', transcript: 'My tongue will tell the anger of my heart, or else my heart concealing it will break.',
        question: 'Will my tongue tell the anger of my pancreas?', answer1: 'Yes', answer2: 'No', rightAnswer: 'No'},
        {id: '3',audioName: 'stim_145', transcript: "Though this be madness, yet there is method in't.",
        question: 'Is there method in this madness?', answer1: 'Yes', answer2: 'No', rightAnswer: 'No'} ]})
      :
        this.setState({columnsTable: [{ field: 'id',  hide: true },
        {field: 'audioName', headerName: 'Audio name', width: 150},
        {field: 'transcript', headerName: 'Transcript', width: 600}],
        rowsTable: [{id: '1',audioName: 'stim_001', transcript: 'The fault, dear Brutus, is not in our stars, but in ourselves.'},
        {id: '2',audioName: 'stim_014', transcript: 'My tongue will tell the anger of my heart, or else my heart concealing it will break.'},
        {id: '3',audioName: 'stim_145', transcript: "Though this be madness, yet there is method in't."} ]})
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
      console.log('onloadaudio')
      let file = e.target.value
      let store = require('store');
      file = file.replace(/\\/g, '/').split('/').pop();
      store.set('uploadPracticeAudio', file)
      this.props.appendForm('uploadPracticeAudio',e.target,'file')
      this.setState({practiceAudio: file})

      let label = document.getElementById('uploadPracticeAudio')
      let input = document.createElement('input')
      input.setAttribute('name', 'uploadPracticeAudio');
      input.onchange = this.onLoadAudio
      input.setAttribute('type', 'file');
      input.setAttribute('hidden', true);
      input.setAttribute('accept', '.zip')
      label.append(input)
    }
    arrayEquals(a, b) {
      return Array.isArray(a) &&
          Array.isArray(b) &&
          a.length === b.length &&
          a.every((val, index) => val === b[index]);
  }
    onLoad(e){
      let store = require('store');
      let fileFile = e.target.files[0]
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
            rows: realRows,
            errorTable: store.get('UseQuestions') ?
                        !this.arrayEquals(realRows[0], ['Audio name', 'Transcript', 'Question', 'Answer1', 'Answer2', 'Right answer']) :
                        !this.arrayEquals(realRows[0],['Audio name', 'Transcript'])
          }, function () {
            store.set('uploadPracticeTranscriptsData', this.state.rows)});
        }
      });
      ExcelRenderer(fileFile)
      let file = e.target.value
      file = file.replace(/\\/g, '/').split('/').pop();
      store.set('uploadPracticeTranscripts', file)
      this.setState({practiceTranscripts: file})
      
      this.props.appendForm('uploadPracticeTranscripts',e.target,'file')

      let label = document.getElementById('uploadPracticeTranscripts')
      let input = document.createElement('input')
      input.setAttribute('name', 'uploadPracticeTranscripts');
      input.onchange = this.onLoad
      input.setAttribute('type', 'file');
      input.setAttribute('hidden', true);
      input.setAttribute('accept', '.xlsx, .xls, .csv')
      label.append(input)
      // console.log('label',label.children,React.cloneElement(<input/>))
      
    }  

    render () {
      let store = require('store');
      const { classes } = this.props;
        return(
          <>
    <CustomHeader text='Upload your practice extracts'/>
    <div style={{paddingTop: '5px'}}>
    <p>Now the real fun is starting! You might want to give your participants time to get used to the task.
      Practice is not recorded. If you don't need it, you can skip this step.
      Fill in and format the instructions for your practice task.</p>
    <FormGroup>
    <CustomHeader text='Instruction for the task'/>
    <div style={{paddingTop: '5px', paddingBottom: '8px'}}>
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
    <Grid container
          direction='row'>
    <p>Upload a .zip archive with you practice extracts.</p>        
    <CustomButton onClick={(event) => this.setState({anchorElAudio: event.currentTarget})}
                  onMouseOver={(event) => this.setState({anchorElAudio: event.currentTarget})}
                  text='i' 
                  theme='gray' 
                  size='icon' 
                  style={{marginBottom:'5px'}}/>
    <Popover
      id='popover'
      className={classes.root}
      open={Boolean(this.state.anchorElAudio)}
      anchorEl={this.state.anchorElAudio}
      onClose={() => this.setState({anchorElAudio: null})}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
    ><CustomBox style={{paddingLeft: '10px', paddingRight: '10px'}}  theme='white'>
      <Typography sx={{fontSize: '20px'}}>You should choose the sound format according to the purpose of your experiment.
      The MP3 format is compact but slightly degrades the signal.
      Thus, it will take no time to buffer and is well suited for experiments that do not require acoustical precision.
      For those that do, it is possible to upload the audio in WAV format which preserves the high sound quality but might take a while to load.</Typography>
    </CustomBox>
    </Popover>
    </Grid>

    <CustomButton size='small' id='uploadPracticeAudio' text={this.state.practiceAudio} theme='green' component="label">
    <input
    name='uploadPracticeAudio' 
    type="file"
    onChange={this.onLoadAudio} 
    hidden
    accept=".zip" 
    /></CustomButton>
    <br/>
    <br/>
    </div>
    <p>Upload a table with the transcripts for your audio files. 
      It should be one .xlsx or .csv file formatted as in the example: 
      extract name in the first column, transcript text in the second column.
      The headers should be identical to the ones in the example. </p>
    <p>Practice extracts are not randomised, you need to upload them in the order of intended presentation. </p>
    <CustomHeader text='Example of transcripts in a table format'/>
      
    <div style={{backgroundColor: '#FFFFFF',height: '300px', width: '740px',paddingTop: '5px'}}>
    <DataGrid
        components={{
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              No experiment drafts yet
            </Stack>
          )}}
        rows={this.state.rowsTable}
        columns={this.state.columnsTable}
        pageSize={3}
        rowsPerPageOptions={[3]}
        disableSelectionOnClick
        sx={{
          '& .MuiDataGrid-columnHeaderTitle': {
              textOverflow: "clip",
              whiteSpace: "break-spaces",
              lineHeight: 1,
              fontSize: '14px',
              lineHeight: '19px',
          },
          '& .MuiDataGrid-iconSeparator': {
            display: 'none'
          },
          '& .MuiDataGrid-cell': {
            textOverflow: "clip",
            whiteSpace: "break-spaces",
            lineHeight: 1,
            fontSize: '14px',
            lineHeight: '19px'
          }
        }}
      />

    </div>
    <br/>
    <CustomButton size='small' 
                  id='uploadPracticeTranscripts' 
                  text={this.state.practiceTranscripts} 
                  theme='green' 
                  component="label"> 
    <input
    name='uploadPracticeTranscripts' 
    onChange={this.onLoad} 
    type="file"
    hidden
    accept=".xlsx, .xls, .csv"
    /></CustomButton>
    {this.state.errorTable ? <Typography sx={{color: '#D21502'}}>Table headers should be identical to the ones in the example.</Typography> : null}
</>
  )
  }
}

export default withStyles(useStyles)(Practice)