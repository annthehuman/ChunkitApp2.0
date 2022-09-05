import React, {Component} from 'react';
import { Table, Button, Spinner } from 'reactstrap';
import { Link } from "react-router-dom";
import Papa from 'papaparse'
import CustomButton from '../../../../common_components/button';

export default class ImitationResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      head: []
    }
    this.onSubmit = this.onSubmit.bind(this);
}
  componentDidMount() {
    fetch('/sentence_results/'+ new URLSearchParams({
      name:this.props.name}), {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    }).then(response => {
      const result = response.text() 
      const status_code = response.status;
      console.log(status_code)
      if(status_code != 200) {
        console.log('Error in getting brand info!')
        throw Error(status_code);
    }
      return result
    }).then(() => {
      fetch(`/static/media/Experement/${this.props.name}/sentence.csv`)
      .then(response => {
        const status_code = response.status;
        console.log(status_code)
        if(status_code != 200) {
          console.log('Error in getting brand info!')
          throw Error(status_code);
        }
        return response.text()})
      .then(data => Papa.parse(data))
      .then(result => {
        let cells = []
        let head = []
        result.data.forEach((i, index) => {
          if ( index < 1) {
           let s = []
           i.forEach(k => {
             s.push(<th>{ k }</th>)
           })
           head.push(<tr key={`tr_${index}`}>{ s }</tr>)}
         else {
           let s = []
           i.forEach(k => {
             s.push(<td>{ k }</td>)
           })
           cells.push(<tr key={`tr_${index}`}>{ s }</tr>)}
        })
        this.setState({rows: cells, head: head})
      }).catch(error => this.setState({rows: [''], head: ['No results yet']}))
      }).catch(error => {
    console.log(error)
    this.setState({rows: [''], head: ['No results yet']})
    })
  }

  onSubmit(e) {
    
    e.preventDefault()
    console.log(e.target)
    const input = document.getElementById('secretWord')
    console.log(input.value)
    if (input.value == this.state.secret) {
      document.getElementById('secretWordForm').style.display = 'none'
      document.getElementById('panel').style.display = 'block'
    }
  }
  render() {
    let i = 0
    return(
    <>
    <Link to={`/static/media/Experement/${this.props.name}/sentence.csv`} target="_blank" download>
      <CustomButton text='Download Table' theme='blue' size='small'/>
    </Link>
    <br/>
    <br/>
     {this.state.rows.length != 0 ? 
     (<Table striped>
     <thead>
       {this.state.head}
              </thead>
              <tbody>
              {this.state.rows}
              </tbody>
              </Table>)
              :
    <Spinner>
    Loading...
    </Spinner>}
    </>
  )}
}