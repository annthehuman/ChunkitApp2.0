import React, { Component } from "react";
import { Stack, Typography, TextField, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../../../common_components/logo";
import CustomHeader from "../../../common_components/header";
import CustomButton from "../../../common_components/button";
import {InputAdornment} from "@mui/material";
import {IconButton} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

class PasswordReset extends Component{
    constructor(props) {
        super(props);
        this.state = {newPassword: "", 
                      confirmNewPassword: "", 
                      passwordReseted: false,
                      showPassword: false,
                      showConfirmPassword: false,
                      passValid: true};
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
        // alert('A username and password was submitted: ' + this.state.username + " " + this.state.password);
        event.preventDefault();
        fetch('/auth/users/reset_password_confirm/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                uid: this.props.match.params.uid,
                token: this.props.match.params.token,
                new_password: this.state.newPassword,
                re_new_password: this.state.confirmNewPassword
            })
            }).then(data => {
                if (!data.ok){
                    throw Error(data.status);
                } else {
                    this.setState({passwordReseted: true})
                }
            }).catch((data) => {
               alert(data)
            });
    }

    render() {
        return (
            <div style={{'width': '70%', 'margin': 'auto'}}>
            <form onSubmit={this.handleSubmit}>
            <Stack direction='column' spacing={2} mt={'35px'} alignItems="center">
            {!this.state.passwordReseted ? 
            <>
                <Logo/>
                <CustomHeader text='ChunkitApp 2.0'/>
                <Typography>Set new password</Typography>
                <TextField 
                    name="newPassword" 
                    id="newPassword" 
                    sx={{ width:'244px' }}
                    label="New password" 
                    variant="outlined" 
                    value={this.state.newPassword}
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
                    name="confirmNewPassword" 
                    id="confirmNewPassword" 
                    sx={{ width:'244px' }}
                    label="Confirm new password" 
                    variant="outlined" 
                    value={this.state.confirmNewPassword}
                    onChange={this.handleChange}
                    error = {!this.state.passValid}
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
                <CustomButton text='Submit' theme='blue' type="submit" value="Submit" />
                </>
            :
            <>
                <Typography>Your password was successfully reset!</Typography>
                <Link to='/login/'>
                <CustomButton theme='black' text='Log in' type="button" />
                </Link> 
            </>}
            </Stack>
            </form> 
            
            </div>
        )
    }
}
export default PasswordReset;