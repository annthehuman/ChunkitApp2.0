import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { FormGroup, Label, Input, Button, Spinner, Table } from 'reactstrap';

import Papa from 'papaparse'


export default class ExperimentResultsPermutation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sended: false,
      rows: [],
      head: []
    }
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentDidMount() {
    let store = require('store')
    // if (store.get('sended'))
    // {this.setState({ sended: store.get('sended') });}
}
  onSubmit(e) {
    let store = require('store');
    this.setState({sended: true})
    store.set('sended', true)
    e.preventDefault();
    const form = e.target
    const formData = new FormData(form);
    console.log(...formData)
    fetch('/permutation/'+ new URLSearchParams({
      name:this.props.name}), {
    method: "POST",
    body: formData
    }).then(data => {
    if (!data.ok){
        throw Error(data.status);
    }
    fetch(`/static/media/Experement/${this.props.name}/results_permutation.csv`)
    .then(response => response.text())
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
    }).catch(error => console.error(error))
    //console.log('так')
    }).catch((data) => {
    console.log(`Try again! Error: ${Error(data.status)}`)
    }).finally(() => {
    form.reset();
    });}

  render() {
    return(
    <>
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
     !this.state.sended?
      <form encType="multipart/form-data" method="post" name="fileinfo" onSubmit={this.onSubmit} >
      <FormGroup style={{width: "70%", margin: 'auto'}} >
        <Label for="amount">Amount of runs if needed (we use 1 million)</Label>
        <Input
          id='amount'
          type='number'
          placeholder='Insert amount of runs, or leave empty to use 1 million'
          name='amount'
          onChange={this.onChange}
        />
        <br/>
        <Button color='primary' type='submit'>Start permutation</Button>
      </FormGroup>
      
      </form>:
     <Spinner>
     Loading...
     </Spinner>}
    </>
  )}
}