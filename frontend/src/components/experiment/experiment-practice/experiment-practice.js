import React, {Component} from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";
import TextTab from '../texts';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import * as XLSX from 'xlsx';
import './experiment-practice.css'
// import TestExperimentComponent from '../test-experiment-component/test-experiment-component';


const ConstructorBlock = styled.div`
    @media (max-width: 1200px) {
        max-width: 80%;
    }
    @media (max-width: 1300px) {
        max-width: 70%;
    }
    margin: 30px auto;
    max-width: 50%;
`
export default class ExperimentPractice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            practiceFile: '',
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
            console.log(this.props.data)
            console.log(this.props.data.uploadPracticeTranscriptsData)
            console.log(this.props.data.audiosPractice)

            const tableParts = this.props.data.uploadPracticeTranscriptsData,
                  audios = this.props.data.audiosPractice;
            console.log('tableParts && audios', tableParts, audios)
            if (tableParts && audios){
            if (tableParts[0][0] == 'Audio Name') {
                tableParts.shift()}
            let tableaudios = []
            let zipaudios = []
                const tablelen = Object.keys(tableParts).length
                /////////TODO: if checked 1 три оставить, а остальные перемешать, то с trio, если без trio, перемешать все
                // const trio = [...Array(3).keys()];
                // let finalOrder = trio
                // if (tablelen > 2)
                let finalOrder = []
                for (var i = 0; i < tablelen; i++) {
                    finalOrder.push(i);
                }
                console.log('order',finalOrder)
                this.setState({dataIsHere: true,totalParts : tablelen, partsOrder: finalOrder})
                console.log('tableParts', tableParts)
                tableParts.forEach((row, id) => {
                        tableaudios.push(row[0])
                })
                tableaudios = new Set(tableaudios)
                console.log('tableParts', tableaudios)
                console.log('audios', audios)
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
                console.log('zipaudios', zipaudios)
                const zipaudiosSet = new Set(zipaudios)
                console.log('tableaudios, zipaudiosSet',tableaudios, zipaudiosSet)
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
                    console.log('tableParts',tableParts)
                    this.setState({tableParts: tableParts})
                        
                    // store.set('uploadPracticeTranscriptsData', this.state.tableParts))
                    }

                }
        }
        pause() {
            let audio = this.state.currentAudio;
            if (this.state.isPlaying) {
                audio.pause();
                this.setState({isPlaying: false})
                document.getElementById(`text_${this.state.partsOrder[this.state.partid]}`).style.display='none';
            }  else {
                audio.play();
                this.setState({isPlaying: true})
                document.getElementById(`text_${this.state.partsOrder[this.state.partid]}`).style.display='block';
            }
        }
        displayText() {
            const div = document.getElementById(`practice_${this.state.partsOrder[this.state.partid]}`);
            document.getElementById('instructions').style.display = 'none';
            div.style.display = 'block';
        }
        audioplay() {
            console.log(this)
            const currentAudioPath = `/media/Practice/${this.state.tableParts[this.state.partsOrder[this.state.partid]][0]}`,
                  div = document.getElementById(`practice_${this.state.partsOrder[this.state.partid]}`);
            console.log(currentAudioPath, div)
            let request = new XMLHttpRequest();
            request.open("GET", currentAudioPath, true);
            request.responseType = "blob"; 
            let currentAudio = document.createElement('audio');
            this.setState({currentAudio: currentAudio})
            currentAudio.addEventListener('ended', this.audioend);
            currentAudio.addEventListener('canplaythrough', this.displayText);
            request.onload = function() {
                console.log(this)
                if (this.status == 200) {
                // url = URL.createObjectURL(this.response);
                
                let sourceElement = document.createElement('source');
                currentAudio.setAttribute('hidden', true);
                currentAudio.appendChild(sourceElement);
                
                sourceElement.src = this.responseURL;
                sourceElement.type = 'audio/wav'
                currentAudio.load();
                currentAudio.play();
                
                // console.log(audio)
                // loadWatingHref.style.display = 'none';
                // load.style.display = 'block';
                
                // currentAudio.canplaythrough = () => {console.log('jjj')}
                // document.getElementById('instructions').style.display = 'none';
                // div.style.display = 'block';
            }
            };
            request.send();
            this.setState({isPlaying: true})
        }
        audioend(){
            console.log('ended', this)
            setTimeout(() => this.gofurther(), 1000);
        }
        gofurther() {
            const form = document.getElementById(`post-form_${this.state.partsOrder[this.state.partid]}`)
            const csrf = this.getCookie('csrftoken');
            const formData = new FormData(form);
            console.log(form)
            console.log(document.getElementById(`Experiment_popup_${this.state.partsOrder[this.state.partid]}`))
            
            console.log(`practice_${this.state.partsOrder[this.state.partid]}`)
            this.props.data.UseQuestions ? (
            document.getElementById(`popup_${this.state.partsOrder[this.state.partid]}`).style.display = "block",
            document.getElementById(`practice_${this.state.partsOrder[this.state.partid]}`).style.display = "none") :
            (this.instruction(),
            console.log('dddd'),
            formData.append("csrfmiddlewaretoken", csrf),
            formData.append('index', this.state.partid),
            console.log(...formData))
            // loadWatingHref.style.display = 'block';
            // load.style.display = 'none';
        }
        start() {
            
        }
        instruction(){
            console.log(this.state.partid, this.state.partsOrder[this.state.partid])
            const instruction = document.getElementById('instructions'),
                  div = document.getElementById(`practice_${this.state.partsOrder[this.state.partid]}`)
            this.state.partid+1 != this.state.totalParts ? (
            instruction.style.display = 'block',
            div.style.display = 'none',
            console.log(div.id),
            this.nextpart()) :
            this.props.nextPage()
            // this.nextpart()
        }
        nextpart() {
            console.log(this.state.partid + 1)
            this.setState({partid: this.state.partid + 1}, console.log(this.state.partid))
        }
        getanswer(e){
            console.log(e.target.value)
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
            console.log(e)
            const form = e.target;
            const formData = new FormData(form);
            
            document.getElementById(`popup_${this.state.partsOrder[this.state.partid]}`).style.display = 'none'
            this.instruction()
            console.log('t',e.target.id.split('_')[1])
            formData.append('question', this.state.answer);
            formData.append('index', e.target.id.split('_')[1]);
            const csrf = this.getCookie('csrftoken');
            formData.append("csrfmiddlewaretoken", csrf);
            console.log(...formData);
        }

        render() {
            const arr = this.state.tableParts;
            console.log('arr',arr)
            return(
            <> 
            <h3>Practice</h3>
            {(this.state.dataIsHere) ? ((this.state.audioTableEqual) ?
            <div>
                <h3 id='step'>Step {(this.state.partid == this.state.totalParts) ? this.state.totalParts : this.state.partid+1}/{this.state.totalParts}</h3>
                <div id='instructions' style={{display: 'block'}}>
                    <h3>Instructions</h3>
                    {(this.props.data.practiceInstructions) ? <div id='instructionsPracticeText' dangerouslySetInnerHTML={{__html: this.props.data.practiceInstructions}}>
                    </div> : <div>No instructions provided</div>}
                {/* <a href="#"  style='width: 44.08px; height: 22px; display: block'>Start</a> */}
                    <Button onClick={() => {console.log(this),this.audioplay()}} color="info">Start</Button>
                    <br/><br/>
                    <div className='clearfix'></div>
                </div>
            </div> : <p>Audio in zip and data in table are not equal</p>): <p>Where is no data to display</p>}
            {(this.state.dataIsHere) ? 
                (arr.map((object, i) => {
                return (<>

                    {/* <audio preload="none" className='pause' id={`Player_${i}`}  onEnded={() => this.audioend}>
                        <p type="audio/wav" value={object[0]}/>
                    </audio> */}
                    
                        <form onSubmit={this.onload} key={`post-form${i}`} id={`post-form_${i}`}>
                        <div key={`practice_${i}`} id={`practice_${i}`} style={{display: 'none'}}>
                        <Button color='light' onClick={() => {console.log('pause please'),this.pause()}} color="info">{(this.state.isPlaying)? 'Pause': 'Continue'}</Button>
                        <br/>
                        <span className='text' id={`text_${i}`} >
                                <p key={`textPractice${i}`} id={`textPractice${i}`}>
                                    {object[1].split(' ').map((word, id) => {
                                        if (id == object[1].split(' ').length - 1){return (word)}
                                        return(
                                        <span>{word}
                                        <input id={`${i}checkbox${id}`} style={{display: 'none'}} type="checkbox" name={`audio_${i}-checkbox_${id}`} value={`${id}`}></input>
                                        <label className="checkbox_label" for={`${i}checkbox${id}`}>
                                        <span>~</span><span>|</span>
                                        </label></span>
                                        )}
                                    )}
                                </p>
                        </span>
                        </div>
                        <div id={`popup_${i}`} style={{display: 'none'}}>
                                <p key={`questionPractice${i}`} id={`questionPractice${i}`}>{object[2]}</p>
                                <Button onClick={this.getanswer} color="info" type="submit" name={`send${i}`} value ={object[3]}>{object[3]}</Button>{'  '}
                                <Button onClick={this.getanswer} color="info" type="submit"  name={`send${i}`} value ={object[4]}>{object[4]}</Button>
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