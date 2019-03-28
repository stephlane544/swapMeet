import React, { Component } from 'react';
import "./DrawerToggleButton.css";
import {withServices} from './ServiceProvider'
import { withRouter } from 'react-router-dom'

import swapmeetLogo from "./images/swapmeetLogo.png";
import login from "./images/login.png";


class NavBar extends Component {
  
    toLogin = () => {
        this.props.history.push(`/login`)
    }
    
    toProfile = () => {
        this.props.history.push(`/userprofile/${this.props.user.username}`)

    }

    toHome = () => {
        this.props.history.push(`/`)
    }

    render() {
        console.log(this.props)
        return (
            <>
                <nav className="navigation">
                    <button className="toggleBtn" onClick={this.props.drawerClickHandler}>
                        <div className="toggleBtnLine"></div>
                        <div className="toggleBtnLine"></div>
                        <div className="toggleBtnLine"></div>
                    </button>
                    <img className="logo" src={swapmeetLogo} onClick={this.toHome} alt=""/>
                    {this.props.token ?
                        <div className='navLoginContainer'>
                            <div className="loginOnHome">
                                <img  onClick={this.toProfile} className="navItems" src={login} alt=""/>
                                <div  onClick={this.props.logout} className="loginText">Logout</div>
                            </div>
                        </div>
                    :
                        <div className='navLoginContainer'>
                            <div onClick={this.toLogin} className="loginOnHome">
                                <img className="navItems" src={login} alt=""/>
                                <div className="loginText">Login | Sign Up</div>
                            </div>
                        </div>
                    }
                    
                    
                </nav>
            </>
        );
    }
}

export default withRouter(withServices(NavBar));