import React, {Component} from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
// const AppBlock = styled.div`
//     margin: 0 auto;
//     max-width: 60%;
// `

export default class TextTab extends Component {
  constructor(props) {
    super(props);
    // this.htmlDecode = this.htmlDecode.bind(this)
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
    render() {
        return(
        <>  <h3>{this.props.header}</h3>
            <div id='htmlToText'>
            </div>
            {this.props.header=='Goodbye!' && this.props.link ?
            <a href={`${this.props.link}`}>
            <Button color="success">Link back to Prolific</Button>
            </a>:null}
            {this.props.nextPage? <Button type='button' onClick={this.props.nextPage} name='NextExperimentPage' color="primary">Continue</Button>: null}
            <div className='clearfix'></div>
        </>
     )}
}