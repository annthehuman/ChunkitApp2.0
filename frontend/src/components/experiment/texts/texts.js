import React, {Component} from 'react';
import CustomButton from '../../../common_components/button';
import { Link } from "react-router-dom";


export default class TextTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
        consentDontAgree: false
    }
    this.goodbye = this.goodbye.bind(this)
    }
    componentDidMount(){
        const input = this.props.textToTab
        const e = document.createElement('div');
        e.innerHTML = input;
        // console.log(e)
        const div = document.getElementById('htmlToText');
        // console.log(input)
        div.append(e)
        // console.log('active', this.props.link)
        // console.log(e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue)
        // return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
        }
    goodbye() {
        this.setState({consentDontAgree: true})
    }
    render() {
        return(
        <>  
        {this.state.consentDontAgree ?
            <>
            <h3>Goodbye!</h3>
            <p>
                See you next time!
            </p>
            </>
            :
            <>
            <h3>{this.props.header}</h3>
            <div id='htmlToText'>
            </div>
            {this.props.header=='Goodbye!' && this.props.link ?
            <a href={`${this.props.link}`}>
            <CustomButton size='small' theme="blue" text='Link back to Prolific'/>
            </a>:null}
             {this.props.nextPage && this.props.header=='Informed consent'?
             <>
            <CustomButton size='small' onClick={this.props.nextPage} name='NextExperimentPage' theme="blue" text='I agree'/>{'   '}
            <CustomButton size='small' onClick={this.goodbye} name='NextExperimentPage' theme="blue" text="I disagree"/>
            </>: <CustomButton size='small' onClick={this.props.nextPage} name='NextExperimentPage' theme="blue" text='Continue'/>}
            <div className='clearfix'></div>
            </>}
        </>
     )}
}