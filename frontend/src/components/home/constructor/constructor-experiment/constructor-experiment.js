import React, {Component} from 'react';
import {  Input, FormGroup, Label,Button, Table  } from 'reactstrap';
import {ExcelRenderer} from 'react-excel-renderer';
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

class Experiment extends Component {
    constructor(props) {
        super(props);
        this.state = {
          colsEx: '',
          rowsEx: '',
          columns: [{ field: 'id', headerName: '#', width: 55 },
          {field: 'audioName', headerName: 'Audio name', width: 171},
          {field: 'transcript', headerName: 'Transcript', width: 513}],
          rows: [{id: 1, audioName: 'stim_001', transcript: 'The fault, dear Brutus, is not in our stars, but in ourselves.'},
          {id: 2, audioName: 'stim_014', transcript: 'My tongue will tell the anger of my heart, or else my heart concealing it will break.'},
          {id: 3, audioName: 'stim_145', transcript: "Though this be madness, yet there is method in't."} ],
          editorState: EditorState.createEmpty(),
          anchorElAudio: null,
          anchorElInst: null,
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
    }
    store.get('UseQuestions') ?
    this.setState({columns: [{ field: 'id', headerName: '#', width: 2 },
    {field: 'audioName', headerName: 'Audio name', width: 80},
    {field: 'transcript', headerName: 'Transcript', width: 300},
    {field: 'question', headerName: 'Question', width: 145},
    {field: 'answer1', headerName: 'Answer1', width: 90},
    {field: 'answer2', headerName: 'Answer2', width: 90}],
    rows: [{id: 1, audioName: 'stim_001', transcript: 'The fault, dear Brutus, is not in our stars, but in ourselves.',
  question: 'Is the fault in ourselves?', answer1: 'Yes', answer2: 'No'},
    {id: 2, audioName: 'stim_014', transcript: 'My tongue will tell the anger of my heart, or else my heart concealing it will break.',
    question: 'Will my tongue tell the anger of my pancreas?', answer1: 'Yes', answer2: 'No'},
    {id: 3, audioName: 'stim_145', transcript: "Though this be madness, yet there is method in't.",
    question: 'Is there method in this madness?', answer1: 'Yes', answer2: 'No'} ]})
  :
    this.setState({columns: [{ field: 'id', headerName: '#', width: 55 },
    {field: 'audioName', headerName: 'Audio name', width: 150},
    {field: 'transcript', headerName: 'Transcript', width: 600}],
    rows: [{id: 1, audioName: 'stim_001', transcript: 'The fault, dear Brutus, is not in our stars, but in ourselves.'},
    {id: 2, audioName: 'stim_014', transcript: 'My tongue will tell the anger of my heart, or else my heart concealing it will break.'},
    {id: 3, audioName: 'stim_145', transcript: "Though this be madness, yet there is method in't."} ]})
    }
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
      let store = require('store');
      file = file.replace(/\\/g, '/').split('/').pop();
      store.set('uploadExperimentAudio', file)
      this.props.appendForm('uploadExperimentAudio',e.target,'file')
      this.setState({experimentAudio: file})

      let label = document.getElementById('uploadExperimentAudio')
      let input = document.createElement('input')
      input.setAttribute('name', 'uploadExperimentAudio');
      input.onchange = this.onLoadAudio
      input.setAttribute('type', 'file');
      input.setAttribute('hidden', true);
      input.setAttribute('accept', '.zip')
      label.append(input)
    }
    onLoad(e){
      let store = require('store');
      let fileFile = e.target.files[0]
      console.log('load file',e.target)
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
      store.set('uploadExperimentTranscripts', file)
      this.setState({experimentTranscripts: file})
      
      this.props.appendForm('uploadExperimentTranscripts',e.target,'file')

      let label = document.getElementById('uploadExperimentTranscripts')
      let input = document.createElement('input')
      input.setAttribute('name', 'uploadExperimentTranscripts');
      input.onchange = this.onLoad
      input.setAttribute('type', 'file');
      input.setAttribute('hidden', true);
      input.setAttribute('accept', '.xlsx, .xls, .csv')
      label.append(input)
    }  //TODO SAVE LOAD 

    render () {
      let store = require('store');
      const { classes } = this.props;
      return(
          <>
          <CustomHeader text='Upload your practice extracts'/>
            <div style={{paddingTop: '5px'}}>
            <p>The chunking task is intuitive and might take participants a few tries before their behaviour becomes consistent. In order not to contaminate the results, the segmentation behaviour during the practice extracts is not recorded. In this section, choose the number of practice extracts, and upload the following elements to the website: 
            </p>
            <ul>
              <li>Zip of audio extracts in any format.{'  '}            
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
              ><CustomBox style={{paddingLeft: '10px', paddingRight: '10px'}} theme='white'>
                <Typography sx={{fontSize: '20px'}}>You should choose the sound format according to the purpose of your experiment. The MP3 format is compact but slightly degrades the signal. Thus, it will take no time to buffer and is well suited for experiments that do not require acoustical precision. For those that do, it is possible to upload the audio in WAV format which preserves the high sound quality but might take a while to load.</Typography>
              </CustomBox>
              </Popover></li>
              
              <li>The instructions for the task.{'  '}            
              <CustomButton onClick={(event) => this.setState({anchorElInst: event.currentTarget})} 
                            onMouseOver={(event) => this.setState({anchorElInst: event.currentTarget})}
                            text='i' 
                            theme='gray' 
                            size='icon' 
                            style={{marginBottom:'5px'}}/>
              <Popover
                id='popover'
                className={classes.root}
                open={Boolean(this.state.anchorElInst)}
                anchorEl={this.state.anchorElInst}
                onClose={() => this.setState({anchorElInst: null})}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
              ><CustomBox style={{paddingLeft: '10px', paddingRight: '10px', width: '300px'}} theme='white'>
                <Typography sx={{fontSize: '20px'}}>What would you like your participants to do?</Typography>
              </CustomBox>
              </Popover></li>
              <li>Transcripts for the extracts in a table format according to the following below.</li>
            </ul>
            </div>
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
      <CustomHeader text='Example of transcripts in a table format'/>
      </FormGroup>
            <div style={{backgroundColor: '#FFFFFF',height: '300px', width: '740px',paddingTop: '5px'}}>
            <DataGrid
            components={{
              NoRowsOverlay: () => (
                <Stack height="100%" alignItems="center" justifyContent="center">
                  No experiment drafts yet
                </Stack>
              )}}
            rows={this.state.rows}
            columns={this.state.columns}
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
    <Grid container
          direction='row'
          gap='10px'>
    <CustomButton id='uploadExperimentTranscripts' size='small' text={this.state.experimentTranscripts} theme='green' component="label"> 
    <input
    type="file"
    hidden
    onChange={this.onLoad} 
    name='uploadExperimentTranscripts'
    accept=".xlsx, .xls, .csv"
    /></CustomButton>

    <CustomButton id='uploadExperimentAudio' size='small' text={this.state.experimentAudio} theme='green' component="label"> 
    <input
    name='uploadExperimentAudio' 
    type="file"
    onChange={this.onLoadAudio} 
    hidden
    accept=".zip" 
    /></CustomButton>
</Grid>

  
  </>
        )
        }
}

export default withStyles(useStyles)(Experiment)