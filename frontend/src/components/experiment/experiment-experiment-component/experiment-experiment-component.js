import React, {Component} from 'react';
import { Button } from 'reactstrap';
import CustomButton from '../../../common_components/button';
import './experiment-experiment.css'

export default class ExperimentExperimentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ExperimentFile: '',
            partid: 0,
            totalParts: 0,
            partsOrder: [],
            dataIsHere: false,
            audioTableEqual: false,
            tableParts: [],
            isPlaying: false,
            currentAudio: '',
            answer: '',
            instructions: ''
        };
        this.instruction = this.instruction.bind(this);
        this.pause = this.pause.bind(this);
        this.start = this.start.bind(this);
        this.audioend = this.audioend.bind(this);
        this.nextpart = this.nextpart.bind(this);
        this.shuffle = this.shuffle.bind(this);
        this.audioplay - this.audioplay.bind(this);
        this.gofurther - this.gofurther.bind(this);
        this.onload = this.onload.bind(this);
        this.getanswer = this.getanswer.bind(this);
        this.getCookie = this.getCookie.bind(this);
        this.displayText = this.displayText.bind(this)
        }
        shuffle(array) {
            array.sort(() => Math.random() - 0.5);
            return array
        }

        componentWillMount() {
            let store = require('store');
            const tableParts = this.props.data.uploadExperimentTranscriptsData,
                  audios = this.props.data.audiosExperement,
                  shuffle = this.props.data.shuffleExtracts;
            if (tableParts && audios){
            if (tableParts[0][0] == 'Audio Name' || tableParts[0][0] == 'Audio name') {
                tableParts.shift()}
            let tableaudios = []
            let zipaudios = []
            if (tableParts && audios) {
                const tablelen = Object.keys(tableParts).length
                let finalOrder = []
                if (shuffle) {
                let practice = [...Array(+this.props.data.shuffleExtractsPractice || 0).keys()]
                
                if (tablelen > this.props.data.shuffleExtractsPractice)
                {let order = []
                    for (var i = this.props.data.shuffleExtractsPractice; i < tablelen; i++) {
                        order.push(+i);
                    }
                    finalOrder =  practice.concat(this.shuffle(order))}
                } else {
                    for (var i = 0; i < tablelen; i++) {
                        finalOrder.push(i);
                    }
                }
                this.setState({dataIsHere: true,totalParts : tablelen, partsOrder: finalOrder})
                tableParts.forEach((row, id) => {
                        tableaudios.push(row[0])
                })
                tableaudios = new Set(tableaudios)
                audios.forEach(audio => {
                    let splitter = '\\'
                    if (audio.indexOf('/') > -1)
                    {
                      splitter = '/'
                    }
                    const s = audio.split(splitter),
                          p = s[s.length - 1].split("."),
                          b = p.slice(0, p.length-1);
                    zipaudios.push(b.join())})
                const zipaudiosSet = new Set(zipaudios)
                let areSetsEqual = (a, b) => a.size === b.size && [...a].every(value => b.has(value));
                if (areSetsEqual(tableaudios, zipaudiosSet)) { 
                    this.setState({audioTableEqual: true})
                    tableParts.forEach((row, id) => {
                            zipaudios.forEach((zipaudio, zipaudioId) => {
                                if (zipaudio == row[0]){
                                    tableParts[id][0] = audios[zipaudioId]
                                }
                            })
                    })
                    this.setState({tableParts: tableParts})
                    }
                }}
        }

        pause() {
            let audio = this.state.currentAudio;
            if (this.state.isPlaying) {
                audio.pause();
                this.setState({isPlaying: false})
                document.getElementById(`textExperiment_${this.state.partsOrder[this.state.partid]}`).style.display='none';
            }  else {
                audio.play();
                this.setState({isPlaying: true})
                document.getElementById(`textExperiment_${this.state.partsOrder[this.state.partid]}`).style.display='block';
            }
        }
        displayText() {
            const div = document.getElementById(`Experiment_${this.state.partsOrder[this.state.partid]}`);
            document.getElementById('instructions_experiment').style.display = 'none';
            div.style.display = 'block';
        }
        audioplay() {
            const currentAudioPath = `/static/media/Experement/${this.state.tableParts[this.state.partsOrder[this.state.partid]][0]}`,
                  div = document.getElementById(`Experiment_${this.state.partsOrder[this.state.partid]}`);
            let request = new XMLHttpRequest();
            request.open("GET", currentAudioPath, true);
            request.responseType = "blob"; 
            let currentAudio = document.createElement('audio');
            this.setState({currentAudio: currentAudio})
            currentAudio.addEventListener('ended', this.audioend);
            currentAudio.addEventListener('canplaythrough', this.displayText);
            request.onload = function() {
                if (this.status == 200) {
                
                let sourceElement = document.createElement('source');
                currentAudio.setAttribute('hidden', true);
                currentAudio.appendChild(sourceElement);
                
                sourceElement.src = this.responseURL;
                sourceElement.type = 'audio/wav'
                currentAudio.load();
                currentAudio.play();
            }
            };
            request.send();
            this.setState({isPlaying: true})
        }
        audioend(){
            setTimeout(() => this.gofurther(), 1000);
        }
        gofurther() {
            const form = document.getElementById(`Experiment_post-form_${this.state.partsOrder[this.state.partid]}`)
            const csrf = this.getCookie('csrftoken');
            const user = this.getCookie('user');
            if (!user) {
                this.props.nextPage()
            }
            const formData = new FormData(form);
            const prolific = this.getCookie('prolific')
            prolific ? formData.append('prolific', prolific) : null
            this.props.data.UseQuestions ?
            (document.getElementById(`Experiment_popup_${this.state.partsOrder[this.state.partid]}`).style.display = "block",
            document.getElementById(`Experiment_${this.state.partsOrder[this.state.partid]}`).style.display = "none"):
            (
            formData.append("csrfmiddlewaretoken", csrf),
            formData.append('index', this.state.partsOrder[this.state.partid]),
            this.instruction(),
            formData.append('experiment_name', this.props.data.nameExperementForParticipants),
            formData.append('session_key', user),
            fetch('/data/', {
                method: "POST",
                body: formData
                }).then(data => {
                if (!data.ok){
                    throw Error(data.status);
                }
                }).catch((data) => {
                console.log(`Try again! Error: ${Error(data.status)}`)
                }).finally(() => {
                form.reset();
                }))
        }
        start() {
            
        }
        instruction(){
            const instruction = document.getElementById('instructions_experiment'),
                  div = document.getElementById(`Experiment_${this.state.partsOrder[this.state.partid]}`),
                  question = document.getElementById(`Experiment_popup_${this.state.partsOrder[this.state.partid]}`);
            const block_to_none = this.props.data.UseQuestions ? question : div
            this.state.partid+1 != this.state.totalParts ? (
            instruction.style.display = 'block',
            block_to_none.style.display = 'none',
            this.nextpart()):
            this.props.nextPage()
        }
        nextpart() {
            this.setState({partid: this.state.partid + 1})
        }
        getanswer(e){
            this.setState({answer: e.target.value})
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
        onload(e) {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const user = this.getCookie('user');
            if (!user) {
                this.props.nextPage()
            }
            const csrf = this.getCookie('csrftoken');
            const prolific = this.getCookie('prolific')
            prolific ? formData.append('prolific', prolific) : null
            formData.append('question', this.state.answer);
            formData.append("csrfmiddlewaretoken", csrf);
            formData.append('index', this.state.partsOrder[this.state.partid])
            this.instruction()
            formData.append('experiment_name', this.props.data.nameExperementForParticipants)
            formData.append('session_key', user)
            fetch('/data/', {
                method: "POST",
                body: formData
                }).then(data => {
                if (!data.ok){
                    throw Error(data.status);
                }
                }).catch((data) => {
                console.log(`Try again! Error: ${Error(data.status)}`)
                }).finally(() => {
                form.reset();
                })
        }

        render() {
            const arr = this.state.tableParts;
            return(
            <> 
            {(this.state.dataIsHere) ? ((this.state.audioTableEqual) ?
            <div>
                <h2 id='step'>Step {(this.state.partid == this.state.totalParts) ? this.state.totalParts : this.state.partid+1}/{this.state.totalParts}</h2>
                <div id='instructions_experiment' style={{display: 'block'}}>
                    <h3>Instructions</h3>
                    {(this.props.data.experimentInstructions) ?<div id='instructionsExperimentText' dangerouslySetInnerHTML={{__html: this.props.data.experimentInstructions}}>
                    </div>:<div>No instructions provided</div>}
                    <CustomButton onClick={() => {this.audioplay()}} theme="blue" size='small' text='Start'/>
                    <br/><br/>
                    <div className='clearfix'></div>
                </div>
            </div> : <p>Audio in zip and data in table are not equal</p>): <p>Where is no data to display</p>}
            {(this.state.dataIsHere) ? 
                (arr.map((object, i) => {
                return (<>
                        <form onSubmit={this.onload} key={`Experiment_post-form${i}`} id={`Experiment_post-form_${i}`}>
                        <div key={`Experiment_${i}`} id={`Experiment_${i}`} style={{display: 'none'}}>
                        <CustomButton theme='blue' size='small' onClick={() => {this.pause()}} text={(this.state.isPlaying)? 'Pause': 'Continue'}/>
                        <br/>
                        <span className='text' id={`textExperiment_${i}`} >
                                <p key={`textExperiment${i}`} id={`textExperiment${i}`}>
                                    {object[1].split(' ').map((word, id) => {
                                        if (id == object[1].split(' ').length - 1){return (word)}
                                        return(
                                        <span>{word}
                                        <input id={`Experiment_${i}checkbox${id}`} style={{display: 'none'}} type="checkbox" name={`Experiment_audio_${i}-checkbox_${id}`} value={`${id}`}></input>
                                        <label className="checkbox_label" for={`Experiment_${i}checkbox${id}`}>
                                        <span>~</span><span>|</span>
                                        </label></span>
                                        )}
                                    )}
                                </p>
                        </span>
                        </div>
                        <div id={`Experiment_popup_${i}`} style={{display: 'none'}}>
                                <p key={`questionExperiment${i}`} id={`questionExperiment${i}`}>{object[2]}</p>
                                <CustomButton onClick={this.getanswer} theme="blue" size='small' type="submit" name={`send${i}`} value ={object[3]} text={object[3]}/>{'  '}
                                <CustomButton onClick={this.getanswer} theme="blue" size='small' type="submit"  name={`send${i}`} value ={object[4]} text={object[4]}/>
                                <br/><br/>
                        </div>
                        </form>

                    
                    </>)
            }))
            :
            null
            }
            </>
         )}
    }