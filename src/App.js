import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css'

/**
 * Defined components
 */
import Home from './components/Home/Home'
import BookPage from './components/BookPage/BookPage'
import ArticlePage from './components/ArticlePage/ArticlePage'

class App extends Component {
  
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="page" ref="page">
        <Router>
          <div>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/book/:id" component={BookPage}></Route>
            <Route exact path="/book/item/:cur/:id" component={ArticlePage}></Route>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
