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
export default class ResultsHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
          drafts_list: [],
          links: '',
          columns: [{ field: 'id', headerName: '#', width: 55 },
          {field: 'experimentName', headerName: 'Experiment name', width: 300},
          {field: 'link', headerName: 'Link to experiment', width: 400, renderCell: (params) => (
            <Link to={`/${params.value}`}>{params.value}</Link>)},
            {field: 'results', headerName: '', width: 100, renderCell: (params) => (
                console.log('params.value', params.value),
                <Link to={`/results/${params.value}`}>
              <CustomButton 
                        theme='blue' 
                        size='small' 
                        type='button'
                        value={params.value}
                        text='Results'/></Link>)}],
          rows: ''
        }
        this.getCookie = this.getCookie.bind(this)
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
            result.map(({nameExperementForParticipants}) => {
              console.log('links_set', links_set)
              let experiment_link = Array.from(links_set).filter(link => link.split('/')[link.split('/').length-1].indexOf(nameExperementForParticipants) != -1)
              experiment_link = experiment_link[experiment_link.length - 1]
              i += 1
              // let stop_value = experiment_link.length > 0 ? nameExperementForParticipants : undefined
              rows.push({id: i, experimentName: nameExperementForParticipants,link: experiment_link,
                results:nameExperementForParticipants})})
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
              </Grid>
            <br/>
            <div style={{ height: 400, width: '950px',textAlign: "center"}}>
              <DataGrid
                components={{
                  NoRowsOverlay: () => (
                    <Stack height="100%" alignItems="center" justifyContent="center">
                      No experiment results yet
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