import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import Logo from "../../../common_components/logo";
import CustomHeader from "../../../common_components/header";
import { Tooltip } from "@mui/material";
import { TextField } from "@mui/material";
import CustomButton from "../../../common_components/button";
import { red } from "@mui/material/colors";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {username: "", 
                      password: "",
                      errorLogin: [],
                      showPassword: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleClickShowPassword(){
        this.setState({
          showPassword: !this.state.showPassword,
        });
    };
    
    handleMouseDownPassword(event){
        event.preventDefault();
    };
    


    handleSubmit(event) {
        // alert('A username and password was submitted: ' + this.state.username + " " + this.state.password);
        event.preventDefault();
        fetch('/auth/token/login/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
            }).then(data => {
                if (!data.ok){
                    data.json()
                    .then(data =>{
                        this.setState({errorLogin: data})       
                        throw Error(data);})
                } else {
                    const result =  data.json() 
                    return result}
            }).then(result => {
                // localStorage.setItem('access_token', result.auth_token)
                document.cookie = `access_token=${result.auth_token}`
            }).then(() => {
                this.props.history.push('/')
            }).catch((data) => {
            console.log(`Try again! Error: ${Error(data)}`)
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <Stack direction='column' spacing={2} mt={'35px'} alignItems="center">
                <Logo/>
                <CustomHeader text='ChunkitApp 2.0'/>
                <TextField 
                    name="username" 
                    id="username" 
                    sx={{ width:'244px' }}
                    label="example@email.com" 
                    variant="outlined" 
                    value={this.state.username}
                    onChange={this.handleChange}
                    type='email'
                    />

                <TextField 
                    name="password" 
                    id="examplePassword" 
                    sx={{ width:'244px' }}
                    label="password" 
                    variant="outlined" 
                    value={this.state.password}
                    onChange={this.handleChange}
                    type={this.state.showPassword ? 'text' : 'password'}
                    InputProps={{endAdornment:
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                            edge="end"
                          >
                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }}
                    />
                {this.state.errorLogin ?
                Object.values(this.state.errorLogin).map(values => {
                return(<Typography sx={{color: '#D21502'}}>{values}
                </Typography>)
                })
                :null}
                <Link to="/reset_password">
                Forgot password?
                </Link>
                <Stack direction='row' spacing={2} mt={'82px'}>
                <CustomButton text='Log in' theme='blue' type="submit" value="Submit" />
                <Link to='/signup/'>
                <CustomButton theme='black' text='Sign up' type="button" value="Submit" />
                </Link>
                </Stack>
            </Stack>
            </form>
        )
    }
}
export default Login;