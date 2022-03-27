import React, {Component} from 'react';
import { Table, Button, Spinner } from 'reactstrap';
import { Link } from "react-router-dom";

import Papa from 'papaparse'

export default class FeedbackResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      head: []
    }
}
  componentDidMount() {
    let store = require('store');
    // console.log(this.props.name)
    !store.get('feedback_results') ? 

    fetch('/feedback_results/'+ new URLSearchParams({
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
        return false;
    }
      return result
    }).then(() => {
      store.set('feedback_results', 'loaded')
      fetch(`/media/Experement/${this.props.name}/feedback.csv`)
      .then(response => response.text())
      .then(data => Papa.parse(data))
      .then(result => {
        console.log(result.data), this.setState({results:result.data})
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
      }).catch(error => console.error(error))
      }).catch(error => {
    console.log(error)
    }) : 
    fetch(`/media/Experement/${this.props.name}/feedback.csv`)
      .then(response => response.text())
      .then(data => Papa.parse(data))
      .then(result => {
        console.log(result.data), this.setState({results:result.data})
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
      }).catch(error => console.error(error))
  
  }
  render() {
    let i = 0
    return(
    <>
    <Link to={`/media/Experement/${this.props.name}/feedback.csv`} target="_blank" download>
      <Button color="info" outline>Download Table</Button>
      <br/>
      <br/>
    </Link>

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