import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class BookPage extends Component {
  
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      cur: 0,
      len: 200
    }
  }

  componentWillMount () {
    const { match } = this.props
    fetch(`http://localhost:8888/book/${match.params.id}`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        this.setState({
          list: this.state.list.concat(data)
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  render () {
    const { match } = this.props
    return (
      <div> 
        <header className="bar bar-nav">
            <a className="icon icon-left pull-left back"></a>
            <h1 className="title">阅读愉快~~</h1>
        </header>
        <div className="content infinite-scroll infinite-scroll-bottom" data-distance="100">
            <div className="list-block contacts-block">
                <div className="list-group">
                  <ul>
                  {
                    this.state.list.slice(this.state.cur, this.state.len).map((item, idx) => {
                      return (
                        <li key={this.state.cur + idx}>
                          <div className="item-content">
                            <div className="item-inner">
                              <div className="item-title">{item.name}</div>
                              <Link to={`/book/item/${item.id}`} className="link pull-right">前往</Link>
                            </div>
                          </div>
                        </li>
                      )
                    })
                  }
                  </ul>
                </div>
            </div>
            <div className="infinite-scroll-preloader">
                <div className="preloader"></div>
            </div>
        </div>
      </div>
    )
  }
}

export default BookPage