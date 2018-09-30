import React, { Component } from 'react';
import './App.css';
import ResponsiveDrawer from './Drawer.jsx';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import Landing from './components/Landing.jsx'

const appRoute = () => {
  return (
    <div className="App">
      <ResponsiveDrawer />
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/landing' component={Landing} />
          <Route exact path='/login_redirect' component={Login} />
          <Route path='/' component={appRoute} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
