import React from "react";
import "./SideDrawer.css";
import {withServices} from './ServiceProvider'
import { Link } from "react-router-dom";

import home from "./images/home.png";


const SideDrawer = (props) => {

    let drawerClasses = "sideDrawer";
    if (props.show) {
        drawerClasses = "sideDrawer open";
    }

    return  (
        <div className={drawerClasses}>
            <ul><Link to="/"><img onClick={props.drawerClickHandler} src={home} alt=""/></Link></ul>
            <ul><Link onClick={props.drawerClickHandler} to="/auto">auto</Link></ul>
            <ul><Link onClick={props.drawerClickHandler} to="/crafts">crafts</Link></ul>
            <ul><Link onClick={props.drawerClickHandler} to="/education">education</Link></ul>
            <ul><Link onClick={props.drawerClickHandler} to="/events">event coordination</Link></ul>
            <ul><Link onClick={props.drawerClickHandler} to="/residentialandcommercial">residential & commercial</Link></ul>
            <ul><Link onClick={props.drawerClickHandler} to="/wellness">wellness</Link></ul>
        </div>
    )
}

export default withServices(SideDrawer);