import React, {Component} from 'react';
import { Table, Button, Spinner } from 'reactstrap';
import { Link } from "react-router-dom";
import CustomButton from '../../../../common_components/button';
import Papa from 'papaparse'
export default class ExperimentRawResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      head: []
    }
}
  componentDidMount() {
    let store = require('store');

    fetch('/results_data/'+ new URLSearchParams({
      name:this.props.name}), {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    }).then(response => {
      const result = response.text() 
      const status_code = response.status;

      if(status_code != 200) {
        console.log('Error in getting brand info!')
        throw Error(status_code);
      }
      return result
    }).then(() => {
      fetch(`/static/media/Experement/${this.props.name}/results_raw.csv`)
      .then(response => {
      const result = response.text() 
      const status_code = response.status;
      if(status_code != 200) {
        console.log('Error in getting brand info!')
        throw Error(status_code);
      }
      return result
      })
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
  render() {
    let i = 0
    return(
    <>
    <Link to={`/static/media/Experement/${this.props.name}/results_raw.csv`} target="_blank" download>
      <CustomButton text='Download Table' theme='blue' size='small'/>
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