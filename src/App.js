import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './components/nav/Nav';
import Blog from './components/Blog/Blogs';
import PostPage from './components/PostPage/PostPage';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import UserPage from './components/userPage/userProfile';
import UserPosts from './components/userPage/userPosts';
import AddPost from './components/AddPost/AddPost';
import EditPost from './components/AddPost/EditPost';
import UserEditForm from './components/userPage/UserEditForm';

import { connect } from 'react-redux';
import { checkAuth } from './store/actions/index';

import PrivateRoute from './helpers/PrivateRoute';


function App({ checkAuth }) {

  checkAuth();

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={Blog} />
          <Route exact path="/blog/:id" component={PostPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />

          <PrivateRoute exact path="/user/edit" component={UserEditForm} />
          <PrivateRoute exact path="/user/:id" component={UserPosts} />
          <PrivateRoute exact path="/user" component={UserPage} />
          <PrivateRoute exact path="/blog/:id/edit" component={EditPost} />
          <PrivateRoute exact path="/new" component={AddPost} />

        </Switch>
      </div>
    </Router>
  );
}

export default connect(null, { checkAuth })(App);
