import React, { Component } from 'react'

/**
 * Require components
 */
import Book from '../Book/Book'

class Home extends Component {

  constructor (props) {
    super(props)
    this.state = {
      books: []
    }
  }

  componentWillMount () {
    fetch('http://localhost:8888/1')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        this.setState({
          books: data
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  render () {
    return (
      <div>
        <header className="bar bar-nav">
          <h1 className="title">追书最热榜Top100</h1>
        </header>
        <div className="content">
          {
            this.state.books.map((book, idx) => {
              return <Book {...book} key={idx}></Book>
            })
          }
        </div>
      </div>
    )
  }
}

export default Home