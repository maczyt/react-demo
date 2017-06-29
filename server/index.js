/**
 * Module depencies
 */
var fs       = require('fs')
var Log      = require('log')
var request  = require('request')
var cheerio  = require('cheerio')
var express  = require('express')
var cors     = require('cors')
var config   = require('./config')

/**
 * System Server app
 */
var app      = express()

/**
 * Variables 
 */
var stream   = fs.createWriteStream('./log/server.log')
var log      = new Log('info', stream)   

/**
 * Tools functions
 */
var doError = function (log, res) {
  log.info('request: ' + config.origin + page + 'throw an error')
  return res.status(500).json({
    status: 'error',
    message: error.message
  })
}

// CORS: 跨域
app.use(cors())

/**
 * GET API
 */
app.get('/:page', function (req, res, next) {
  var page = ~~req.params.page
  
  request(
    config.origin + page,
    function (error, response, body) {
      if (error) {
        return doError(log, res)
      }
      log.info('request success, and return a json')
      var $ = cheerio.load(body)
      var list = $('.page-ranking').find('.books-list').find('a')
      var listArr = []
      list.each(function (idx, item) {
        var obj = {}
        item = $(item)
        obj.id     = item.attr('href')
        obj.id     = obj.id.slice(obj.id.indexOf('/book') + 6, obj.id.length)
        obj.imgSrc = item.find('img').attr('src')
        obj.name   = item.find('.name').text()
        obj.author = item.find('.author').text()
        obj.desc   = item.find('.desc').text()
        listArr.push(obj)  
      })
      log.info('send json: ' + JSON.stringify(listArr))
      res.status(200).json(listArr)
    }
  )
})

/**
 * Request book by id
 */
app.get('/book/:id', function (req, res, next) {
  var id = req.params.id
  request(
    config.book + id,
    function (error, response, body) {
      if (error) {
        return doError(log, res)
      }
      var $ = cheerio.load(body)
      var list = $('#J_chapterList>li')
      var arr  = []
      list.map(function (idx, item) {
        item = $(item).find('a')
        var id = item.attr('href')
        id = id.slice(id.indexOf('/book') + 6, id.length)
        arr.push({
          id: id,
          name: item.text()
        })
      })
      log.info('request success, send a json: ' + JSON.stringify(arr))
      res.status(200).json(arr)
    }
  )
})

/**
 * Request book's item by id
 */
app.get('/book/item/:id/:cur', function (req, res, next) {
  var id = req.params.id + '/' + req.params.cur
  request(
    config.book + id,
    function (error, response, body) {
      if (error) {
        return doError(log, res)
      }
      var $ = cheerio.load(body)
      var content = $('#J_content').find('.content').find('.inner-text').text()
      var cur = $('#J_content').find('.title').find('.current-chapter').text()
      res.status(200).json({
        cur: cur,
        content: content
      })
    }
  )
})

/**
 * Start Server
 * Listening the port 
 */
app.listen(
  config.port, 
  function () {
    log.info('start server and listening on the port:'+config.port)
  }
)