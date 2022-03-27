import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { Button, Table, ListGroup, ListGroupItem } from 'reactstrap';

export default class Draft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drafts_list: [],
      links: ''
    }
    this.getFormFromDB = this.getFormFromDB.bind(this);
    this.deleteDraft = this.deleteDraft.bind(this);
    this.deleteLink = this.deleteLink.bind(this);
    this.loadResults = this.loadResults.bind(this);
    this.getCookie = this.getCookie.bind(this);
  }
  deleteLink(e) {
    //TODO: delete by user token and name
    console.log(e)
    fetch('/delete_experiment/?'+ new URLSearchParams({
      name: e.target.value}), {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    }).then(response => {
      const result = response.json() 
      const status_code = response.status;
      console.log(status_code)
      if(status_code != 200) {
        console.log('Error in getting brand info!')
        return false;
    }
      return result
    }).then(store => {
      console.log(store)
      this.componentDidMount()
    }).catch(error => {
    console.log(error)
    })
  }
  deleteDraft (e) {
    //TODO: delete by user token and name
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
      console.log(status_code)
      if(status_code != 200) {
        console.log('Error in getting brand info!')
        return false;
    }
      return result
    }).then(store => {
      console.log(store)
      this.componentDidMount()
      // console.log(this.state.drafts_list)
      // let drafts = this.state.drafts_list
      // drafts.forEach((draft, index) => {
      //   // console.log(drafts.pop(index))
      //   if (draft.nameExperement == e.target.value) {
      //     this.setState({drafts_list: drafts.pop(index)})
      //   }
      // })
      // this.setState({drafts_list: })
    }).catch(error => {
    console.log(error)
    })
  }
  getFormFromDB(e){
    console.log('target', e.target.value)
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
        console.log(status_code)
        if(status_code != 200) {
          console.log('Error in getting brand info!')
          return false;
      }
        return result
    })
    .then(result => {
        const n = new Object(result)
        let store = require('store')
        // console.log(n.entries())
        Object.entries(result).forEach(([key, value]) => {
          console.log(key, value)
          store.set(key, value);
        })
        return store
    })
    .then(store => {
      if (store.get('nameExperementForParticipants') == e.target.value){
        
        this.props.history.push('/constructor')
        console.log(this.props.history)
      }
    })
    .catch(error => {
        console.log(error)
    })

  }
  loadResults(e) {
    console.log(e.target.value.split('/')[1])
    this.props.history.push(`/results/${e.target.value.split('/')[1]}`)
  }
  getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
  componentDidMount() {
    console.log('props',this.props.links)
    const usertoken = this.getCookie('access_token');
    fetch ('/drafts_list/?'+ new URLSearchParams({
      access_token: usertoken}), {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    })
    .then(response => {
        // console.log(response.text())
        const result = response.json()
        console.log('result', result);
        const status_code = response.status;
        console.log(status_code)
        if(status_code != 200) {
            console.log('Error in getting brand info!')
            return false;
        }
        
        return result
      }).then(result => {
        console.log('result', result);
        const links = result.pop()
        console.log('links', links.links)
        let links_set = new Set(links.links)
        this.setState({drafts_list: result, links: links_set},console.log('result', this.state.drafts_list))
        // Do something with the result
      })
      .catch(error => {
          console.log(error)
      })

  }   
  render () {
    let i = 0
    console.log(this.state.drafts_list.length)
    if (this.state.drafts_list.length != 0){
    return(
      <>
        
              <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Experiment name</th>
                  <th>Imitation task</th>
                  <th>Comprehension questions</th>
                  <th>Integrate with Prolific</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
      {this.state.drafts_list.map(({nameExperementForParticipants, ImitationTask, UseQuestions, UseProlific}) => {
        
        i += 1
        {(ImitationTask) ? (ImitationTask = 'Yes') : (ImitationTask = 'No') }
        {(UseQuestions) ? (UseQuestions = 'Yes') : (UseQuestions = 'No') }
        {(UseProlific) ? (UseProlific = 'Yes') : (UseProlific = 'No') }
          return (
              <tr key={`draft${i}`}>
                  <th scope="row" key={`draft_row${i}`}>{i}</th>
                  <td key={`draft_name${i}`}>{nameExperementForParticipants}</td>
                  <th key={`draft_imitation${i}`}>{ImitationTask}</th>
                  <th key={`draft_questions${i}`}>{UseQuestions}</th>
                  <th key={`draft_prolofic${i}`}>{UseProlific}</th>
                  <th key={`draft_load${i}`}><Button type='button' onClick={this.getFormFromDB} color="primary" value={nameExperementForParticipants}>Load</Button></th>
                  <th key={`draft_delete${i}`}><Button type='button' onClick={this.deleteDraft}     color="danger" outline value={nameExperementForParticipants}>Delete</Button></th>
                </tr>
          )
        })}
        </tbody>
                      </Table>
      <div>
      <h4>Links to experiments</h4>
      <ListGroup>
      {this.state.links ? (
      [...this.state.links].map(item => {
        console.log(item)
        if (item) {return (
           <ListGroupItem key={`list_${item}`}> 
             <Link to={item}>{item}</Link> 
             <Button type='button' onClick={this.deleteLink}  color="danger" outline className="float-right" value={item}>Delete</Button> {'  '} 
               <Button type='button' onClick={this.loadResults}  className="float-sm-right" color="primary" value={item}>Results</Button>
               </ListGroupItem>
               )}
    })):<ListGroupItem>Will be here</ListGroupItem>}
    </ListGroup>
            </div>
      </>
    )
    } else {
    return (<> </>)
  }
}
}