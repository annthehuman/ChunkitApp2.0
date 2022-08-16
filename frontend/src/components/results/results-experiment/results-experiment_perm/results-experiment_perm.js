import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { FormGroup, Label, Input, Button, Spinner, Table } from 'reactstrap';
import { TextField } from '@mui/material';
import CustomButton from '../../../../common_components/button';
import Papa from 'papaparse'
import { Grid } from '@mui/material';


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
    store.get('perm') ? 
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
      store.set('perm', true)
    }).catch(error => console.error(error)) : null
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
      store.set('perm', true)
    }).catch(error => console.error(error))
    //console.log('так')
    }).catch((data) => {
    console.log(`Try again! Error: ${Error(data.status)}`)
    }).finally(() => {
    form.reset();
    });}

  render() {
    let store = require('store');
    return(
    <>
    {this.state.rows.length != 0 ? 
      (<>
      <CustomButton color='primary' onClick={() => {store.set('perm', false), window.location.reload()}} text='Start again' size='small'/>
      <Table striped>
      <thead>
        {this.state.head}
               </thead>
               <tbody>
               {this.state.rows}
               </tbody>
               </Table></>)
               :
      <Grid container
               direction='column'
               alignItems="center">
     {!this.state.sended?
      <form encType="multipart/form-data" method="post" name="fileinfo" onSubmit={this.onSubmit} >
      <TextField 
                  name="amount" 
                  id="amount" 
                  sx={{ width:'440px', marginRight: '13px'}}
                  label="Insert amount of runs, or leave empty to use 1 million"
                  onChange={this.onChange}
                  type='number'
                  inputProps={{style: {fontSize: '20px'}}}
                  />
                  <br/>
                  <br/>
        <CustomButton color='primary' type='submit' text='Start permutation' size='small'/>
        
      </form>:
     <Spinner>
     Loading...
     </Spinner>}
     </Grid>}
    </>
  )}
}