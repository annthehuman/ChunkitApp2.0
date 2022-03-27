import React, {Component} from 'react';
import styled from 'styled-components';
import {  Input, FormGroup, Label, Button, CustomInput, Form } from 'reactstrap';



export default class ExperimentImitation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            played: [],
            changed: []
        }
        this.sentences = ['sentence02.mp3',
                    'sentence03.mp3',
                    'sentence04.mp3',]
                    // 'sentence05.mp3',
                    // 'sentence06.mp3',
                    // 'sentence07.mp3',
                    // 'sentence08.mp3',
                    // 'sentence09.mp3',
                    // 'sentence10.mp3',
                    // 'sentence11.mp3',
                    // 'sentence12.mp3',
                    // 'sentence13.mp3',
                    // 'sentence14.mp3',
                    // 'sentence15.mp3',
                    // 'sentence16.mp3',
                    // 'sentence17.mp3',
                    // 'sentence18.mp3',
                    // 'sentence19.mp3',
                    // 'sentence20.mp3',
                    // 'sentence21.mp3',
                    // 'sentence22.mp3',
                    // 'sentence23.mp3',
                    // 'sentence24.mp3']
        this.startImitation = this.startImitation.bind(this)
        this.playAudio = this.playAudio.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.enableInput = this.enableInput.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.getCookie = this.getCookie.bind(this)
        }
        getCookie(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                let cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    let cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = cookie.substring(name.length + 1);
                        break;
                    }
                }
            }
            return cookieValue;
        }
        handleChange(e) {
            if (!this.state.changed.includes(e.target.id.split('_')[2])){
            let newChanged = this.state.changed
                newChanged.push(e.target.id.split('_')[2])
                console.log(newChanged)
                this.setState({changed: newChanged})}
            // this.setState({[event.target.name]: event.target.value});
        }
        enableInput(e) {
            const input = document.getElementById(`input_form_${e.target.id.split('_')[2]}`)
            input.readOnly = false
        }
        startImitation() {
            const instruction = document.getElementById('sentence_instructions'),
                  practice_instruction = document.getElementById('sentence_01');
            instruction.style.display = 'none';
            practice_instruction.style.display = 'block'
        }
        playAudio(e) {
            console.log('name', e.target.name, Array(this.state.played), typeof(this.state.played))
            if (e.target.name == 'play_practice') {
                const audio = document.getElementById('sentence_audio_01')
                audio.play()
                let newPlayed = this.state.played
                newPlayed.push(e.target.name)
                console.log(newPlayed)
                this.setState({played: newPlayed})
            } else {
                if (!this.state.played.includes(e.target.name)) {
                const audio = document.getElementById(`sentence_audio_${e.target.name}`)
                audio.play()
                let newPlayed = this.state.played
                newPlayed.push(e.target.name)
                console.log(newPlayed)
                this.setState({played: newPlayed})
                console.log(this.state.played)
            }
            }
        }
        componentDidMount(){
        }
        handleSubmit(e) {
            e.preventDefault();
            console.log(e.target.id, e.target.id.split('_')[1])

            const sentenceNumber = e.target.id.split('_')[1],
                  form = e.currentTarget
            const formData = new FormData(form);
            const user = this.getCookie('user');
            const prolific = this.getCookie('prolific')
            prolific ? formData.append('prolific', prolific) : null
            formData.append('session_key', user)
            formData.append('index', sentenceNumber);
            formData.append('experiment_name', this.props.data.nameExperementForParticipants)
            console.log(...formData)
            fetch('/text/', {
					method: "POST",
					// headers: {
					//   'X-CSRFToken': object.csrfmiddlewaretoken
					// },
					body: formData
				}).then(data => {
				   if (!data.ok){
					throw Error(data.status);
					// console.log(1)
				   }
			    }).catch((error) => {
                    console.log(error)
				}).finally(() => {
					form.reset();
				});
            let nextSentenceNumber = null
            const k = +sentenceNumber + 1;
            console.log(k)
            if (k < 10) {
                
                nextSentenceNumber = '0' + k;
                console.log(nextSentenceNumber)
                if (nextSentenceNumber <= '04'){
					document.getElementById("sentence_" + nextSentenceNumber).style.display = 'block';
					document.getElementById("sentence_" + sentenceNumber).style.display = 'none';
				} else {
                    this.props.nextPage()
				}
            } else {
                nextSentenceNumber = k;
                if (nextSentenceNumber <= '04'){
					document.getElementById("sentence_" + nextSentenceNumber).style.display = 'block';
					document.getElementById("sentence_" + sentenceNumber).style.display = 'none';
				} else {
                    this.props.nextPage()
				}
            }
			    console.log(nextSentenceNumber)

        }
        render() {
            console.log('test feedback instructions')
            return(
            <>
                <div id='sentence_instructions' style={{display: 'block'}}>
                    <h2>Sentence repetition task</h2>
                    <p className='paragraph'>In&nbsp;this task, you will hear 24&nbsp;sentences in&nbsp;English. After listening, repeat the sentence exactly as&nbsp;you heard it&nbsp;by&nbsp;typing it&nbsp;in&nbsp;the space provided. The text box will activate when the sentence has stopped playing.</p>

                    <p className='paragraph'>Please listen carefully and repeat the sentences as&nbsp;accurately as&nbsp;you can. You will hear each sentence once only. If&nbsp;you don&rsquo;t remember some words, go&nbsp;with your best guess, or&nbsp;you can replace them with hyphens &quot;-&quot; or&nbsp;zeroes &quot;0&Prime;. Please note that you do&nbsp;not need to&nbsp;capitalize letters or&nbsp;insert punctuation marks (but you can if&nbsp;you want).</p>

                    <p className='paragraph'>The task starts with one practice sentence. Please use it&nbsp;to&nbsp;adjust your volume. You can replay the practice sentence if&nbsp;you want but not the subsequent sentences.</p>

                    <p className='paragraph'>Please do&nbsp;not refresh this page because unfortunately it&nbsp;means that you would have to&nbsp;start over.</p>
                <Button type='button' color="primary" onClick={this.startImitation}>Proceed</Button>
                </div>
                <audio preload="auto" id="sentence_audio_01"  style={{display: 'none'}} onEnded={this.enableInput}>
                    <source src="/media/sentence/sentence01.mp3"/>
                </audio>
                <div id='sentence_01' style={{display: 'none'}}>
                    <h2>Practice sentence</h2>
                    <p className='paragraph'>Listen to&nbsp;the sentence and type it&nbsp;into the text box. Letter capitalization and punctuation marks do&nbsp;not matter.</p>

                    <p className='paragraph'>The task starts with one practice sentence. Please use it&nbsp;to&nbsp;adjust your volume. You can replay the practice sentence if&nbsp;you want but not the subsequent sentences.</p>
                    <Button type='button' onClick={this.playAudio} color="info" name='play_practice'>Play the sentence</Button>
                    <br/>
                    <br/>
                    <Form onSubmit={this.handleSubmit} method="post" id='form_01'  className="practice-form">
                    <Input
                    id="input_form_01"
                    name="text"
                    type="textarea"
                    readOnly={true}
                    // value={this.state.newPassword}
                    onChange={this.handleChange}
                    autoComplete="off"
                    />
                    <br/>
                        <Button type="submit" color="primary" className='submit'disabled={!this.state.played.includes('01') && !this.state.changed.includes('01')}>Next</Button>
                    </Form>
                </div>
                <>
                {this.sentences.map((item, index) => {
                        // console.log(index, item)
                        index = index + 2
                        if (index < 10) {
                            index = '0'+index
                        }
                        return(
                        <>
                        <audio preload="auto" id={`sentence_audio_${index}`}  style={{display: 'none'}} onEnded={this.enableInput}>
                            <source src={`/media/sentence/${item}`}/>
                        </audio>
                        <div id={`sentence_${index}`} style={{display: 'none'}}>
                            <h2>Sentence {+index-1}</h2>
                            <p className='paragraph'>Listen to&nbsp;the sentence and type it&nbsp;into the text box. Letter capitalization and punctuation marks do&nbsp;not matter.</p>

                            <Button type='button' color="info"  onClick={this.playAudio} name={index}>Play the sentence</Button>
                            <br/>
                            <br/>
                            <Form onSubmit={this.handleSubmit} method="post" id={`form_${index}`}  className="practice-form">
                            <Input
                            id={`input_form_${index}`}
                            name='text'
                            type="textarea"
                            readOnly
                            // value={this.state.newPassword}
                            onChange={this.handleChange}
                            autoComplete="off"
                            />
                            <br/>
                                <Button type="submit" color="primary"  className='submit' disabled={!(this.state.played.includes(index) && this.state.changed.includes(index))}>Next</Button>
                            </Form>
                        </div>
                        </>)
                    })
                }
                </>
            </>
         )}
    }