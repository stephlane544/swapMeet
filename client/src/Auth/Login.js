import React, { Component } from 'react';
import { withServices } from "../ServiceProvider";
import '../Login.css'
import {withRouter} from 'react-router-dom'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            login: true,
            user: {
                firstName: '',
                lastName: '',
                profileImage: '',
                username: '',
                password: '',
                phoneNumber: '',
                email: '',
                city: '',
                state: '',
                service: '',
                serviceType: '',
                serviceDescription: '',
                businessName: '',
                cost: ''
            },
            errorMessage: ''
        }
    }

    handleChange = e => {
        let {name, value} = e.target
        this.setState(prevState => {
            return {
                user: {
                    ...prevState.user,
                    [name]: value
                }
            }
        })
    }

    

    handleSubmit = e => {
        let error
        e.preventDefault()
        if(this.state.login){
            const userInfo = {username: this.state.user.username, password: this.state.user.password}
            this.props.login(userInfo).catch(err => {
                error = err
                this.setState({errorMessage: err.response.data.message})
            }).then(() => {
                if(!error) return this.props.history.push(`/userprofile/${this.state.user.username}`)
            })
        }else{
            const userInfo = this.state.user
            this.props.signup(userInfo).catch(err => {
                error = err
                this.setState({errorMessage: err.response.data.message})
            }).then(() => {
                if(!error){this.props.history.push(`/userprofile/${this.state.user.username}`)}
            })
        }

    }
    
    changeForm = e => {
        e.preventDefault();
        this.setState(prevState => ({
            login: !prevState.login,
            errorMessage: ''
        }))
    }

    render() {
        console.log(this.state)
        return (
            <div className='loginBackground'>
                {this.state.login ? 
                    <div className='loginForm'>
                        {this.state.errorMessage ?
                            <div className='errorMessageContainer'>
                                <div className='errorMessage'>{this.state.errorMessage}</div>
                            </div>
                        :
                            null
                        }
                        <form className='form' onSubmit={this.handleSubmit}>
                            <input type="text"
                            placeholder="Username:"
                            name="username"
                            value={this.state.user.username}
                            onChange={this.handleChange} required/>
                            <input type="password"
                            placeholder="Password:"
                            name="password"
                            value={this.state.user.password}
                            onChange={this.handleChange} required/>
                            <button className='submitButton'>Submit</button>
                        </form>
                        <br/>
                        <form className='toggleForm' onSubmit = {this.changeForm}>
                            <button className='toggleButton'>New user? Sign up</button>
                        </form>
                    </div>
                    

                :


                    <div className='signUpForm'>
                        {this.state.errorMessage ?
                            <div className='errorMessage'>{this.state.errorMessage}</div>
                        :
                            null
                        }
                        <form className='form' onSubmit={this.handleSubmit}>
                            <input 
                            className='signUpInputs' 
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            value={this.state.user.firstName}
                            onChange={this.handleChange} />
                            <input 
                            className='signUpInputs' 
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            value={this.state.user.lastName}
                            onChange={this.handleChange} />
                            <input 
                            className='signUpInputs' 
                            type="text"
                            placeholder="Profile Image Url"
                            name="profileImage"
                            value={this.state.user.profileImage}
                            onChange={this.handleChange} />
                            <input 
                            className='signUpInputs' 
                            type="number"
                            placeholder="Phone Number"
                            name="phoneNumber"
                            value={this.state.user.phoneNumber}
                            onChange={this.handleChange} />
                            <input 
                            className='signUpInputs' 
                            type="email"
                            placeholder="youremailhere@swapper.com"
                            name="email"
                            value={this.state.user.email}
                            onChange={this.handleChange} />
                            <input 
                            className='signUpInputs' 
                            type="text"
                            placeholder="City"
                            name="city"
                            value={this.state.user.city}
                            onChange={this.handleChange} />
                            <input 
                            className='signUpInputs' 
                            type="text"
                            placeholder="State"
                            name="state"
                            value={this.state.user.state}
                            onChange={this.handleChange} />
                            <input 
                            className='signUpInputs' 
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={this.state.user.username}
                            onChange={this.handleChange} />
                            <input 
                            className='signUpInputs' 
                            type="text"
                            placeholder="Password"
                            name="password"
                            value={this.state.user.password}
                            onChange={this.handleChange} />
                            <input 
                            className='signUpInputs' 
                            type="text"
                            placeholder="Business Name"
                            name="businessName"
                            value={this.state.user.businessName}
                            onChange={this.handleChange} />
                            <input 
                            className='signUpInputs' 
                            type="text"
                            placeholder="Service"
                            name="service"
                            value={this.state.user.service}
                            onChange={this.handleChange} />
                            <input 
                            className='signUpInputs' 
                            type="text"
                            placeholder="Service Type"
                            name="serviceType"
                            value={this.state.user.serviceType}
                            onChange={this.handleChange} />
                            <textarea 
                            className='signUpInputs' 
                            type="text"
                            placeholder="Service Description"
                            name="serviceDescription"
                            value={this.state.user.serviceDescription}
                            onChange={this.handleChange} />
                            <input 
                            className='signUpInputs' 
                            type="number"
                            placeholder="Cost"
                            name="cost"
                            value={this.state.user.cost}
                            onChange={this.handleChange} />
                            <button className='submitButton'>Submit</button>
                        </form>
                        <br/>
                        <form className='toggleForm' onSubmit = {this.changeForm}>
                            <button className='toggleButton'>Already a user? Login</button>
                        </form>
                    </div>
                }
            </div>
        );
    }
}

export default withRouter(withServices(Login));