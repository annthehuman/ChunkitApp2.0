import React, {Component} from 'react';

import styled from 'styled-components';
import { Link } from "react-router-dom";
import { Button, Table, ListGroup, ListGroupItem } from 'reactstrap';
import App from '../../app/app';
import CustomHat from '../../../common_components/hat';
import CustomButton from '../../../common_components/button';
import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Stack } from '@mui/material';

const AppBlock = styled.div`
    margin: 0 auto;
    width: 100%;
`


export default class Draft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drafts_list: [],
      links: '',
      columns: [{ field: 'id', headerName: '#', width: 55 },
      {field: 'experimentName', headerName: 'Experiment name', width: 150},
      {field: 'imitationTask', headerName: 'Imitation task', width: 90},
      {field: 'questions', headerName: 'Comprehension questions', width: 120},
      {field: 'prolific', headerName: 'Integrate with Prolific', width: 110},
      {field: 'link', headerName: 'Link to experiment', width: 200, renderCell: (params) => (
        <Link to={`/${params.value}`}>{params.value}</Link>)},
        {field: 'load', headerName: '', width: 70, renderCell: (params) => (
          console.log('load params', params),
          <CustomButton 
                      theme='blue' 
                      size='small' 
                      type='button' 
                      onClick={this.getFormFromDB}
                      value={params.value}
                      text='Edit'/>)},
        {field: 'stop', headerName: '', width: 70, renderCell: (params) => (
          console.log('stop params', params),
          params.value ? 
          <CustomButton 
                    theme='black' 
                    size='small' 
                    type='button' 
                    onClick={this.stopExperiment}
                    value={params.value}
                    text='Stop'
                    />:
          <CustomButton 
                    theme='black' 
                    size='small' 
                    type='button' 
                    onClick={this.stopExperiment}
                    value={params.value}
                    text='Stop'
                    disabled/>)},
        {field: 'delete', headerName: '', width: 70, renderCell: (params) => (
          <CustomButton 
                    theme='danger' 
                    size='small' 
                    type='button' 
                    onClick={this.deleteDraft}
                    value={params.value}
                    text='Delete'/>)}],
      rows: ''
    }
    this.getFormFromDB = this.getFormFromDB.bind(this);
    this.deleteDraft = this.deleteDraft.bind(this);
    this.deleteLink = this.deleteLink.bind(this);
    this.loadResults = this.loadResults.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.stopExperiment = this.stopExperiment.bind(this);
  }

  stopExperiment(e) {
    //TODO: delete by user token and name
    console.log(e)
    fetch('/stop_experiment/?'+ new URLSearchParams({
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
          console.log('load', key, value)
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
        let rows = []
        let i = 0
        result.map(({nameExperementForParticipants, pagesNeeded, UseQuestions, UseProlific}) => {
          console.log('nameExperementForParticipants, ImitationTask, UseQuestions, UseProlifi', nameExperementForParticipants, pagesNeeded.indexOf('Imitation') != -1, UseQuestions, UseProlific)
          let experiment_link = Array.from(links_set).filter(link => link.split('/')[link.split('/').length-1].indexOf(nameExperementForParticipants) != -1)
          experiment_link = experiment_link[experiment_link.length - 1]
          i += 1
          let ImitationTask = pagesNeeded.indexOf('Imitation') != -1 ? 'Yes' : 'No'
          UseQuestions = UseQuestions ? 'Yes' : 'No'
          UseProlific = UseProlific ? 'Yes' : 'No'
          let stop_value = experiment_link && experiment_link.length > 0 ? nameExperementForParticipants : undefined
          // console.log('link',experiment_link.length > 0, stop_value)
          rows.push({id: i, experimentName: String(nameExperementForParticipants).replace(/_/g, ' '), imitationTask: ImitationTask, 
            questions: UseQuestions, prolific: UseProlific, link: experiment_link,
             load: nameExperementForParticipants, stop: stop_value, delete:nameExperementForParticipants})})
        this.setState({rows: rows})
      })
      .catch(error => {
          console.log(error)
      })
  }   
  render () {
    let i = 0
    console.log(this.state.drafts_list.length)
    return(
      <AppBlock>
        
        <Grid
        container
        direction="column"
        alignItems="center"
        >
          <Grid item>
          <CustomHat history={this.props.history}/>
          <Link to='/constructor'>
          <CustomButton title='Create new experiment' theme='blue' text='+'/>
          </Link>
          </Grid>
        <br/>
        <div style={{ height: 400, width: '950px',textAlign: "center"}}>
          <DataGrid
            components={{
              NoRowsOverlay: () => (
                <Stack height="100%" alignItems="center" justifyContent="center">
                  No experiment drafts yet
                </Stack>
              )}}
            rows={this.state.rows}
            columns={this.state.columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            sx={{
              '& .MuiDataGrid-columnHeaderTitle': {
                  textOverflow: "clip",
                  whiteSpace: "break-spaces",
                  lineHeight: 1,
                  fontSize: '14px',
                  lineHeight: '19px',
                  justifyContent: 'center',
                  textAlign: 'center',
                  alignItems: 'center',
              },
              '& .MuiDataGrid-columnHeaderTitleContainer': {
                justifyContent: 'center',
              },
              '& .MuiDataGrid-iconSeparator': {
                display: 'none'
              },
              '& .MuiDataGrid-cell': {
                textOverflow: "clip",
                whiteSpace: "break-spaces",
                lineHeight: 1,
                fontSize: '14px',
                lineHeight: '19px',
                justifyContent: 'center',
                textAlign: 'center',
                alignItems: 'center',
              }
            }}
          />
        </div>
            </Grid>
      </AppBlock>
    )
    
  }

}