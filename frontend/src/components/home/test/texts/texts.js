import React, {Component} from 'react';
import { Button } from 'reactstrap';
import CustomButton from '../../../../common_components/button';
import { Link } from 'react-router-dom';

export default class TextTab extends Component {
  constructor(props) {
    super(props);
    }
    componentDidMount(){
        const input = this.props.textToTab
        const e = document.createElement('div');
        e.innerHTML = input;
        const div = document.getElementById('htmlToText');
        div.append(e)
        }
    render() {
        let store = require('store');
        return(
        <>  <h3>{this.props.header}</h3>
            <div id='htmlToText'>
            </div>
            <br/>
            {this.props.header=='Goodbye' && Boolean(store.get('linkToProlific'))?
            <a href={`${store.get('linkToProlific')}`}>
            <CustomButton size='small' text='Link back to Prolific'/>
            </a>:
            this.props.header=='Informed consent' ?
            <>
           <CustomButton size='small' onClick={this.props.nextPage} name='NextExperimentPage' theme="blue" text='I agree'/>{'   '}
           <CustomButton size='small' onClick={this.goodbye} name='NextExperimentPage' theme="blue" text="I disagree"/>
           </>
            :null}
            <div className='clearfix'></div>
        </>
     )}
}