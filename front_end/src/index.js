import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router} from "react-router-dom";
import Mainitem from './components/Main/MainItems';

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Navbar/>
    <Mainitem/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
