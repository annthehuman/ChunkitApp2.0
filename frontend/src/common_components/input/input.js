import React, {Component} from 'react';
import { styled } from "@mui/material/styles";
import { TextField } from '@mui/material';


const StyledInput = styled(TextField)(({ theme }) => (
    {
    // border: '1px solid #000000',
    // height: '75px',
    // borderRadius: '187px',
    // width: '600px',
    // fontWeight: '300',
    // fontSize: '36px',
    // lineHeight: '42.19px',
    // padding: '5px',
    // fontFamily: [
    //   'Roboto', 'sans-serif'
    // ].join(','),
    '& .MuiOutlinedInput-root': {
      width: '600px',
      height: '75px',
      backgroundColor: 'transparent',
      fontSize: '36px',
      fontWeight: '300',
      fontFamily: [
          'Roboto', 'sans-serif'
        ].join(','),
      border: '1px solid #000000',
      borderRadius: '187px',
      overflow: 'hidden',
      '&:hover': {
        backgroundColor: 'transparent',
        border: '0px solid #000000',
      },
      '&.Mui-focused': {
        backgroundColor: 'transparent',
        border: '0px solid #000000',
        // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        // borderColor: theme.palette.primary.main,
      },
      }
  }));


export default class CommonInput extends Component {
    constructor(props) {
      super(props);}
  
    render() {return (
        <StyledInput
        label="username"
        required
      />
    );}
  }