import React, { Component } from "react";
// import Stack from '@mui/material/Stack';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledBigButton = styled(Button)(({ theme, side }) => (
  {
  color: theme == 'blue' ? '#FFFFFF': '#2D2D2D',
  height: '500px',
  width: '400px',
  backgroundColor: theme == 'blue' ? '#6083FF': '#FFFFFF',
  fontWeight: '700',
  textTransform: 'none',
  fontSize: '36px',
  boxShadow: 'none',
  border: theme == 'blue' ? '': '1px solid #B0A3A3;',
  borderRadius: side =='right' ? '0px 30px 30px 0px' : '30px 0px 0px 30px' ,
  padding: '16px 25px',
  lineHeight: '56px',
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


export default class CustomBigButton extends Component {
  constructor(props) {
    super(props);}

  render() {return (
    <>
      <StyledBigButton 
          type={this.props.type ? this.props.type : 'button'} 
          value={this.props.value ? this.props.value: null} 
          theme={this.props.theme} 
          variant="contained"
          side={this.props.side}>
            {this.props.text}
      </StyledBigButton>
    </>
  );}
}