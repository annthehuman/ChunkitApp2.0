import { Box } from '@mui/material';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Logo extends Component {
    constructor(props) {
      super(props);}
  
    render() {return (
      <Link to='/'>
        <Box
        component="img"
        sx={this.props.size ? 
        this.props.size :
        {
          height: '126px',
          width: '129px',
        }}
        alt="University of Helsinki logo"
        src="../../../static/static/logo/Logo.svg"
      />
      </Link>
    );}
  }