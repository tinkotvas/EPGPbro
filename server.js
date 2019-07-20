var express = require('express')
var fs = require('fs')
var https = require('https')
var app = express()

app.use(express.static('dist/EPGPbro'))

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
.listen(443, function () {
  console.log('Example app listening on port 443! Go to https://localhost:443/')
})