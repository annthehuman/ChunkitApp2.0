import React, {Component} from 'react';
import { Button, Table } from 'reactstrap';
import styled from 'styled-components';

export default class Draft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drafts_list: []
    }
    this.getFormFromDB = this.getFormFromDB.bind(this);
    this.deleteDraft = this.deleteDraft.bind(this);
  }
  deleteDraft (e) {
    fetch('/delete_draft/?'+ new URLSearchParams({
      name: e.target.value}), {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    }).then(response => {
      const result = response.json() 
      const status_code = response.status;
      if(status_code != 200) {
        console.log('Error in getting brand info!')
        return false;
    }
      return result
    }).then(store => {
      this.componentDidMount()
    }).catch(error => {
    console.log(error)
    })
  }
  getFormFromDB(e){
    fetch('/load_draft/?'+ new URLSearchParams({
      name: e.target.value}), {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    })
    .then(response => {
        const result = response.json() 
        const status_code = response.status;
        if(status_code != 200) {
          console.log('Error in getting brand info!')
          return false;
      }
        return result
    })
    .then(result => {
        let store = require('store')
        Object.entries(result).forEach(([key, value]) => {
          console.log(key, value)
          store.set(key, value);
        })
        return store
    })
    .then(store => {
      if (store.get('nameExperement') == e.target.value){
        this.props.history.push('/constructor')
      }
    })
    .catch(error => {
        console.log(error)
    })

  }

  componentDidMount() {
    fetch ('/drafts_list/', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    })
    .then(response => {
        const result = response.json()
        const status_code = response.status;
        if(status_code != 200) {
            console.log('Error in getting brand info!')
            return false;
        }
        return result
      }).then(result => {
        this.setState({drafts_list: result})
      })
      .catch(error => {
          console.log(error)
      })

  }   
  render () {
    let i = 0
    if (this.state.drafts_list.length != 0){
    return(
      <>
      
              <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Experement name</th>
                  <th>Number of audio extracts</th>
                  <th>Use the Elicited Imitation task</th>
                  <th>Use comprehension questions</th>
                  <th>Integrate with Prolific</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
      {this.state.drafts_list.map(({nameExperement, numberOfExtracts, ImitationTask, UseQuestions, UseProlific}) => {
        
        i += 1
        
        {(ImitationTask) ? (ImitationTask = 'Yes') : (ImitationTask = 'No') }
        {(UseQuestions) ? (UseQuestions = 'Yes') : (UseQuestions = 'No') }
        {(UseProlific) ? (UseProlific = 'Yes') : (UseProlific = 'No') }
          return (
              <tr key={`draft${i}`}>
                  <th scope="row">{i}</th>
                  <td>{nameExperement}</td>
                  <th>{numberOfExtracts}</th>
                  <th>{ImitationTask}</th>
                  <th>{UseQuestions}</th>
                  <th>{UseProlific}</th>
                  <th><Button type='button' onClick={this.getFormFromDB} color="primary" value={nameExperement}>Load</Button></th>
                  <th><Button type='button' onClick={this.deleteDraft}     color="danger" outline value={nameExperement}>Delete</Button></th>
                </tr>
          )
        })}
        </tbody>
                      </Table>
            
      </>
    )
    } else {
    return (<> </>)
  }
}
}