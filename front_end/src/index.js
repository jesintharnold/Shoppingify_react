import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter,Route,Switch} from "react-router-dom";
import Mainitem from './components/Main/MainItems';
import Rightmainbar from './components/Rightsidebar/RightMain';
import {Provider} from 'react-redux';
import  {redux_store} from './Redux/Store';
import HistoryMain from './components/History/History_Main/History_Main';
import Analytics from './components/Analytics/Analytics';
import HistoryExpand from './components/History/History_Expand/HistoryExpand';
import Auth from './Auth/Auth';
import {AuthRedirect,LoginProtect} from './Auth/AuthRedirect';
import Notfound from './Auth/Notfound';
import PrivateRoute from './Auth/Protectedroutes';
import {Toaster} from 'react-hot-toast';


ReactDOM.render(
  <React.StrictMode>
  <Provider store={redux_store}>
  <BrowserRouter>
    <Navbar/> 
    <Toaster containerStyle={{ 
    left:100,
    bottom:100
   }} />
    <Switch>
    <LoginProtect exact path="/login" Comp={Auth} />
    <Route exact path="/login/auth/:id_token/:id" component={AuthRedirect} />
    <PrivateRoute exact path="/" Comp={Mainitem} />
    <PrivateRoute exact path="/history" Comp={HistoryMain}/>
    <PrivateRoute exact path="/history/:history_id" Comp={HistoryExpand}/>
    <PrivateRoute exact path="/analytics" Comp={Analytics}/>
    <Route component={Notfound}/>
    </Switch>
    </BrowserRouter>
    <Rightmainbar/>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
