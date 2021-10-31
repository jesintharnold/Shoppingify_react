import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router} from "react-router-dom";
import Mainitem from './components/Main/MainItems';
import Rightmainbar from './components/Rightsidebar/RightMain';
import Additem from './components/Rightsidebar/AddItem/Additem';
import {Provider} from 'react-redux';
import store from './Redux/Store';

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <Router>
    <Navbar/> 
    <Mainitem/>
    </Router>
    <Rightmainbar/>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
