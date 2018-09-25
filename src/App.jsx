import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ResponsiveDrawer from './Drawer.jsx';
import { BrowserRouter } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <ResponsiveDrawer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
