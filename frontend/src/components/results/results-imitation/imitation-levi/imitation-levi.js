import React, {Component} from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from "react-router-dom";
import {  Spinner } from 'reactstrap';
import Papa from 'papaparse'

export default class ImitationLevi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      rows: [],
      head: []
    }
    this.onSubmit = this.onSubmit.bind(this);
}
  componentDidMount() {
    let store = require('store');
    console.log('levi',store.get('levi'),this.props.name)
    !store.get('levi') ? 

    fetch('/levi/'+ new URLSearchParams({
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
      store.set('levi', 'loaded')
      fetch(`/media/Experement/${this.props.name}/sentence_distance.csv`)
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
    fetch(`/media/Experement/${this.props.name}/sentence_distance.csv`)
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
    <Link to={`/media/Experement/${this.props.name}/sentence_distance.csv`} target="_blank" download>
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