import React, {Component} from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { Input, FormGroup, Label, Button } from 'reactstrap';
import Draft from './drafts'
import CustomButton from '../../common_components/button';
import CustomHeader from '../../common_components/header';
import { Stack } from '@mui/material';
import Logo from '../../common_components/logo';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const AppBlock = styled.div`
    margin: 0 auto;
    width: 60%;
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
    <div id='panel' 
    >
    <Link to='constructor'>
    <Button>Constructor</Button>
    </Link>
    <Button className="float-right"  
    onClick={() => {document.cookie = 'access_token' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.setState({autorized: false})}}
    >Log out</Button>
    <br/>
    <br/>
    <Draft history={this.props.history} links={this.props.links}/>
    
    </div>:
    <Stack direction="column" spacing={4} mt={'82px'} alignItems="center">
    <Logo/>
    <CustomHeader text='ChunkitApp'/>
    <Link to='login/'>
    <CustomButton theme='blue' text='Log in'/>
    </Link>
    <Link to='signup/'>
    <CustomButton theme='black' text='Sing up'/>
    </Link>
    </Stack>}
    </AppBlock>
    </>
  )}
}
