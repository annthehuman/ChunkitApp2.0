import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import CustomHeader from "../../../common_components/header";
import CustomButton from "../../../common_components/button";
import Logo from "../../../common_components/logo";


class Authorized extends Component{
    render() {
        return (
            <div style={{'width': '70%', 'margin': 'auto'}}>
            <Stack direction='column' spacing={2} mt={'35px'} alignItems="center">
                <Logo/>
                <CustomHeader text='ChunkitApp 2.0'/>
                <Stack direction='column' spacing={2} alignItems="center">
                    <Typography>You are authourized!</Typography>
                    <Link to='/login/'>
                    <CustomButton theme='blue' text='Now you can login'/>
                    </Link>
                </Stack>
                </Stack>
            </div>
        )
    }
}
export default Authorized;