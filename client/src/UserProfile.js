import React, { Component } from 'react';
import {withServices} from './ServiceProvider'
import EditButton from './images/edit.png'
import cashMonay from "./images/cashMonay.png";
import './UserProfile.css'


class UserProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            users: JSON.parse(localStorage.getItem('users')) || [],
            edit: false,
            _id: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            city: '',
            state: '',
            username: '',
            password: '',
            profileImage: '',
            cost: '',
            service: '',
            serviceType: '',
            serviceDescription: '',
            businessName: '',
            swapBucks: ''
        }
    }

    componentDidMount(){
        if (this.props.token && this.props.match.params.username === this.props.user.username){
            let { cost, service, serviceType, businessName, city, email, firstName, lastName, phoneNumber, username, serviceDescription, state, profileImage, swapBucks  } = this.props.user
            this.setState({firstName, lastName, profileImage, email, phoneNumber, city, state, username, cost, service, serviceType, businessName, serviceDescription, swapBucks})
        }else if(this.props.match.params.username){
            const currentUser = this.state.users.find(user => user._id === this.props.match.params.username)
            let { cost, service, serviceType, businessName, city, email, firstName, lastName, phoneNumber, username, serviceDescription, state, profileImage, swapBucks  } = currentUser
            this.setState({firstName, lastName, profileImage, email, phoneNumber, city, state, username, cost, service, serviceType, businessName, serviceDescription, swapBucks})
        }
        
    }

    componentWillReceiveProps(){
        let { cost, service, serviceType, businessName, city, email, firstName, lastName, phoneNumber, username, serviceDescription, state, profileImage, swapBucks  } = this.props.user
        this.setState({firstName, lastName, profileImage, email, phoneNumber, city, state, username, cost, service, serviceType, businessName, serviceDescription, swapBucks})
    }

    toggleEdit = () => {
        this.setState(prevState => ({
            edit: !prevState.edit
        }))
    }

    hireSwapper = () => {
        if(this.props.token && this.props.match.params.username !== this.props.user.username){
            console.log(this.props.user.swapBucks)
            if(this.props.user.swapBucks - this.state.cost > 0){
                let newSwapBucks = this.props.user.swapBucks - this.state.cost
                this.props.editUser({swapBucks: newSwapBucks})
                console.log(newSwapBucks)
                console.log(this.props.user.swapBucks)
                newSwapBucks = this.state.swapBucks + this.state.cost
                this.setState({
                    swapBucks: newSwapBucks
                })
                this.props.editSwapper(this.props.match.params.username, {swapBucks: newSwapBucks})
                console.log(newSwapBucks)
                console.log(this.state.swapBucks)
                alert(`You have paid swapper ${this.state.username}, ${this.state.firstName} ${this.state.lastName}, $${this.state.cost} Swap Bucks.  You have ${this.props.user.swapBucks} Swap Bucks remaining. Please contact them at ${this.state.phoneNumber} or email them at ${this.state.email} to get your services.`)
            }else if(this.props.user.swapBucks - this.state.cost <= 0){
                alert(`You don't have enough Swap Bucks to hire swapper ${this.state.username}. You currently have ${this.props.user.swapBucks} Swap Bucks.`)
            }
        }else{
            alert(`You are not currently logged in. Please log in to hire this swapper.`)
        }
    }

    handleSubmit = e => {
        const editedUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            city: this.state.city,
            state: this.state.state,
            username: this.state.username,
            password: this.state.password,
            profileImage: this.state.profileImage,
            cost: this.state.cost,
            service: this.state.service,
            serviceType: this.state.serviceType,
            businessName: this.state.businessName,
            serviceDescription: this.state.serviceDescription
        }
        
        this.props.editUser(editedUser)
        this.toggleEdit()
    }

    handleChange = e =>{
        this.setState({[e.target.name]:e.target.value})
    }

    render() {
        let { firstName, lastName, username, city, state, email, phoneNumber, profileImage, swapBucks, edit, cost, service, serviceDescription, businessName} = this.state
        return (
            <div className='userProfileBackground'>
                {this.props.token && this.props.match.params.username === this.props.user.username ?
                    <>
                        {edit ?
                            <div className='loginBackground'>
                                <form onSubmit={this.handleSubmit} className='editUserForm'>
                                    <input 
                                        type="text" 
                                        value={this.state.firstName} 
                                        placeholder='First Name'
                                        name='firstName'  
                                        onChange={this.handleChange} />
                                    <input 
                                        type="text" 
                                        value={this.state.lastName} 
                                        placeholder='Last Name'
                                        name='lastName'  
                                        onChange={this.handleChange} />
                                    <input 
                                        type="text" 
                                        value={this.state.profileImage} 
                                        placeholder='Profile Image' 
                                        name='profileImage'  
                                        onChange={this.handleChange} />
                                    <input 
                                        type="number" 
                                        value={this.state.phoneNumber} 
                                        placeholder='Phone Number' 
                                        name='phoneNumber' 
                                        onChange={this.handleChange} />
                                    <input 
                                        type="text" 
                                        value={this.state.email} 
                                        placeholder='Email' 
                                        name='email' 
                                        onChange={this.handleChange} />
                                    <input 
                                        type="text" 
                                        value={this.state.city} 
                                        placeholder='City' 
                                        name='city' 
                                        onChange={this.handleChange} />
                                        <input 
                                        type="text" 
                                        value={this.state.state} 
                                        placeholder='State' 
                                        name='state' 
                                        onChange={this.handleChange} />
                                        <input 
                                        type="text" 
                                        value={this.state.username}
                                        placeholder='Username' 
                                        name='username' 
                                        onChange={this.handleChange} />
                                        <input 
                                        type="text" 
                                        value={this.state.password}
                                        placeholder='Password' 
                                        name='password' 
                                        onChange={this.handleChange} />
                                        <input 
                                        type="text" 
                                        value={this.state.cost}
                                        placeholder='Cost' 
                                        name='cost' 
                                        onChange={this.handleChange} />
                                        <input 
                                        type="text" 
                                        value={this.state.service}
                                        placeholder='Service' 
                                        name='service' 
                                        onChange={this.handleChange} />
                                        <input 
                                        type="text" 
                                        value={this.state.serviceType}
                                        placeholder='Service Type' 
                                        name='serviceType' 
                                        onChange={this.handleChange} />
                                        <input 
                                        type="text" 
                                        value={this.state.businessName}
                                        placeholder='Business Name' 
                                        name='businessName' 
                                        onChange={this.handleChange} />
                                        <textarea
                                        type="text" 
                                        value={this.state.serviceDescription}
                                        placeholder='Service Description' 
                                        name='serviceDescription' 
                                        onChange={this.handleChange} />
                                        <button className='submitButton'>SAVE</button>
                                </form>
                            </div>
                        :
                            <div className="profileContainer">
                                <div className="profileStarter">
                                    <img  className='profileImage' src={profileImage} alt=""/>
                                    <div className='nameMoneyContainer'>
                                        <div className="profileSwapperName">SWAPPER NAME: {username}</div>
                                        <div  className="profileBucks">
                                            <img className="cashMonay" src={cashMonay} alt=""/>
                                            <div className='profileBucksAmount'>Swap Bucks: ${swapBucks}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="userProfileInfo">
                                    <div className="profileBisName">{businessName}</div>
                                    <div className="profileName">{firstName} {lastName}</div>
                                    <div className="profileService">{service}</div>
                                    <div className="profileCost">Service Cost: ${cost}</div>
                                    <div className="profileServiceDescription">{serviceDescription}</div><br></br>
                                    <div className="profileContact">
                                        <div className="profileContactTitle">Contact:</div>
                                        <div className="profileLocation">Location: {city}, {state}</div>
                                        <div>Phone Number: {phoneNumber}</div>
                                        <div>{email}</div>
                                    </div>
                                    <div className='editButtonContainer'>
                                        <img className='editButton' onClick={this.toggleEdit} src={EditButton} alt=""/>
                                    </div>
                                </div>
                            </div>
                        }
                    </>
                :
                    <>
                        <div className="profileContainer">
                            <div className="profileStarter">
                                <img  className='profileImage' src={profileImage} alt=""/>
                                <div className="profileSwapperName">SWAPPER NAME: {username}</div>
                            </div>
                            <div className="profileInfo">
                                <div className="profileBisName">{businessName}</div>
                                <div className="profileName">{firstName} {lastName}</div>
                                <div className="profileService">{service}</div>
                                <div className="profileCost">Service Cost: ${cost}</div>
                                <div className="profileServiceDescription">{serviceDescription}</div><br></br>
                                <div className="profileContact">
                                    <div className="profileContactTitle">Contact:</div>
                                    <div className="profileLocation">Location: {city}, {state}</div>
                                    <div>Phone Number: {phoneNumber}</div>
                                    <div>{email}</div>
                                </div>
                            </div>
                            <button onClick={this.hireSwapper} className="profileHireBtn">Hire Me!</button>
                        </div>
                    </>
                }
            </div>
        );
    }
}

export default withServices(UserProfile);