import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router} from "react-router-dom";
import Mainitem from './components/Main/MainItems';
import Rightmainbar from './components/Rightsidebar/RightMain';
import Additem from './components/Rightsidebar/AddItem/Additem';
ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Navbar/> 
    <Mainitem/>
    </Router>
    <Additem/>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
