import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from "react-router-dom";
import ServiceProvider from "./ServiceProvider.js";

import App from './App';

ReactDOM.render(
    <BrowserRouter>
        <ServiceProvider>
            <App />
        </ServiceProvider>
    </BrowserRouter>, 
document.getElementById('root'));

