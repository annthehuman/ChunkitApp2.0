import React, {Component} from 'react';
import styled from 'styled-components';
// import { Link } from "react-router-dom";
// import CustomButton from '../../common_components/button';
// import CustomHeader from '../../common_components/header';
// import { Stack } from '@mui/material';
// import Logo from '../../common_components/logo';
import { Grid } from '@mui/material';
import CustomHat from '../../../common_components/hat';
import {Typography} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



export default class Guide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: 'panel1'}
    this.handleChange = this.handleChange.bind(this)
}
  handleChange(panel) {
    console.log('panel', panel)
    this.setState({expanded: this.state.expanded == panel ? '' : panel});
  };

  render() {return(
    <>
<Grid container
    direction="column"
    alignItems="center">
<CustomHat/>

<Grid container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      sx={{width: '950px'}}>
  <div>
      <p>This project is distributed under CC-BY-NC-SA <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>license</a>.</p>
      <p><span style={{ fontWeight: 600 }}>Authors</span>: Alena Konina, Aleksandra Dobrego, Svetlana Vetchinnikova, Nina Mikušova, Anna Mauranen</p>
      <p><span style={{ fontWeight: 600 }}>Developer</span>: Anna Kupriianova</p>
      <Accordion expanded={this.state.expanded === 'panel1'} onChange={() => this.handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h5">Overview</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <p>
          ChunkitApp 2.0 is a web application for collecting and aggregating speech segmentation data. It is intended for use on tablets to ensure a smooth participant experience.
          </p>
          <p>
          <span style={{ fontWeight: 600 }}>The main function</span> of this app is to synchronise speech extracts and their transcripts and present them to experiment participants one by one.
          </p>
          <p>
          The transcripts are <span style={{ fontWeight: 600 }}>interactive</span>: there is a tilde symbol between every two words which participants can tap once to mark a segmentation boundary and twice to remove the marking. The transcript stays on the screen as long as the recording plays and disappears as soon as the recording pauses or stops.
          </p>
          <p>
          Apart from tracking segmentation behaviour, the app allows you to ask comprehension questions after each extract, randomise your audio extracts, collect background information and feedback, and test you participants’ English proficiency.
          </p>
          <Typography variant="h5">Demo</Typography>
          <Typography>
            <p>Here you can see a short demonstration of a sample experiment.
            <br/>
            The audio for the demo are public domain ans were downloaded from LibriVox.</p>
          </Typography>
          <Typography variant="h5">References</Typography>
          <p>
          The app was modelled after the original ChunkitApp used for collecting data in the <a href='https://www2.helsinki.fi/en/researchgroups/chunking-in-language'>CLUMP project</a>. Below you can a list of publications featuring data collected through the original app.
          </p>
          <p>
          Vetchinnikova, S., Konina, A., Williams, N., Mikušová, N., & Mauranen, A. (2022). Perceptual chunking of spontaneous speech: Validating a new method with non-native listeners. Research Methods in Applied Linguistics, 1(2), 100012.
          <br/>
          <a href='https://doi.org/10.1016/j.rmal.2022.100012'>https://doi.org/10.1016/j.rmal.2022.100012</a>
          </p>
          <p>
          Vetchinnikova, S., Mauranen, A. K., & Mikusova, N. (2017). ChunkitApp: Investigating the relevant units of online speech processing. In INTERSPEECH 2017 18th Annual Conference of the International Speech Communication Association.  
          <br/>
          <a href='https://doi.org/10.21437/Interspeech.2017'>https://doi.org/10.21437/Interspeech.2017</a>
          </p>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={this.state.expanded === 'panel2'} onChange={() => this.handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Demo</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <p>Here you can see a short demonstration of a sample experiment.</p>
            <p>The audio for the demo are public domain ans were downloaded from LibriVox.</p>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={this.state.expanded === 'panel3'} onChange={() => this.handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>References</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <p>
          The app was modelled after the original ChunkitApp used for collecting data in the <a href='https://www2.helsinki.fi/en/researchgroups/chunking-in-language'>CLUMP project</a>. Below you can a list of publications featuring data collected through the original app.
          </p>
          <p>
          Vetchinnikova, S., Konina, A., Williams, N., Mikušová, N., & Mauranen, A. (2022). Perceptual chunking of spontaneous speech: Validating a new method with non-native listeners. Research Methods in Applied Linguistics, 1(2), 100012.
          <br/>
          <a href='https://doi.org/10.1016/j.rmal.2022.100012'>https://doi.org/10.1016/j.rmal.2022.100012</a>
          </p>
          <p>
          Vetchinnikova, S., Mauranen, A. K., & Mikusova, N. (2017). ChunkitApp: Investigating the relevant units of online speech processing. In INTERSPEECH 2017 18th Annual Conference of the International Speech Communication Association.  
          <br/>
          <a href='https://doi.org/10.21437/Interspeech.2017'>https://doi.org/10.21437/Interspeech.2017</a>
          </p>
        </AccordionDetails>
      </Accordion>
    </div>
</Grid>
    </Grid>
    </>
  )}
}
