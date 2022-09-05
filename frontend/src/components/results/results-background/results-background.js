import React, {Component} from 'react';
import { Table, Button, Spinner  } from 'reactstrap';
import { Link } from "react-router-dom";
import { Box } from '@mui/system';
import Papa from 'papaparse'
import CustomButton from '../../../common_components/button';
export default class BackgroundResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      head: []
    }
}
  componentDidMount() {
    fetch('/background_results/'+ new URLSearchParams({
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
      fetch(`/static/media/Experement/${this.props.name}/background.csv`)
      .then(response => {
        const status_code = response.status;
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
      }).catch(error => {console.log('error', error);this.setState({rows: [''], head: ['No results yet']})})
      }).catch(error => { console.log('error', error);
        this.setState({rows: [''], head: ['No results yet']})
    })
  }
  render() {
    let i = 0
    return(
    <>
    <Link to={`/static/media/Experement/${this.props.name}/background.csv`} target="_blank" download>
      <CustomButton text='Download Table' theme='blue' size='small'/>
      <br/>
      <br/>
    </Link>
     {this.state.rows.length != 0 ? 
     (
     <Table striped>
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