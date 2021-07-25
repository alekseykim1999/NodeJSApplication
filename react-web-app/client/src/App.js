import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './components/mainPage/MainPage';
import DataPage from './components/dataPage/DataPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



class App extends Component {

  render(){
    return (
      <div className="App">
        <Router>
        <nav>
            <Link to="/">Main Page</Link>
            <br/>  
            <Link to="/data">Data Page</Link>  
        </nav>
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/data" component={DataPage} />
            </Switch>
        </Router>
  
    </div>
    );
  }
  
}

export default App;
