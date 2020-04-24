import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomeView from './views/Home.view';
import RegisterView from './views/Register.view';
import LoginView from './views/Login.view';
import GoodbyeView from './views/Goodbye.view';
import LibraryView from './views/Library.view';

function App() {
  return (
    <Router>
        <Switch>
            <Route path="/" exact component={HomeView} />
            <Route path="/Register" component={RegisterView} />
            <Route path="/Login" component={LoginView} />
            <Route path="/Library" component={LibraryView} />
            <Route path="/Goodbye" component={GoodbyeView} />
        </Switch>
    </Router>
  );
}

export default App;
