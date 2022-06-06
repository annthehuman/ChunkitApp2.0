import React, { Component } from "react";
// import Stack from '@mui/material/Stack';
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledHeader = styled(Typography)(({ theme }) => (
  theme == 'small' ?
  {
    fontWeight: '700',
    fontSize: '24px',
    lineHeight: '28.13px',
    fontFamily: [
      'Roboto', 'sans-serif'
    ].join(','),
  }
  :
    {
    fontWeight: '700',
    fontSize: '36px',
    lineHeight: '46.88px',
    fontFamily: [
      'Roboto', 'sans-serif'
    ].join(','),
  }));

export default class CustomHeader extends Component {
  constructor(props) {
    super(props);}

  render() {return (
    <>
    
      <StyledHeader theme={this.props.theme} style={this.props.style}>{this.props.text}</StyledHeader>
    </>
  );}
}