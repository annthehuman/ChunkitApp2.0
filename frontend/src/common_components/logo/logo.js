import { Box } from '@mui/material';
import React, {Component} from 'react';

export default class Logo extends Component {
    constructor(props) {
      super(props);}
  
    render() {return (
        <Box
        component="img"
        sx={{
          height: '126px',
          width: '129px',
        }}
        alt="University of Helsinki logo"
        src="../../../static/logo/image 1.png"
      />
    );}
  }