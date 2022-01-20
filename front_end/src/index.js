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
import AuthRedirect from './Auth/AuthRedirect';


ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
  <BrowserRouter>
    <Navbar/> 
    <Switch>
    <Route exact path="/login" component={Auth} />
    <Route exact path="/login/auth/:id_token" component={AuthRedirect} />
    <Route exact path="/" component={Mainitem} />
    <Route exact path="/history" component={HistoryMain}/>
    <Route exact path="/history/:history_id" component={HistoryExpand}/>
    <Route exact path="/analytics" component={Analytics}/>
    </Switch>
    </BrowserRouter>
    <Rightmainbar/>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
