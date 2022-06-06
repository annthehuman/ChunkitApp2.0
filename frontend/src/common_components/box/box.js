import React, { Component } from "react";
// import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import { Tooltip } from "@mui/material";
import CustomHeader from "../header";
import { ThemeProvider, makeStyles } from '@mui/styles';

const StyledBox = styled(Box)(({ theme, size }) => (
  {
  width: '800px',
  margin: '10px auto',
  backgroundColor: theme=='white' ? '#FFFFFF' : '#F8F8F8',
  fontWeight: '400',
  fontSize: '20px',
  boxShadow: 'none',
  borderRadius: '30px',
  fontFamily: [
    'Roboto', 'sans-serif'
  ].join(','),
  '&:hover': {
  },
  '&:active': {
  },
  '&:focus': {
  },
}));


export default class CustomBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {return (
    <>
      <StyledBox  
                  theme={this.props.theme}
                  size = {this.props.size}
                  style={this.props.style}>
      <CustomHeader text={this.props.header}/>
      {this.props.children}
      </StyledBox>
    </>
  );}
}