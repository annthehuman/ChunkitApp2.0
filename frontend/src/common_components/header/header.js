import React, { Component } from "react";
// import Stack from '@mui/material/Stack';
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";


const StyledHeader = styled(Typography)(({ theme }) => (
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
      <StyledHeader>{this.props.text}</StyledHeader>
    </>
  );}
}