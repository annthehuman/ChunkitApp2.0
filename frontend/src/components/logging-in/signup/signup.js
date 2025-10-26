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
            errorSingup: [],
            activationStatus: null,
            errorMessage: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleClickShowConfirmPassword = this.handleClickShowConfirmPassword.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
        this.handleAutoActivate = this.handleAutoActivate.bind(this);
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

    handleAutoActivate() {
        // For development mode - try to auto-activate the user
        this.setState({ activationStatus: 'activating' });
        
        // Try to activate the user by making a request to the auto-activation endpoint
        // This is a development-only feature
        fetch('/auto_activate/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                this.setState({ 
                    activationStatus: 'success',
                    emailSended: false 
                });
                // Redirect to login after successful activation
                setTimeout(() => {
                    this.props.history.push('/login/');
                }, 2000);
            } else {
                this.setState({ 
                    activationStatus: 'error',
                    errorMessage: data.error || 'Activation failed'
                });
            }
        })
        .catch(error => {
            console.error('Auto-activation error:', error);
            this.setState({ activationStatus: 'error' });
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
            {this.state.activationStatus === 'success' ? (
                <>
                <Typography color="success.main">Account activated successfully!<br/>
                Redirecting to login...</Typography>
                </>
            ) : this.state.activationStatus === 'error' ? (
                <>
                <Typography color="error.main">Auto-activation failed.<br/>
                {this.state.errorMessage && <span>{this.state.errorMessage}</span>}
                Please check the console logs for the activation link.</Typography>
                <Typography variant="body2" sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1, fontSize: '0.875rem' }}>
                    <strong>Development Mode:</strong><br/>
                    Check the console logs for the activation link:<br/>
                    <code>docker-compose logs app | grep -A 20 "activation"</code>
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Link to='/login/'>
                        <CustomButton theme='blue' text='Log in'/>
                    </Link>
                    <CustomButton 
                        theme='green' 
                        text='Try Auto-activate Again' 
                        onClick={this.handleAutoActivate}
                    />
                </Stack>
                </>
            ) : this.state.activationStatus === 'activating' ? (
                <>
                <Typography>Activating your account...</Typography>
                </>
            ) : (
                <>
                <Typography>Thank you for registration!<br/>
                Please check your email to confirm your account.</Typography>
                
                {/* Development mode instructions */}
                <Typography variant="body2" sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1, fontSize: '0.875rem' }}>
                    <strong>Development Mode:</strong><br/>
                    Check the console logs for the activation link:<br/>
                    <code>docker-compose logs app | grep -A 20 "activation"</code><br/>
                    Or click the button below to auto-activate (dev only).
                </Typography>
                
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Link to='/login/'>
                        <CustomButton theme='blue' text='Log in'/>
                    </Link>
                    <CustomButton 
                        theme='green' 
                        text='Auto-activate (Dev)' 
                        onClick={this.handleAutoActivate}
                    />
                </Stack>
                </>
            )}
            </>}
            </Stack>
            </div>
            </>
        )
    }
}
export default Signup;