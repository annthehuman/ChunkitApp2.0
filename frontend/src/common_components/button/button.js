import React, { Component } from "react";
// import Stack from '@mui/material/Stack';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => (
  {
  height: '75px',
  width: '200px',
  backgroundColor: theme == 'blue' ? '#6083FF': '#2D2D2D',
  fontWeight: '400',
  textTransform: 'none',
  fontSize: '36px',
  boxShadow: 'none',
  borderRadius: '100px',
  // padding: '14px 45px',
  lineHeight: '46.88px',
  fontFamily: [
    'Roboto', 'sans-serif'
  ].join(','),
  '&:hover': {
    backgroundColor: theme == 'blue' ? '#2D2D2D': '#6083FF',
  },
  '&:active': {
  },
  '&:focus': {
  },
}));


export default class CustomButton extends Component {
  constructor(props) {
    super(props);}

  render() {return (
    <>
      <StyledButton theme={this.props.theme} variant="contained">{this.props.text}</StyledButton>
    </>
  );}
}