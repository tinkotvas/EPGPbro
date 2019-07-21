const express = require('express')
const fs = require('fs')
const https = require('https')
const app = express()
const port = 1337;

app.use(express.static('dist/EPGPbro'));


app.listen(port, () => console.log(`Running on port ${port}!`))

// https.createServer({
//   key: fs.readFileSync('server.key'),
//   cert: fs.readFileSync('server.cert')
// }, app)
// .listen(443, function () {
//   console.log('Example app listening on port 443! Go to https://localhost:443/')
// })