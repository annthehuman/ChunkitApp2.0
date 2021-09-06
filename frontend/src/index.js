import React, {Component} from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import App from './components/app';
import { BrowserRouter as Router, Route } from "react-router-dom";

render(<App />, document.getElementById('root'));

