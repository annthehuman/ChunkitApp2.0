import React, {Component} from 'react';
import { Button } from 'reactstrap';
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
            {this.props.header=='Goodbye'?
            <a href={`${store.get('linkToProlific')}`}>
            <Button color="success">Link back to Prolific</Button>
            </a>:null}
            <div className='clearfix'></div>
            <Button color='light' className="float-left"  onClick={() => {(String(+this.props.active - 1) == 0) ? style={display:'none'} : this.props.toggle(String(+this.props.active - 1))}}><span className="fa fa-angle-left"></span> Go back</Button>
            <Button color='light' className="float-right"  onClick={() => {this.props.toggle(String(+this.props.active + 1))}}>Next <span className="fa fa-angle-right"></span></Button>
            <div className='clearfix'></div>
        </>
     )}
}