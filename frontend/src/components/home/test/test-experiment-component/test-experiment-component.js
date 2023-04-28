import React, {Component} from 'react';
import { Button } from 'reactstrap';
import './test-experiment.css'
import CustomButton from '../../../../common_components/button';

export default class TestExperimentComponent extends Component {
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
        this.audioend = this.audioend.bind(this);
        this.nextpart = this.nextpart.bind(this);
        this.shuffle = this.shuffle.bind(this);
        this.audioplay - this.audioplay.bind(this);
        this.gofurther - this.gofurther.bind(this);
        this.onload = this.onload.bind(this);
        this.getanswer = this.getanswer.bind(this);
        this.getCookie = this.getCookie.bind(this);
        }
        shuffle(array) {
            array.sort(() => Math.random() - 0.5);
            return array
        }

        componentWillMount() {
            let store = require('store');
            const tableParts = store.get('uploadExperimentTranscriptsData'),
                  audios = store.get('audiosExperement'),
                  instructions = store.get('experimentInstructions'),
                  shuffle = store.get('shuffleExtracts');
            if (tableParts && audios){
            if (tableParts[0][0].toLowerCase().includes('audio')) {
                tableParts.shift()}
            let tableaudios = []
            let zipaudios = []
            if (tableParts && audios) {
                const tablelen = Object.keys(tableParts).length
                let finalOrder = []
                if (shuffle == 'on') {
                let practice = [...Array(+store.get('shuffleExtractsPractice') || 0).keys()]
                
                if (tablelen > store.get('shuffleExtractsPractice'))
                {let order = []
                    for (var i = store.get('shuffleExtractsPractice'); i < tablelen; i++) {
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
                    let audio_name = row[0]
                    if (audio_name.indexOf('.') > -1)
                    {
                        const p = audio_name.split("."),
                              b = p.slice(0, p.length-1);
                        audio_name = b.join()
                    }
                    tableaudios.push(audio_name)
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
                        
                    // store.set('uploadExperimentTranscriptsData', this.state.tableParts))
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
        audioplay() {
            const currentAudioPath = `/static/media/Experement/${this.state.tableParts[this.state.partsOrder[this.state.partid]][0]}`,
                  div = document.getElementById(`Experiment_${this.state.partsOrder[this.state.partid]}`);
            let request = new XMLHttpRequest();
            request.open("GET", currentAudioPath, true);
            request.responseType = "blob"; 
            let currentAudio = document.createElement('audio');
            this.setState({currentAudio: currentAudio})
            currentAudio.addEventListener('ended', this.audioend);
            request.onload = function() {
                if (this.status == 200) {
                // url = URL.createObjectURL(this.response);
                
                let sourceElement = document.createElement('source');
                currentAudio.setAttribute('hidden', true);
                currentAudio.appendChild(sourceElement);
                
                sourceElement.src = this.responseURL;
                sourceElement.type = 'audio/wav'
                currentAudio.load();
                currentAudio.play();
                
                document.getElementById('instructions_experiment').style.display = 'none';
                div.style.display = 'block';
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
            const formData = new FormData(form);
            let store = require('store');

            store.get('UseQuestions') ?
            (document.getElementById(`Experiment_popup_${this.state.partsOrder[this.state.partid]}`).style.display = "block",
            document.getElementById(`Experiment_${this.state.partsOrder[this.state.partid]}`).style.display = "none"):
            (this.instruction(),
            formData.append("csrfmiddlewaretoken", csrf),
            formData.append('index', this.state.partid))
        }
        instruction(){
            const instruction = document.getElementById('instructions_experiment'),
                  div = document.getElementById(`Experiment_${this.state.partsOrder[this.state.partid]}`)
            this.state.partid+1 != this.state.totalParts ? (
            instruction.style.display = 'block',
            div.style.display = 'none',
            this.nextpart()):
            this.props.toggle(String(+this.props.active + 1))
            // this.nextpart()
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
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
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
            
            document.getElementById(`Experiment_popup_${this.state.partsOrder[this.state.partid]}`).style.display = 'none'
            this.nextpart()
            this.instruction()
            formData.append('question', this.state.answer);
            formData.append('index', e.target.id.split('_')[1]);
            const csrf = this.getCookie('csrftoken');
            formData.append("csrfmiddlewaretoken", csrf);
        }

        render() {
            const arr = this.state.tableParts;
            let store = require('store')
            return(
            <> 
            {(this.state.dataIsHere) ? ((this.state.audioTableEqual) ?
            <div>
                <h3 id='step'>Step {(this.state.partid == this.state.totalParts) ? this.state.totalParts : this.state.partid+1}/{this.state.totalParts}</h3>
                <div id='instructions_experiment' style={{display: 'block'}}>
                    <h3>Instructions</h3>
                    {(store.get('experimentInstructions')) ?<div id='instructionsExperimentText' dangerouslySetInnerHTML={{__html: store.get('experimentInstructions')}}>
                    </div>:<div>No instructions provided</div>}
               
                    <CustomButton onClick={() => {this.audioplay()}} theme='blue' text='Start' size='small'/>
                    <br/><br/>
                    <div className='clearfix'></div>
                </div>
            </div> : <p>Audio in zip and data in table are not equal</p>): <p>Where is no data to display</p>}
            {(this.state.dataIsHere) ? 
                (arr.map((object, i) => {
                return (<>
                    
                        <form onSubmit={this.onload} key={`Experiment_post-form${i}`} id={`Experiment_post-form_${i}`}>
                        <div key={`Experiment_${i}`} id={`Experiment_${i}`} style={{display: 'none'}}>
                        <CustomButton onClick={() => {this.pause()}} theme='blue' text={(this.state.isPlaying)? 'Pause': 'Continue'} size='small'/>
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
                                <CustomButton onClick={this.getanswer} theme='blue' name={`send${i}`} value ={object[3]} type="submit"  text={object[3]} size='small'/>{'  '}
                                <CustomButton onClick={this.getanswer} theme='blue' name={`send${i}`} value ={object[4]} type="submit"  text={object[4]} size='small'/>
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