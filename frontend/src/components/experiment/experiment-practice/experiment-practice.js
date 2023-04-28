import React, {Component} from 'react';
import styled from 'styled-components';
import './experiment-practice.css'
import CustomButton from '../../../common_components/button';
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

            const tableParts = this.props.data.uploadPracticeTranscriptsData,
                  audios = this.props.data.audiosPractice;
                  
            if (tableParts && audios){
            if (tableParts[0][0].toLowerCase().includes('audio')) {
                tableParts.shift()}
            let tableaudios = []
            let zipaudios = []
            const tablelen = Object.keys(tableParts).length

            let finalOrder = []
            for (var i = 0; i < tablelen; i++) {
                finalOrder.push(i);
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
            const currentAudioPath = `/static/media/Practice/${this.state.tableParts[this.state.partsOrder[this.state.partid]][0]}`,
                  div = document.getElementById(`practice_${this.state.partsOrder[this.state.partid]}`);

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
            this.props.data.UseQuestions ? (
            document.getElementById(`popup_${this.state.partsOrder[this.state.partid]}`).style.display = "block",
            document.getElementById(`practice_${this.state.partsOrder[this.state.partid]}`).style.display = "none") :
            this.instruction()
        }
        instruction(){
            const instruction = document.getElementById('instructions'),
                  div = document.getElementById(`practice_${this.state.partsOrder[this.state.partid]}`),
                  question = document.getElementById(`popup_${this.state.partsOrder[this.state.partid]}`)
            const block_to_none = this.props.data.UseQuestions ? question : div
            this.state.partid+1 != this.state.totalParts ? 
                (instruction.style.display = 'block',
                block_to_none.style.display = 'none',
                this.nextpart()) 
                :
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
            
            document.getElementById(`popup_${this.state.partsOrder[this.state.partid]}`).style.display = 'none'
            this.instruction()
            formData.append('question', this.state.answer);
            formData.append('index', e.target.id.split('_')[1]);
            const csrf = this.getCookie('csrftoken');
            formData.append("csrfmiddlewaretoken", csrf);
        }

        render() {
            const arr = this.state.tableParts;
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
                <CustomButton onClick={() => {this.audioplay()}} theme="blue" size='small' text='Start'/>
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
                    
                        <form  key={`post-form${i}`} id={`post-form_${i}`}>
                        <div key={`practice_${i}`} id={`practice_${i}`} style={{display: 'none'}}>
                        <CustomButton theme='blue' size='small' onClick={() => {this.pause()}} text={(this.state.isPlaying)? 'Pause': 'Continue'}/>
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
                                <CustomButton onClick={() => this.instruction()} theme="blue" size='small' name={`send${i}`} value ={object[3]} text={object[3]}/>{'  '}
                                <CustomButton onClick={() => this.instruction()} theme="blue" size='small' name={`send${i}`} value ={object[4]} text={object[4]}/>
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