import React, { Component } from 'react'

class ArticlePage extends Component {
  
  constructor (props) {
    super(props)
    this.state = {
      article: {}
    }
  }

  componentWillMount () {
    const { match } = this.props
    fetch(`http://localhost:8888/book/item/${match.params.cur}/${match.params.id}`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        data.content = data.content.replace(/\n/g, '<br>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
        this.setState({
          article: data
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  handleChange () {
    let $ = window.$
    $(document.body).toggleClass('theme-dark')
  }

  render () {
    return (
      <div>
        <header className="bar bar-nav">
          <a className="icon icon-left pull-left back"></a>
          <a className="icon icon-clock pull-right" onClick={this.handleChange}></a>
          <h1 className="title">{this.state.article.cur}</h1>
        </header>
        <div className="card" style={{"marginTop": "3rem"}}>
          <div className="card-content">
            <div className="card-content-inner" dangerouslySetInnerHTML={{__html: this.state.article.content}}></div>
          </div>
        </div>
      </div>  
    )
  }
}

export default ArticlePage