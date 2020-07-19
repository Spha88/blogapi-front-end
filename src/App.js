import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './components/nav/Nav';
import Blog from './components/Blog/Blogs';
import PostPage from './components/PostPage/PostPage';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

import { connect } from 'react-redux';
import { checkAuth } from './store/actions/index';

function App({ checkAuth }) {

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={Blog} />
          <Route exact path="/blog/:id" component={PostPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </div>
    </Router>
  );
}

export default connect(null, { checkAuth })(App);
