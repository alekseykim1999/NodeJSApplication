import React, { Component } from 'react';
import './App.css';
import MainPage from './components/mainPage/MainPage';
import DataPage from './components/dataPage/DataPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {Nav, Navbar, Container}from 'react-bootstrap';


class App extends Component {

  render(){
    return (
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Container>
          <Navbar.Brand>Test Project</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/data">Students</Nav.Link>
          </Nav>
          </Container>
        </Navbar>
        <Router>
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/data" component={DataPage} />
            </Switch>
        </Router>
        <footer className="footer">Created By Aleksey Kim</footer>
    </div>
    );
  }
  
}

export default App;
