import React, {Component} from 'react';
import styled from 'styled-components';
import {  Input, FormGroup, Label, Button, CustomInput, Form } from 'reactstrap';
import CustomButton from '../../../../common_components/button';
import { TextField } from '@mui/material';


export default class TestImitation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            played: [],
            changed: []
        }
        this.sentences = ['sentence02.wav',
                    'sentence03.wav',
                    'sentence04.wav',
                    'sentence05.wav',
                    'sentence06.wav',
                    'sentence07.wav',
                    'sentence08.wav',
                    'sentence09.wav',
                    'sentence10.wav',
                    'sentence11.wav',
                    'sentence12.wav',
                    'sentence13.wav',
                    'sentence14.wav',
                    'sentence15.wav',
                    'sentence16.wav',
                    'sentence17.wav',
                    'sentence18.wav',
                    'sentence19.wav',
                    'sentence20.wav',
                    'sentence21.wav',
                    'sentence22.wav',
                    'sentence23.wav',
                    'sentence24.wav']
        this.startImitation = this.startImitation.bind(this)
        this.playAudio = this.playAudio.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.enableInput = this.enableInput.bind(this)
        this.handleChange = this.handleChange.bind(this)
        }
        handleChange(e) {
            if (!this.state.changed.includes(e.target.name.split('_')[2])){
            let newChanged = this.state.changed
                newChanged.push(e.target.name.split('_')[2])
                this.setState({changed: newChanged})}
        }
        enableInput(e) {
            const input = document.getElementById(`input_form_${e.target.id.split('_')[2]}`)
            input.disabled = false
            input.autoFocus = true
            input.classList.remove("Mui-disabled");
            input.parentElement.classList.remove("Mui-disabled");
        }
        startImitation() {
            const instruction = document.getElementById('sentence_instructions'),
                  practice_instruction = document.getElementById('sentence_01');
            instruction.style.display = 'none';
            practice_instruction.style.display = 'block'
        }
        playAudio(e) {
            if (e.target.name == 'play_practice') {
                const audio = document.getElementById('sentence_audio_01')
                audio.play()
                let newPlayed = this.state.played
                newPlayed.push(e.target.name)
                this.setState({played: newPlayed})
            } else {
                if (!this.state.played.includes(e.target.name)) {
                const audio = document.getElementById(`sentence_audio_${e.target.name}`)
                audio.play()
                let newPlayed = this.state.played
                newPlayed.push(e.target.name)
                this.setState({played: newPlayed})
            }
            }
        }
        componentDidMount(){
        }
        handleSubmit(e) {
            e.preventDefault();

            const sentenceNumber = e.target.id.split('_')[1],
                  form = e.currentTarget
            let nextSentenceNumber = null
            const k = +sentenceNumber + 1;
            if (k < 10) {
                
                nextSentenceNumber = '0' + k;
                if (nextSentenceNumber <= 24){
					document.getElementById("sentence_" + nextSentenceNumber).style.display = 'block';
					document.getElementById("sentence_" + sentenceNumber).style.display = 'none';
				} else {
                    this.props.toggle(String(+this.props.active + 1))
				}
            } else {
                nextSentenceNumber = k;
                if (nextSentenceNumber <= 24){
					document.getElementById("sentence_" + nextSentenceNumber).style.display = 'block';
					document.getElementById("sentence_" + sentenceNumber).style.display = 'none';
				} else {
                    this.props.toggle(String(+this.props.active + 1))
				}
            }

        }
        render() {
            let store = require('store');
            return(
            <>
                <div id='sentence_instructions' style={{display: 'block'}}>
                    <h2>Sentence repetition task</h2>
                    <p className='paragraph'>In&nbsp;this task, you will hear 24&nbsp;sentences in&nbsp;English. After listening, repeat the sentence exactly as&nbsp;you heard it&nbsp;by&nbsp;typing it&nbsp;in&nbsp;the space provided. The text box will activate when the sentence has stopped playing.</p>

                    <p className='paragraph'>Please listen carefully and repeat the sentences as&nbsp;accurately as&nbsp;you can. You will hear each sentence once only. If&nbsp;you don&rsquo;t remember some words, go&nbsp;with your best guess, or&nbsp;you can replace them with hyphens &quot;-&quot; or&nbsp;zeroes &quot;0&Prime;. Please note that you do&nbsp;not need to&nbsp;capitalize letters or&nbsp;insert punctuation marks (but you can if&nbsp;you want).</p>

                    <p className='paragraph'>The task starts with one practice sentence. Please use it&nbsp;to&nbsp;adjust your volume. You can replay the practice sentence if&nbsp;you want but not the subsequent sentences.</p>

                    <p className='paragraph'>Please do&nbsp;not refresh this page because unfortunately it&nbsp;means that you would have to&nbsp;start over.</p>
                <CustomButton size='small' onClick={this.startImitation} text='Proceed' theme='blue'/>
                </div>
                <audio preload="auto" id="sentence_audio_01"  style={{display: 'none'}} onEnded={this.enableInput}>
                    <source src="/static/media/sentence/sentence01.wav"/>
                </audio>
                <div id='sentence_01' style={{display: 'none'}}>
                    <h2>Practice sentence</h2>
                    <p className='paragraph'>Listen to&nbsp;the sentence and type it&nbsp;into the text box. Letter capitalization and punctuation marks do&nbsp;not matter.</p>

                    <p className='paragraph'>The task starts with one practice sentence. Please use it&nbsp;to&nbsp;adjust your volume. You can replay the practice sentence if&nbsp;you want but not the subsequent sentences.</p>
                    <CustomButton size='small' onClick={this.playAudio} name='play_practice' text='Play the sentence' theme='blue'/>
                    <br/>
                    <br/>
                    <form onSubmit={this.handleSubmit} method="post" id='form_01'  className="practice-form">
                    <TextField 
                    id="input_form_01"
                    name="input_form_01"
                    onChange={this.handleChange}
                    autoComplete="off"
                    disabled={true}
                    fullWidth
                    label="Insert sentence here after audio played"
                    />
                    <br/>
                    <br/>
                        <CustomButton size='small' type="submit" disabled={!this.state.played.includes('01') && !this.state.changed.includes('01')} onClick={this.playAudio} text='Next' theme='blue'/>
                    </form>
                </div>
                <>
                {this.sentences.map((item, index) => {
                        index = index + 2
                        if (index < 10) {
                            index = '0'+index
                        } else {
                            index = index.toString()
                        }
                        return(
                        <>
                        <audio preload="auto" id={`sentence_audio_${index}`}  style={{display: 'none'}} onEnded={this.enableInput}>
                            <source src={`/static/media/sentence/${item}`}/>
                        </audio>
                        <div id={`sentence_${index}`} style={{display: 'none'}}>
                            <h2>Sentence {+index-1}</h2>
                            <p className='paragraph'>Listen to&nbsp;the sentence and type it&nbsp;into the text box. Letter capitalization and punctuation marks do&nbsp;not matter.</p>
                            <CustomButton size='small' onClick={this.playAudio} name={index} text='Play the sentence' theme='blue'/>
                            <br/>
                            <br/>
                            <form onSubmit={this.handleSubmit} method="post" id={`form_${index}`}  className="practice-form">
                            <TextField 
                            id={`input_form_${index}`}
                            name={`input_form_${index}`}
                            onChange={this.handleChange}
                            autoComplete="off"
                            disabled={true}
                            fullWidth
                            label="Insert sentence here after audio played"
                            />
                            <br/>
                            <br/>
                            <CustomButton size='small' type="submit" disabled={!(this.state.played.includes(index) && this.state.changed.includes(index))} onClick={this.playAudio} text='Next' theme='blue'/>
                            </form>
                        </div>
                        </>)
                    })
                }
                </>
                
            </>
         )}
    }