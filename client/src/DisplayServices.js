import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {withServices} from './ServiceProvider'

import "./DisplayServices.css";

import Auto from "./images/auto.png";
import Crafts from "./images/crafts.png";
import Education from "./images/education.png";
import Events from "./images/events.png";
import ResAndComerc from "./images/resandcomerc.png";
import Wellness from "./images/wellness.png";

class DisplayServices extends Component {
  componentDidMount(){
    this.props.getUsers()
  }

  toProfile = () => {
    this.props.history.push(`/userprofile/${this.props.result._id}`)
  }

  render() {
    console.log(this.props.result)
    let { cost, service, serviceName } = this.props.result
    let { firstName, lastName, businessName, city, state } = this.props.result
    let img = ''
    if (service === "auto") {
      img = Auto
    } else if (service === "Crafts") {
      img = Crafts
    } else if (service === "Education") {
      img = Education
    } else if (service === "Events") {
      img = Events
    } else if (service === "home") {
      img = ResAndComerc
    } else if (service === "Wellness") {
      img = Wellness
    }

    return (
      <>
        <div className="serviceCard" onClick={this.toProfile}>
          <div className="serviceType">{service}</div><br></br>
          <img src={img} alt=""/>
          <div className="bisName">{businessName}</div>
          <div className="swapperName">Swapper: {firstName} {lastName}</div>
          <div className="specialty">Specialty: {serviceName}</div>
          <div className="price">Price: ${cost}</div>
          <div className="location">Location: {city}, {state}</div>
        </div>
      </>
    )
  }
}


export default withRouter(withServices(DisplayServices));

