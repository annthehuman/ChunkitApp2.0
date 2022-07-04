import React, {Component} from 'react';
import styled from 'styled-components';
// import { Link } from "react-router-dom";
// import CustomButton from '../../common_components/button';
// import CustomHeader from '../../common_components/header';
// import { Stack } from '@mui/material';
// import Logo from '../../common_components/logo';
import { Grid } from '@mui/material';
import CustomHat from '../../../common_components/hat';


const AppBlock = styled.div`
    margin: 0 auto;
    width: 100%;
`


export default class Guide extends Component {
  constructor(props) {
    super(props);
}

  render() {return(
    <>
    <AppBlock>
<Grid container
    direction="column"
    alignItems="center">
<CustomHat/>

<Grid container
        direction="column"
        justifyContent="flex-start"
        alignItems="center">
          <Typography>Guide</Typography>
</Grid>
    </Grid>
    </AppBlock>
    </>
  )}
}
