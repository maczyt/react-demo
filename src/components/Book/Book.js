import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Book.css'

export default class Book extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="card demo-card-header-pic" >
        <div className="card-header color-white no-border no-padding">
          <img className='card-cover' src={this.props.imgSrc} alt=""/>
        </div>
        <div className="card-content">
          <div className="card-content-inner">
            <p className="color-gray">{this.props.name} / {this.props.author}</p>
            <p>{this.props.desc}</p>
          </div>
        </div>
        <div className="card-footer">
          <Link to={`/book/${this.props.id}`} className="link">点击前往</Link>
        </div>
      </div>
    )
  }
}