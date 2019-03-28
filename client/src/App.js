import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

import SideDrawer from "./SideDrawer.js";
import Backdrop from "./Backdrop.js"


import './App.css';
import Login from './Login'
import UserProfile from './UserProfile'

import NavBar from "./NavBar.js";
import Home from "./Home.js";
import Auto from "./Auto.js";
import Crafts from "./Crafts.js";
import Education from "./Education";
import Events from "./Events";
import ResidentialandCommercial from "./ResidentialAndCommercial";
import Wellness from "./Wellness";


class App extends Component {
   constructor() {
    super() 

    this.state = {
        sideDrawerOpen: false
    }
  }

  // componentWillUnmount(){
  //   console.log(window.location.href)
  // }

  drawerToggleClickHandler = () => {
     this.setState((prevState) => {
       return {sideDrawerOpen: !prevState.sideDrawerOpen};
     });
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  };

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }
    
    return (
      <div style={{minHeight: '80vh' }}>
        <NavBar drawerClickHandler={this.drawerToggleClickHandler}/>
        <SideDrawer show={this.state.sideDrawerOpen} drawerClickHandler={this.drawerToggleClickHandler}/>
        {backdrop}

       <Switch >
          <Route exact path = "/" component={Home}/>
          <Route path="/auto" component={Auto} />
          <Route path="/crafts" component={Crafts}/>
          <Route path="/education" component={Education}/>
          <Route path="/events" component={Events}/>
          <Route path="/residentialandcommercial" component={ResidentialandCommercial}/>
          <Route path="/wellness" component={Wellness}/>
          <Route path='/login' component={Login} />
          <Route path='/userprofile/:username' component={UserProfile} />
       </Switch>
      </div>
    );
  }
}

export default App;
