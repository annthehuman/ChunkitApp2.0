import React, {Component} from 'react';
import { Table,Button,Spinner } from 'reactstrap';
import { Link } from "react-router-dom";
import Papa from 'papaparse'
import CustomButton from '../../../../common_components/button';

export default class ExperimentClearResults extends Component {
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
    fetch(`/static/media/Experement/${this.props.name}/results.csv`)
   .then(response => response.text())
   .then(data => Papa.parse(data))
   .then(result => {
     console.log(result.data), this.setState({results:result.data})
     let cells = []
     let head = []
     result.data.forEach((i, index) => {
       if ( index < 2) {
        let s = []
        i.forEach(k => {
          s.push(<td>{ k }</td>)
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
    })
   .catch(error => console.error(error))
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
    <Link to={`/static/media/Experement/${this.props.name}/results.csv`} target="_blank" download>
      <CustomButton text='Download Table' theme='blue' size='small'/>
      <br/>
      <br/>
    </Link>
    { this.state.rows.length == 0 ? 
    <Spinner>
    Loading...
    </Spinner>
    :
    <div style={{height: '100%', width: '100%', overflowX: 'auto'}}>
    <Table bordered responsive>
        <thead>
          {this.state.head}
        </thead>
        <tbody>
        {this.state.rows}
        </tbody>
      </Table>
    </div>}
    </>
  )}
}