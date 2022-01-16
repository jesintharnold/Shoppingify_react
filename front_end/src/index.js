import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter,Route,Switch} from "react-router-dom";
import Mainitem from './components/Main/MainItems';
import Rightmainbar from './components/Rightsidebar/RightMain';
import {Provider} from 'react-redux';
import store from './Redux/Store';
import HistoryMain from './components/History/History_Main/History_Main';
import Analytics from './components/Analytics/Analytics';
import HistoryExpand from './components/History/History_Expand/HistoryExpand';
import Auth from './Auth/Auth';


ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
  <BrowserRouter>
    <Navbar/> 
    <Switch>
    <Route exact path="/login" children={<Auth/>} />
    <Route exact path="/" children={<Mainitem/>} />
    <Route exact path="/history" children={<HistoryMain/>}/>
    <Route exact path="/history/:history_id" children={<HistoryExpand/>}/>
    <Route exact path="/analytics" children={<Analytics/>}/>
    </Switch>
    </BrowserRouter>
    <Rightmainbar/>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
