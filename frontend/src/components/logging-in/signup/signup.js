import React, { Component } from "react";
import Logo from "../../../common_components/logo";
import { Link } from "react-router-dom";
import {  TextField, Typography } from "@mui/material";
import CustomButton from "../../../common_components/button";
import CustomHeader from "../../../common_components/header";
import { Stack, InputAdornment, IconButton } from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            email:"",
            confirmPassword:"",
            emailSended: false,
            showPassword: false,
            passValid: true,
            errorSingup: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleClickShowConfirmPassword = this.handleClickShowConfirmPassword.bind(this);
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

    handleClickShowConfirmPassword(){
        this.setState({
          showConfirmPassword: !this.state.showConfirmPassword,
        });
    };
    
    handleMouseDownPassword(event){
        event.preventDefault();
    };
    
    handleSubmit(event) {
        event.preventDefault();
        fetch('/auth/users/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.email,
                password: this.state.password,
                email: this.state.email
            })
            }).then(data => {
                 if (!data.ok){
                    data.json()
                    .then(data =>{
                     this.setState({errorSingup: data});})
                     throw Error(data.status);
                 }
            }).then(() => {
                this.setState({emailSended: true})
            }).catch((data) => {
            console.log(`Try again! Error: ${data}`)
            });
    }

    render() {
        return (
            <>
            <div style={{'width': '70%', 'margin': 'auto'}}>
            <Stack direction='column' spacing={2} mt={'35px'} alignItems="center">
                <Logo/>
                <CustomHeader text='ChunkitApp 2.0'/>
            {!this.state.emailSended ?
            <>
                
                
                <form onSubmit={this.handleSubmit}>
                <Stack direction='column' spacing={2} mt={'35px'} alignItems="center">
                <TextField 
                    name="email" 
                    id="email" 
                    sx={{ width:'244px' }}
                    label="example@email.com" 
                    variant="outlined" 
                    value={this.state.email}
                    onChange={this.handleChange}
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
                <TextField 
                    error = {!this.state.passValid}
                    name="confirmPassword" 
                    id="confirmPassword" 
                    sx={{ width:'244px' }}
                    label="confirm password" 
                    variant="outlined"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                    onBlur={() => this.setState({passValid: this.state.password == this.state.confirmPassword})}
                    type={this.state.showConfirmPassword ? 'text' : 'password'}
                    InputProps={{endAdornment:
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.handleClickShowConfirmPassword}
                            onMouseDown={this.handleMouseDownPassword}
                            edge="end"
                          >
                            {this.state.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }}
                    />
                {
                Object.values(this.state.errorSingup).map(values => {
                return(
                <Typography sx={{color: '#D21502'}}>{values}
                </Typography>)
                })}
                <CustomButton theme='black' text='Sign up' type="submit" value="Submit" />
                </Stack>
                </form>
                
            </>
            :
            <>
            <Typography>Thank you for registration!<br/>
            Please сheck your email to confirm your account.</Typography>
            <Link to='/login/'>
            <CustomButton theme='blue' text='Log in'/>
            </Link>
            </>}
            </Stack>
            </div>
            </>
        )
    }
}
export default Signup;