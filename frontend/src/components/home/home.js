import React, {Component} from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import Draft from './test'
import CustomButton from '../../common_components/button';
import CustomHeader from '../../common_components/header';
import { Stack, Typography } from '@mui/material';
import Logo from '../../common_components/logo';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomBigButton from '../../common_components/big-button';
import { Grid } from '@mui/material';
import CustomHat from '../../common_components/hat';


const AppBlock = styled.div`
    margin: 0 auto;
    width: 100%;
`

const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        color:'red'
      },
    },
  },
});


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secret: '',
      autorized: false
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.getCookie = this.getCookie.bind(this);
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
    let store = require('store');
    store.clearAll();
    this.getCookie('access_token') ? this.setState({autorized: true}) : this.setState({autorized: false})
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
  render() {return(
    <>
    <br/>
    <AppBlock>
    {this.state.autorized? 
    <>
<Grid container
    direction="column"
    alignItems="center">
<CustomHat/>

<Grid container
        direction="row"
        justifyContent="center"
        alignItems="center">
    <Link to='drafts'>
    <CustomBigButton theme='wight' side='left' text='Design & Run'/>
    </Link>
    <Link to='results'>
    <CustomBigButton theme='blue' side='right' text='Fetch & Analyse'/>
    </Link>
</Grid>
<br/>
<Grid container
      direction="row"
      justifyContent="space-between"
      sx={{width: '56%'}}>
        <CustomButton theme='white' size='icon' text='?'/>
        <Typography sx={{fontSize:'16px'}}>This project is distributed under CC-BY-NC-SA license</Typography>
      </Grid>
    </Grid>
    </>:
    <Stack direction="column" spacing={4} mt={'82px'} alignItems="center">
    <Logo/>
    <CustomHeader text='ChunkitApp 2.0'/>
    <Stack direction="row" spacing={2}  alignItems="center">
    <Link to='login/'>
    <CustomButton theme='blue' text='Log in'/>
    </Link>
    <Link to='signup/'>
    <CustomButton theme='black' text='Sing up'/>
    </Link>
    </Stack>
    </Stack>}
    </AppBlock>
    </>
  )}
}
