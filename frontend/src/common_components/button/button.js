import React, { Component } from "react";
// import Stack from '@mui/material/Stack';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Tooltip } from "@mui/material";

const StyledButton = styled(Button)(({ theme, size }) => (
  {
  height: size == 'small' ? '36px' : size == 'icon' ? '27px' :'50px',
  minWidth: '27px',
  backgroundColor: theme == 'blue' ? '#6083FF' : theme == 'danger' ? '#FFFFFF' : theme == 'white' ? '#F8F8F8' : theme == 'gray' ? '#C4C4C4' : theme=='green' ? '#00D6A2' : theme=='trans' ? 'transparent' : '#2D2D2D',
  color: theme == 'danger' ? '#D21919' : theme == 'white' ? '#2D2D2D' : '#FFFFFF',
  fontWeight: '400',
  textTransform: 'none',
  fontSize: size == 'small' ? '14px' : size == 'icon' ? '17px' : '28px',
  boxShadow: 'none',
  borderRadius: '100px',
  border: theme == 'danger' ? '1px solid #D21919' : '',
  padding: size == 'icon' ? '0' : '10px 20px',
  lineHeight: size == 'icon' ? '17px' : '46.88px',
  textAlign: 'center',
  lineHeight: '0px',
  fontFamily: [
    'Roboto', 'sans-serif'
  ].join(','),
  '&:hover': {
    backgroundColor: theme == 'blue' ? '#6083FF' : theme == 'danger' ? '#FFFFFF' : theme == 'white' ? '#F8F8F8' : theme == 'gray' ? '#C4C4C4' : theme=='green' ? '#00D6A2' : theme=='trans' ? 'transparent' : '#2D2D2D',
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
      <Tooltip title={this.props.title ? this.props.title : this.props.text}>
      <StyledButton onClick={this.props.onClick} 
                    size = {this.props.size}
                    type={this.props.type ? this.props.type : 'button'} 
                    value={this.props.value ? this.props.value: null} 
                    theme={this.props.theme} 
                    variant="contained" 
                    style={this.props.style}
                    disabled={this.props.disabled}
                    component={this.props.component}
                    name={this.props.name}
                    startIcon={this.props.startIcon}
                    endIcon={this.props.endIcon}
                    id={this.props.id}>
                      {this.props.text}
                      {this.props.children}
      </StyledButton>
      </Tooltip>
    </>
  );}
}