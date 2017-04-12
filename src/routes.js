// src/routes.js
import React from 'react';
import { Router, Route, Switch} from 'react-router';

import App from './components/App';
import About from './components/About';
import NotFound from './components/NotFound';
import Landing from './components/Landing';
import SmartActs from './components/SmartActs';
import Ocr from './components/OCRtest';


const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/about" component={About} />
    <Route path="/landing" component={Landing} />
    <Route path="/smartacts" component={SmartActs} />
    <Route path="/ocr" component={Ocr} />
   	<Route path="*" component={NotFound} />
  </Router>
);

export default Routes;