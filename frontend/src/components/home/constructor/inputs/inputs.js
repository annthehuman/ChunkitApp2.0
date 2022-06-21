import React, { Component } from 'react';
import { Button, Label, Input, FormText, InputGroup } from 'reactstrap';
import CustomBox from '../../../../common_components/box';
import { TextField } from '@mui/material';
import { Grid } from '@mui/material';
import { FormGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import CustomButton from '../../../../common_components/button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from 'styled-components';
import { Popover } from '@mui/material';
import { withStyles } from '@mui/styles';
import CustomHeader from '../../../../common_components/header';

const useStyles = theme => ({
  root: { 
    "& .MuiPopover-paper": {
      borderRadius: '30px',
   },}
});

const StyledAccordion = styled(Accordion)(() => (
  {
  width: '650px'
}));

const StyledAccordionSummary = styled(AccordionSummary)(() => (
  {
  backgroundColor: '#F8F8F8'
}));


class Inputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValue: 0,
      useProlific: false,
      nameExperiment: '',
      shuffle: false,
      linkToProlific: '',
      accordionExpanded: false,
      anchorElShuffle: null,
      anchorElName: null,
      pagesOrder: {'Hello': 0, 'Consent': 1, 'Outline': 2, 'Background': 3, 'Practice': 4, 
                   'Experiment': 5, 'Imitation': 6, 'Feedback': 7, 'Goodbye': 8}
    }
    this.onCheck = this.onCheck.bind(this)
    this.onChange = this.onChange.bind(this)
    this.copyURL = this.copyURL.bind(this)
    this.onCheckPages = this.onCheckPages.bind(this)
  }
  componentDidMount() {
    let store = require('store');
    if (store.get('UseProlific')) {
      this.setState({ useProlific: store.get('UseProlific'), 
                      linkToProlific: `http://${window.location.hostname}/experiment/${store.get('nameExperementForParticipants')}`})
      document.getElementById('UseProlific').checked = store.get('UseProlific')
      // this.props.appendForm('UseProlific', store.get('UseProlific'))
    }
    if (store.get('nameExperement')) {
      document.getElementById('nameExperement').value = store.get('nameExperement')
      // this.props.appendForm('nameExperement', store.get('nameExperement'))
    }
    if (store.get('nameExperementForParticipants')) {
      document.getElementById('nameExperementForParticipants').value = store.get('nameExperementForParticipants')
      this.setState({ nameExperiment: store.get('nameExperementForParticipants') })
      // this.props.appendForm('nameExperementForParticipants', store.get('nameExperementForParticipants'))
    }
    if (store.get('shuffleExtracts')) {
      this.setState({ shuffle: store.get('shuffleExtracts') }, () => {
        if (this.state.shuffle && store.get('shuffleExtractsPractice')) {
          document.getElementById('shuffleExtractsPractice').value = store.get('shuffleExtractsPractice')
        }
      })
      document.getElementById('shuffleExtracts').checked = store.get('shuffleExtracts')
      // this.props.appendForm('shuffleExtracts', store.get('shuffleExtracts'))
      // this.props.appendForm('shuffleExtractsPractice', store.get('shuffleExtractsPractice'))
    }
    if (store.get('pagesNeeded')) {
      store.get('pagesNeeded').length > 0 ? this.setState({accordionExpanded: true}) : null
      store.get('pagesNeeded').forEach(item => {
        document.getElementById(`pageNeeded_${item}`).checked = true
        store.set(`pageNeeded_${item}`, true)
      })
      // this.props.appendForm('pagesNeeded', store.get('pagesNeeded'))
    }
    if (store.get('UseQuestions')){
      document.getElementById('UseQuestions').checked = store.get('UseQuestions')}
      // this.props.appendForm('UseQuestions', store.get('UseQuestions'))
  }

  onCheck(e) {
    let store = require('store')
    store.set(e.target.name, e.target.checked)
    console.log(e.target.name, e.target.checked)
    this.props.appendForm(e.target.name, e.target.checked)
  }
  onCheckPages(e){
    let store = require('store')
    
    let pagesNeeded = store.get('pagesNeeded')
    store.set(e.target.name, e.target.checked)
    // console.log('e', store.get('pagesNeeded'), (!Boolean(pagesNeeded)))
    //если никаких пейджес не отмечено
    if (!Boolean(pagesNeeded)) {
      store.set('pagesNeeded', [e.target.name.split('_')[1]])
      this.props.appendForm('pagesNeeded', [e.target.name.split('_')[1]])}
    //если пейджес отмечено
    else {
      if (e.target.checked) {
        console.log('e.target.checked', e.target.checked, pagesNeeded.indexOf(e.target.name.split('_')[1]))
        if (pagesNeeded.indexOf(e.target.name.split('_')[1]) == -1) {
        let newP = store.get('pagesNeeded').concat(e.target.name.split('_')[1]).sort((a, b) => {
          if (this.state.pagesOrder[a] > this.state.pagesOrder[b]) {
            return 1;
          }
          if (this.state.pagesOrder[a] < this.state.pagesOrder[b]) {
            return -1;
          }
          return 0;})
        store.set('pagesNeeded',newP)
        this.props.appendForm('pagesNeeded', newP)
        console.log('e.target.checked newP', newP)
        }
      } else {
        if (pagesNeeded.indexOf(e.target.name.split('_')[1]) != -1) {
          pagesNeeded.splice(pagesNeeded.indexOf(e.target.name.split('_')[1]), 1)
          store.set('pagesNeeded',pagesNeeded)
          this.props.appendForm('pagesNeeded', pagesNeeded)
          console.log('e.target.checked pagesNeeded.indexOf(e.target.name.split()[1]) != -1', pagesNeeded.indexOf(e.target.name.split('_')[1]) != -1)
        }
      }
    }
    //если никаких пейджес не отмечено
    // if (!Boolean(pagesNeeded)) {
    //   store.set('pagesNeeded', [e.target.name.split('_')[1]]), store.set(e.target.name, e.target.checked)
    //   this.props.appendForm('pagesNeeded', [e.target.name.split('_')[1]])}
    // //если пейджес отмечено
    // else {
    //   //добавляем отмеченное в список страниц в нужном порядке
    //   let newP = store.get('pagesNeeded').concat(e.target.name.split('_')[1]).sort((a, b) => {
    //     if (this.state.pagesOrder[a] > this.state.pagesOrder[b]) {
    //       return 1;
    //     }
    //     if (this.state.pagesOrder[a] < this.state.pagesOrder[b]) {
    //       return -1;
    //     }
    //     return 0;})
    // //если отмечено
    // e.target.checked ? 
    // //и если есть в списке, то не делаем ничего
    // pagesNeeded.indexOf(e.target.name.split('_')[1]) != -1 ? 
    // null :
    // //если нет в списке, то перезаписываем в сторе новым списком newP
    // (store.set('pagesNeeded', newP), store.set(e.target.name, e.target.checked), this.props.appendForm('pagesNeeded', newP)):
    // //если не отмечено, то удаляем из списка
    // (console.log('pagesNeeded.indexOf(e.target.name.split()[1])',pagesNeeded.indexOf(e.target.name.split('_')[1])),
    // pagesNeeded.indexOf(e.target.name.split('_')[1]) != -1 ?
    // null:
    // pagesNeeded.pop(pagesNeeded.indexOf(e.target.name.split('_')[1])),
    // store.set('pagesNeeded', pagesNeeded),
    // store.set(e.target.name, e.target.checked),
    // this.props.appendForm('pagesNeeded', pagesNeeded))}
    // this.props.appendForm('pagesNeeded', store.get('pagesNeeded').concat(e.target.name.split('_')[1]))
  }

  onChange(e) {
    let store = require('store')
    console.log('change' + e.target.name)
    store.set(e.target.name, e.target.value)
    e.target.name == 'nameExperementForParticipants' ?
      this.setState({ nameExperiment: e.target.value, 
        linkToProlific: `http://${window.location.hostname}/experiment/${e.target.value}`}) : null
    this.props.appendForm(e.target.name, e.target.value)
  }
  copyURL() {
    console.log('copied')
    const url = document.getElementById('urltoStudy');
    url.select();
    url.setSelectionRange(0, 99999); /* For mobile devices */
    
    navigator.clipboard.writeText(url.value);
  }
  render() {
    let store = require('store')
    const { classes } = this.props;
    return (
      <>
      <CustomHeader text='Basic information'/>
      <Grid container
            direction="column"
            justifyContent="flex-start">
      <Grid container
              justifyContent="flex-start"
              alignItems="center"
              mt={'15px'}
              mr={'62px'}
              >
        <TextField 
            name="nameExperement" 
            id="nameExperement" 
            sx={{ width:'300px', marginRight: '50px'}}
            label="Name of the experiment" 
            variant="outlined"
            onChange={this.onChange}
            type='text'
            required
            value={store.get('nameExperement') ? store.get('nameExperement') : ''}
            inputProps={{style: {fontSize: '20px'}}}
            />
        <TextField 
            name="nameExperementForParticipants" 
            id="nameExperementForParticipants" 
            sx={{ width:'300px' }}
            label="Public name of the experiment" 
            variant="outlined" 
            onChange={this.onChange}
            type='text'
            required
            inputProps={{style: {fontSize: '20px'}}}
            value={store.get('nameExperementForParticipants') ? store.get('nameExperementForParticipants') : ''}
            />{'   '}
            <CustomButton onClick={(event) => this.setState({anchorElName: event.currentTarget})} 
                                onMouseOver={(event) => this.setState({anchorElName: event.currentTarget})}
                                text='i' 
                                theme='gray' 
                                size='icon' 
                                style={{marginBottom:'5px', marginLeft: '10px'}}/>
                  <Popover
                    className={classes.root}
                    id='popover'
                    open={Boolean(this.state.anchorElName)}
                    anchorEl={this.state.anchorElName}
                    onClose={() => this.setState({anchorElName: null})}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left'
                    }}
                  ><CustomBox style={{paddingLeft: '10px', paddingRight: '10px'}} theme='white'>
                    <Typography sx={{fontSize: '20px'}}>You can let your participants see the name of the experiment as something innocent without giving away the actual purpose</Typography>
                  </CustomBox>
                  </Popover>
          </Grid>
        <FormGroup style={{marginTop: '15px'}}>
          <FormControlLabel control={<Checkbox 
                                        type='checkbox'
                                        id='shuffleExtracts' 
                                        name='shuffleExtracts'
                                        onClick={(e) => { this.onCheck(e); 
                                          this.state.shuffle ? 
                                          this.setState({ shuffle: false }) : 
                                          this.setState({ shuffle: true }) }}
                                        checked={store.get('shuffleExtracts')?store.get('shuffleExtracts'):''}
                                        />} 
                            label={<Typography style={{fontSize: '20px'}}>Shuffle extracts</Typography>} />
          {this.state.shuffle ?
              <Grid container
              justifyContent="flex-start"
              alignItems="center"
              direction='row'>
                <TextField 
                  name="shuffleExtractsPractice" 
                  id="shuffleExtractsPractice" 
                  sx={{ width:'300px' }}
                  label="Number of practice extracts" 
                  variant="outlined" 
                  onChange={this.onChange}
                  type='text'
                  required
                  inputProps={{style: {fontSize: '20px'}}}
                  />
                  <CustomButton onClick={(event) => this.setState({anchorElShuffle: event.currentTarget})} 
                                onMouseOver={(event) => this.setState({anchorElShuffle: event.currentTarget})}
                                text='i' 
                                theme='gray' 
                                size='icon' 
                                style={{marginBottom:'5px', marginLeft: '10px'}}/>
                  <Popover
                    className={classes.root}
                    id='popover'
                    open={Boolean(this.state.anchorElShuffle)}
                    anchorEl={this.state.anchorElShuffle}
                    onClose={() => this.setState({anchorElShuffle: null})}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left'
                    }}
                  ><CustomBox style={{paddingLeft: '10px', paddingRight: '10px'}} theme='white'>
                    <Typography sx={{fontSize: '20px'}}>If you want to present the extracts in random order, you need to indicate how many extracts will be kept in practice. Practice extracts are just played, the data for them is not recorded.</Typography>
                  </CustomBox>
                  </Popover>
              </Grid> :
              null
            }
        <FormControlLabel control={<Checkbox 
                            type='checkbox'
                            id='UseQuestions' 
                            name='UseQuestions'
                            onClick={(e) => this.onCheck(e)}
                            checked={store.get('UseQuestions')}
                            />} 
                label={<Typography style={{fontSize: '20px'}}>Include comprehension questions after each extract
                </Typography>} />
        <Grid container
              justifyContent="flex-start"
              alignItems="center"
              direction='row'>
        <FormControlLabel control={<Checkbox 
                            type='checkbox'
                            id='UseProlific' 
                            name='UseProlific'
                            onClick={(e) => { this.onCheck(e); 
                              this.state.useProlific ? 
                              this.setState({ useProlific: false, linkToProlific: '' }) : 
                              this.setState({ useProlific: true, linkToProlific: `http://${window.location.hostname}/experiment/${this.state.nameExperiment}`  })}}
                            checked={store.get('UseProlific')}
                            />} 
                label={<Typography style={{fontSize: '20px'}}>Integrate the experiment with Prolific</Typography>} />
        <CustomButton onClick={(event) => this.setState({anchorElProlific: event.currentTarget})} 
                                onMouseOver={(event) => this.setState({anchorElProlific: event.currentTarget})}
                                text='i' 
                                theme='gray' 
                                size='icon' 
                                style={{marginBottom:'9px'}}/>
        <Popover
          className={classes.root}
          id='popover'
          open={Boolean(this.state.anchorElProlific)}
          anchorEl={this.state.anchorElProlific}
          onClose={() => this.setState({anchorElProlific: null})}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        ><CustomBox style={{paddingLeft: '10px', paddingRight: '10px'}} theme='white'>
          <Typography sx={{fontSize: '20px'}}>If you want, you can host this study on Prolific for easier data collection. <a href='https://researcher-help.prolific.co/hc/en-gb/articles/360009220993' target="_blank">More info here</a></Typography>
        </CustomBox>
        </Popover>
        </Grid>
        {this.state.useProlific ?
              <>
              <Grid container
                    direction='row'
                    alignItems="center">
              <TextField 
                  name="urltoStudy" 
                  id="urltoStudy" 
                  sx={{ width:'300px', marginRight: '13px'}}
                  label="URL of your study"
                  value={this.state.nameExperiment ? this.state.linkToProlific: ''}
                  InputProps={{
                    readOnly: true,
                  }}
                  type='text'
                  inputProps={{style: {fontSize: '20px'}}}
                  />
                <CustomButton id='copyButton' theme='white' size='icon' onClick={this.copyURL} text={<ContentCopyIcon/>}/>
                <TextField 
                  sx={{ width:'300px', marginLeft: '13px'}}
                  label="Link back to Prolific"
                  name='linkToProlific'
                  onChange={this.onChange}
                  type='text'
                  id="linkToProlific"
                  inputProps={{style: {fontSize: '20px'}}}
                  value={store.get('linkToProlific') ? store.get('linkToProlific') : ''}
                  />
                </Grid>
                <br/>
              </> :
              null
            }
        </FormGroup>

        <Accordion
          style={{width: '650px'}}
          expanded={this.state.accordionExpanded}
          onChange={() => {console.log('expanded changed', !this.state.accordionExpanded),this.setState({accordionExpanded: !this.state.accordionExpanded})}}
          >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{backgroundColor: '#F8F8F8'}}
        >
          <Typography style={{fontSize: '20px'}}>What would you like to include in your experiment? Check here.</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <FormControlLabel control={<Checkbox 
                            type='checkbox'
                            id='pageNeeded_Hello' 
                            name='pageNeeded_Hello'
                            onClick={(e) => {this.onCheckPages(e); this.props.allInputsAReHere();}}
                            checked={Boolean(store.get('pageNeeded_Hello'))}
                            />} 
                label={<Typography style={{fontSize: '20px'}}>Welcome to participants</Typography>} />
        <FormControlLabel control={<Checkbox 
                    type='checkbox'
                    id='pageNeeded_Consent' 
                    name='pageNeeded_Consent'
                    onClick={(e) => {this.onCheckPages(e); this.props.allInputsAReHere();}}
                    checked={Boolean(store.get('pageNeeded_Consent'))}
                    />} 
                 label={<Typography style={{fontSize: '20px'}}>Informed consent</Typography>} />
        <FormControlLabel control={<Checkbox 
                            type='checkbox'
                            id='pageNeeded_Outline' 
                            name='pageNeeded_Outline'
                            onClick={(e) => {this.onCheckPages(e); this.props.allInputsAReHere();}}
                            checked={Boolean(store.get('pageNeeded_Outline'))}
                            />} 
                label={<Typography style={{fontSize: '20px'}}>Outline for the experiment</Typography>} />
        <FormControlLabel control={<Checkbox 
                    type='checkbox'
                    id='pageNeeded_Background' 
                    name='pageNeeded_Background'
                    onClick={(e) => {this.onCheckPages(e); this.props.allInputsAReHere();}}
                    checked={Boolean(store.get('pageNeeded_Background'))}
                    />} 
                 label={<Typography style={{fontSize: '20px'}}>Background questionnaire</Typography>}/>
        <FormControlLabel control={<Checkbox 
                            type='checkbox'
                            id='pageNeeded_Practice' 
                            name='pageNeeded_Practice'
                            onClick={(e) => {this.onCheckPages(e); this.props.allInputsAReHere();}}
                            checked={Boolean(store.get('pageNeeded_Practice'))}
                            />} 
                label={<Typography style={{fontSize: '20px'}}>Practice session</Typography>} />
        <FormControlLabel control={<Checkbox 
                    type='checkbox'
                    id='pageNeeded_Experiment' 
                    name='pageNeeded_Experiment'
                    onClick={(e) => {this.onCheckPages(e); this.props.allInputsAReHere();}}
                    checked={Boolean(store.get('pageNeeded_Experiment'))}
                    />} 
                 label={<Typography style={{fontSize: '20px'}}>Experimental task</Typography>} />
        <FormControlLabel control={<Checkbox 
                            type='checkbox'
                            id='pageNeeded_Imitation' 
                            name='pageNeeded_Imitation'
                            onClick={(e) => {this.onCheckPages(e); this.props.allInputsAReHere();}}
                            checked={Boolean(store.get('pageNeeded_Imitation'))}
                            />} 
                label={<Typography style={{fontSize: '20px'}}>Elicited imitation task (EIT)</Typography>} />
        <FormControlLabel control={<Checkbox 
                    type='checkbox'
                    id='pageNeeded_Feedback' 
                    name='pageNeeded_Feedback'
                    onClick={(e) => {this.onCheckPages(e); this.props.allInputsAReHere();}}
                    checked={Boolean(store.get('pageNeeded_Feedback'))}
                    />} 
                 label={<Typography style={{fontSize: '20px'}}>Feedback questionnaire</Typography>} />
        <FormControlLabel control={<Checkbox 
                    type='checkbox'
                    id='pageNeeded_Goodbye' 
                    name='pageNeeded_Goodbye'
                    onClick={(e) => {this.onCheckPages(e); this.props.allInputsAReHere();}}
                    checked={Boolean(store.get('pageNeeded_Goodbye'))}
                    />} 
                 label={<Typography style={{fontSize: '20px'}}>Goodbye page</Typography>} />
        </AccordionDetails>
      </Accordion>

        </Grid>
      </>
    )
  }
}
export default withStyles(useStyles)(Inputs)