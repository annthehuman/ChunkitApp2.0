import React, { Component } from "react";
// import Stack from '@mui/material/Stack';
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomButton from '../../common_components/button';
import CustomHeader from '../../common_components/header';
import Logo from '../../common_components/logo';
import { Grid } from '@mui/material';
import { Link } from "react-router-dom";
const StyledHeader = styled(Typography)(({ theme }) => (
    {
    fontWeight: '700',
    fontSize: '36px',
    lineHeight: '46.88px',
    fontFamily: [
      'Roboto', 'sans-serif'
    ].join(','),
  }));

export default class CustomHat extends Component {
  constructor(props) {
    super(props);}

  render() {return (
    <>

<Grid container
    direction="column"
    alignItems="center"
    pt={'50px'}
    width={'950px'}>
<Grid container
    direction="row"
    justifyContent="space-between"
    alignItems="center">
<CustomButton 
    text='Log out' 
    theme='black'
    style={{display: 'inline-block', float: 'right',visibility: 'hidden'}}/>

<Logo 
size={{margin:'0 auto', 
      height: '100px',
      width: '97.37px',
  justifyContent: 'center'}}/>
<Link to='/'>
<CustomButton 
    onClick={() => {document.cookie = 'access_token' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.setState({autorized: false});window.location.reload()}} 
    text='Log out' 
    theme='black'
    style={{display: 'inline-block', float: 'right'}}/>
</Link>
</Grid>
<br/>
<CustomHeader text='ChunkitApp 2.0'/>
<br/>
</Grid>
    </>
  );}
}