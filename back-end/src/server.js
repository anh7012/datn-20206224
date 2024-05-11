const express = require('express')
var bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const route = require('./routes/index')
const  cors = require('cors')

const app = express()
const port = 7012

// parse application
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cookie

app.use(cors());
app.use(cookieParser());
// Route init
route(app)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})