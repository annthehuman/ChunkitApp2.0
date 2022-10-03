import React, {Component} from 'react';
import styled from 'styled-components';
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
      sx={{width: '850px'}}>
  <div>
      <p>This project is distributed under CC-BY-NC-SA <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>license</a>.</p>
      <p><span style={{ fontWeight: 700 }}>Authors</span>: Alena Konina, Aleksandra Dobrego, Svetlana Vetchinnikova, Nina Mikušova, Anna Mauranen</p>
      <p><span style={{ fontWeight: 700 }}>Developer</span>: Anna Kupriianova</p>
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
          <span style={{ fontWeight: 700 }}>The main function</span> of this app is to synchronise speech extracts and their transcripts and present them to experiment participants one by one.
          </p>
          <p>
          The transcripts are <span style={{ fontWeight: 700 }}>interactive</span>: there is a tilde symbol between every two words which participants can tap once to mark a segmentation boundary and twice to remove the marking. The transcript stays on the screen as long as the recording plays and disappears as soon as the recording pauses or stops.
          </p>
          <p>
          Apart from tracking segmentation behaviour, the app allows you to ask comprehension questions after each extract, randomise your audio extracts, collect background information and feedback, and test you participants’ English proficiency.
          </p>
          <Typography variant="h5">Demo</Typography>
          <Typography>
            <p><a href='https://www.loom.com/share/6f4883c7021a44638181c2b21090ba92'>Here</a> you can see a short demonstration of a sample experiment.
            <br/>
            The audio for the demo are public domain ans were downloaded from <a href='https://librivox.org/sonnets-by-william-shakespeare/'>LibriVox</a>.</p>
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
          <Typography variant="h5">Contact us</Typography>
          <Typography>
            <p>For any questions related to the app, please contact Alena Konina at <a href = "mailto: alena.konina@helsinki.fi">alena.konina@helsinki.fi</a></p>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={this.state.expanded === 'panel2'} onChange={() => this.handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="h5">Specifics</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography variant="h5">Registration and login</Typography>
          <Typography>
            <ol>
              <li>Upon your first visit to the website, you need to insert your email and come up with a password.</li>
              <li>You will receive a confirmation message to your email address with a link to activate your account.</li>
              <li>Click on the link to get the account activated and login to the app.</li>
              <li>The first page you see will be a screen divided into two sections: Design & Run and Fetch & Analyse.
              <img src="static/static/guide/1.png" alt="Design & Run and Fetch & Analyse" width="600"/>
              </li><br/>
              <li>Click on Design & Run to start.</li>
            </ol>
          </Typography>
          <Typography variant="h5">Design & Run</Typography>
          <Typography>
          <p><span style={{ fontWeight: 700 }}>Disclaimer</span>: As a researcher, you can design and test your experiments both on a tablet and from a computer, but participants are always advised to use a tablet.
          </p>
          <img src="static/static/guide/2.png" alt="Design & Run" width="600" style={{paddingLeft:'40px'}}/>
          <p>Clicking on Design & Run takes you to a currently empty list where your experiments will appear as soon as you create one. From this list, you can edit and run the experiments you created, as well as stop data collection or delete an experiment. A big plus button on the top left of the list allows you to create a new experiment.</p>
          <img src="static/static/guide/3.png" alt="Create a new experiment" width="600" style={{paddingLeft:'40px'}}/>
          </Typography>
          <Typography variant="h5">Create a new experiment</Typography>
          <Typography>
            <p>Clicking on the plus button takes you to a template where you can build you own design like a construction set.</p>
            <p>When you start designing a new experiment, you have three options of what to do with it.</p>
            <p>You can</p>
            <ol>
              <li><span style={{ fontWeight: 700 }}>Save Draft</span> and come back to it later. Does not require having all the fields filled in.</li>
              <li><span style={{ fontWeight: 700 }}>Test Run</span> it to check that everything is working as you want it to. It allows you to run a 
                mock experiment where you can check how it looks from the participant perspective. 
                To save your time, the pages with experiment sections are kept in place in 
                the upper part of the screen during the test run so you can skip to the parts
                you are interested in and finish the experiment quicker. The menu will not show 
                during an actual experiment.</li>
              <li><span style={{ fontWeight: 700 }}>Save Final Version</span> the experiment saves the experiment to the server and
                generates links for Prolific if needed. The experiment is then ready for
                distribution to participants.</li>
              <img src="static/static/guide/5.png" alt="Options" width="600" style={{paddingLeft:'40px'}}/>
            </ol>
            To complete the design, you need to go through a series of steps.
          </Typography>
          <Typography variant="h6">Basics</Typography>
          <img src="static/static/guide/4.png" alt="Basic" width="600" style={{paddingLeft:'40px'}}/>
          <br/>
          <ol>
          <p>Name</p>
              <li>Come up with a name for the experiment that you will use internally.</li>
              <li>Come up with a name for the experiment that will be displayed to participants.</li>
              <br/>
          <p>Build</p>
              <li>Check the box ‘Shuffle extracts’ if you want to randomise
                 audio extracts in this experiment. Include the number of extracts 
                 (can be set to 0) which will not be recorded and are used to accomodate
                 participants to the task.</li>
              <li>Check the box ‘Include comprehension questions after each extract’ 
                if you would like to ask your participants a question after each extract.</li>
              <li>Check the box    the experiment with Prolific’ 
                if you would like to collect data for the experiment on this particular platform.
                <p>If you check the box, two references will be generated. 
                  One that enables recording participant Prolific IDs:</p>
                  <img src="static/static/guide/6.png" alt="Prolific IDs" width="600"/>
                <p>And one for coming back from the app to Prolific once the experiment is completed:</p>
                  <img src="static/static/guide/7.png" alt="Prolific IDs" width="600"/>
                <p>The app can generate two participant-facing error messages:</p>
                <p><b>Oops Page 1. If the Prolific ID is not found.</b></p>
                <p>Something went wrong! We didn’t get your Prolific ID. Please try again.</p>
                <p><b>Oops Page 2. If the participant with this 
                  Prolific ID has already taken part in the experiment.</b></p>
                <p>Thank you for the interest in our research! Our data show 
                  that you have already taken part in this experiment. Unfortunately, 
                  you cannot repeat it. Look out for our new studies!</p>
                </li>
                <li>Check the boxes for the elements that you would like to include in your experiment:
                <ol type="a">
                  <li>‘Welcome to participants’ shows a greeting message to participants at the beginning of the experiment.</li>
                  <li>‘Informed consent’ informs the participants about the content of the epxeriment.</li>
                  <li>‘Outline’ details the experiment procedure.</li>
                  <li>‘Background questionnaire’ allows you to get more information on your participants.</li>
                  <li>‘Practice session’ lets participants get used to the experimental task.</li>
                  <li>‘Experimental task’ contains you main task.</li>
                  <li>‘Elicited Imitation Task (EIT)’ lets you check your participants’ 
                    English proficiency level through that task (more details in the 
                    corresponding block).</li>
                  <li>‘Feedback questionnaire’ allows you to conduct a postexperimental survey.</li>
                  <li>‘Goodbye message’ contains the closing words towards the participants.</li>
                </ol>
                </li>
                <li>Press ‘Next’ to go through each block in detail.</li>
          </ol>
          <Typography variant="h6">Hello page</Typography>
          <p>Fill in and format the text that will greet your participants when they open 
            the experiment. You can check the box to use a sample.</p>
          <Typography variant="h6">Consent page</Typography>
          <p>Fill in and format your version of the informed consent. You can check the 
            box to use a sample. The participants will see the buttons ‘I agree’ 
            which will allow them to proceed or ‘I disagree’ which will get them back 
            to the starting page.</p>
          <Typography variant="h6">Outline</Typography>
          <p>Fill in and format the text that will describe how your experiment is 
            supposed to go. You can check the box to use a sample.</p>
          <Typography variant="h6">Background</Typography>
          <p>Check the questions that you would like your participants to answer 
            before the experiment. If you need more information, you can add 
            custom questions that require either a yes/no answer or a freeform text answer.</p>
          <Typography variant="h6">Practice</Typography>
          <p>Now the real fun is starting! You might want to give your participants time to 
            get used to the task. Practice data is not recorded. If you don’t need it, 
            you can skip this step.</p>
          <ol>
            <li>Fill in and format the instructions for your practice task.</li>
            <li>Upload a .zip archive with you practice extracts.</li>
            <li>Upload a table with the transcripts for your audio files. It should be one 
              .xlsx or .csv file formatted as in the example: extract number in the first column, 
              transcript text in the second column, the question in the third, etc. 
              <b>The headers should be identical to the ones in the example.</b></li>
            <li>Practice extracts are not randomised, you need to upload them in 
              the order of intended presentation.</li>
          </ol>
          <Typography variant="h6">Main task</Typography>
          <ol>
            <li>Fill in and format the instructions for your main experimental task.</li>
            <li>Upload a .zip archive with the extracts for the main task.</li>
            <li>Upload a table with the transcripts for your audio files. 
              It should be one .xlsx or .csv file formatted as in the example: 
              extract number in the first column, transcript text in the second 
              column, the question in the third, etc. <b>The headers should be identical 
              to the ones in the example.</b></li>
            <li>Main task extracts will be randomised if you checked the corresponding 
              box in the Basics section. If you do not need them to be randomised, 
              you need to upload them in the order of intended presentation.</li>
          </ol>
          <Typography variant="h6">Feedback</Typography>
          <p>Check the questions that you would like your participants to answer 
            after the experiment. If you need more information, you can add custom 
            questions that require either a yes/no answer or a freeform text answer.</p>
          <Typography variant="h6">Goodbye</Typography>
          <p>Finally, fill in and format a goodbye message to your participants.</p>
          <Typography variant="h6">Elicited Imitation Task (EIT)</Typography>
          <p>Elicited Imitation task is a rather short and reliable measure of 
            L2 proficiency (see the following review: Kostromitina, M., & Plonsky, L. 
            (2022). Elicited imitation tasks as a measure of L2 proficiency: 
            A meta-analysis. Studies in Second Language Acquisition, 44, 886-911, 
            doi:10.107/S0272263121000395)</p>
          <p>If you checked the EIT box at the beginning, it will be implemented 
            automatically. We based this version of the test for English on the 
            original paper (Ortega, L., Iwashita, N., Norris, J. M., & Rabie, S. 
            (2002, October 3-6). An investigation of elicited imitation tasks in 
            crosslinguistic SLA research).</p>
          <p>During this task, participants listen to 24 consecutive sentences 
            in English and are asked to write them down as closely as possible 
            after they heard each one. The sentences are recorded with one make 
            speaker voice; they progressively increase in the number of words 
            and syntactic complexity.</p>
          <p>Before the task, participants see the following instructions:  
            <i> In this task, you will hear 24 sentences in English. After 
            listening, repeat the sentence exactly as you heard it by typing 
            it in the space provided. The text box will activate when the 
            sentence has stopped playing.</i></p>
          <p><i>Please listen carefully and repeat the sentences as accurately 
            as you can. You will hear each sentence once only. If you don't 
            remember some words, go with your best guess, or you can replace 
            them with hyphens "-" or zeroes "0". Please note that you do not 
            need to capitalize letters or insert punctuation marks 
            (but you can if you want).</i></p>
          <p><i>The task starts with one practice sentence. Please use it to 
            adjust your volume. You can replay the practice sentence if you 
            want but not the subsequent sentences.</i></p>
          <p><i>Please do not refresh this page because unfortunately it 
            means that you would have to start over.</i></p>
          <p>For the rest of the task, instructions are shortened for easier use:</p>
          <img src="static/static/guide/8.png" alt="EIT instructions" width="600" style={{paddingLeft:'40px'}}/>
          <Typography variant="h5">Run your experiments</Typography>
          <p>From this list, you run the experiments you created, 
            as well as stop data collection or delete an experiment. </p>
            <img src="static/static/guide/9.png" alt="List of experiments" width="600" style={{paddingLeft:'40px'}}/>
          <p>The <b>run</b> button generates a link for your experiment and 
            starts recording participant responses. 
            Your previous test runs results will be deleted.</p>
          <p>The <b>stop</b> button deactivates the link. When a participant 
            would click on a link to such an experiment, 
            a page appears saying "Data collection for this experiment has stopped."</p>
          <Typography variant="h5">Fetch & Analyse</Typography>
          <p>This part of the website is intended as a repository for collected
             data. It allows you to download raw data from the server, as well 
             as pre-process and aggregate collected data.</p>
          <img src="static/static/guide/10.png" alt="Fetch & Analyse" width="600" style={{paddingLeft:'40px'}}/>
          <p>When you click on ‘Fetch & Analyse’, you will see the list of your 
            experiments. Click on ‘Results’ to get access to them.</p>
          <img src="static/static/guide/11.png" alt="List of experiments" width="600" style={{paddingLeft:'40px'}}/>
          <p>Next to the ChunkitApp icon, you will see a menu containing different task results:</p>
          <ul>
            <li>Experiment results</li>
            <li>Background results</li>
            <li>Imitation results</li>
            <li>Feedback results</li>
          </ul>
          <Typography variant="h6">Experiment results</Typography>
          <p>This section contains all the results from the main chunking task.</p>
          <Typography variant="h7" style={{color:"#787878"}}>Raw chunking results</Typography>
          <p>Contains a raw import from the database.</p>
          <p><b>A table with columns: </b><br/>
          <i>session_key</i> - participant id<br/>
          <i>Prolific id</i> (if Prolific is integrated)<br/>
          <i>date</i> - date and time of when a participant started the experiment<br/>
          <i>index</i> - ordinal extract number starting with 0<br/>
          <i>checkbox</i> - the indices of boundaries that have been marked starting with 0<br/>
          <i>question</i> - comprehension question or statement<br/>
          <i>correct answer</i> - comprehension question answer<br/>
          <i>reply</i> - participant’s response to the comprehension question</p>
          <p>A row is one extract from one participant.</p>
          <Typography variant="h7" style={{color:"#787878"}}>Aggregated chunking data</Typography>
          <p><b>Columns:</b> participants (by Prolific ids or Experimental ids) 
              and the date and time they started the experiment</p>
          <p><b>Rows:</b> indices for all possible boundary places in the dataset 
              and transript tokens after which the boundaries can be placed (normally, 
              orthographic words). The index starts again at each new extract, creating 
              unique boundary names.</p>
          <p><b>Values:</b> 0 means the participant did not mark this boundary. 1 means 
          the participant marked a boundary after this token in the transcript.</p>
          <Typography variant="h7" style={{color:"#787878"}}>Permutation results</Typography>
          <p>A permutation test allows you to determine which boundaries are statistically 
            significant and which are not 
            (<a href='https://www.sciencedirect.com/science/article/pii/S277276612200009X?via%3Dihub'>
              Vetchinnikova et al., 2022</a>, section 4.6): “In sum, 
            the method determines statistical significance of boundary markings after each 
            word as well as allows us to distinguish between agreement on boundaries 
            (upper tail of the distribution) and agreement on non-boundaries (lower tail).” 
            That is, how many participants in your experimental setup have to agree on a 
            boundary so this behavior could not be attributed to error or chance?</p>
            <p>We use normally permutation tests with one million runs but you can 
              input your own number of permutations.</p>
            <p>The algorithm will provide you with a table.</p>
            <p><b>Columns:</b><br/>
            <i>columns with numbers</i> - these columns represent each participant in your 
            data, indexed starting with 1.<br/>
            <i>observed result</i> - number of participants that put a boundary in 
            each possible boundary location.<br/>
            <i>p-value for right tail</i> - the number of all permutation runs where 
            the permutation result for that very position was <b>higher</b> than the observed 
            result divided by the number of permutation runs.<br/>
            <i>p-value for left tail </i> - the number of all permutation runs where the 
            permutation result for that very position was <b>lower</b> than the observed result 
            divided by the number of permutation runs.<br/>
            <i>double lower p-value</i> - the lower result from the previous two that is then doubled.<br/>
            <i>Benjamini</i> -   a value showing which p-values have a false discovery rate below 
            0.05 (<a href='https://github.com/puolival/multipy'>Benjamini-Hochberg procedure</a>). 
            1 means this p-value is significant, 0 means it is not.<br/>
            <i>Final Number</i> - the threshold upwards of which we can consider the boundaries 
            to not be due to random behavior<br/></p>
            <p><b>Rows:</b><br/>
            all potential boundary places in a data set</p>
            <p>Permutations with a large number of runs can take up to several hours to run. 
              For your convenience, the app will send you an email with the results of the 
              test in .csv format.</p>
            <Typography variant="h6">Background results</Typography>
            <p>A table with columns: session key (participant id), Prolific id (if integrated),
               then all the questions as column heads.<br/>
               A row is one Prolific ID or one participant.</p>
            <Typography variant="h6">Imitation results</Typography>
            <Typography variant="h7" style={{color:"#787878"}}>Raw results</Typography>
            <p>A table with participant id as rows and correct sentences as column headers. 
                Cell values are the text that participants typed after listening to each sentence.</p>
            <Typography variant="h7" style={{color:"#787878"}}>Levenshtein distance</Typography>
            <p>In its original version, EIT was evaluated by linguists according to a scoring 
              table cited in Ortega, L., Iwashita, N., Rabie, S. and Norris, J.M. (1999): A 
              multilanguage comparison of measures of syntactic complexity. Honolulu, HI: 
              University of Hawai'i, National Foreign Language Resource Center. In our case, 
              given the number of participants, we were searching for some kind of automated 
              evaluation and settled on the so-called minimum edit distance, or Levenshtein 
              distance.</p>
            <p>Levenshtein distance is a string metric for measuring the difference between 
              two sequences. Informally, the Levenshtein distance between two words is the 
              minimum number of single-character edits (insertions, deletions or substitutions) 
              required to change one word into the other. In this case, we measure the distance 
              between the participant’s input for each sentence and its correct version. That 
              means that any word that the participant remembers helps them get a better score. </p>
            <p>All the scores are summed up; lower score means a better result. For easier 
              understanding, the score is counted as average per sentence. The best possible 
              total result is 0, the worst possible total result isn’t defined but in practice, 
              it will be somewhere around 65.</p>
            <Typography variant="h6">Feedback results</Typography>
            <p>A table with columns: session key (participant id), Prolific id (if integrated), 
              then all the questions as column heads.<br/>
              A row is one Prolific ID or one participant.
            </p>
        </AccordionDetails>
      </Accordion>
    </div>
</Grid>
    </Grid>
    </>
  )}
}
