import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomeView from './views/Home.view';
import RegisterView from './views/Register.view';

function App() {
  return (
    <Router>
        <Switch>
            <Route path="/" exact component={HomeView} />
            <Route path="/Register" component={RegisterView} />
        </Switch>
    </Router>
  );
}

export default App;
