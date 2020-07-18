import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './components/nav/Nav';
import Blog from './components/Blog/Blogs';
import PostPage from './components/PostPage/PostPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={Blog} />
          <Route exact path="/blog/:id" component={PostPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
