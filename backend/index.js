var express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser');
const config=require('./src/config');
const helmet = require('helmet')
const cors = require("cors");

var routes=require('./src/routes');
var authMiddleware=require('./src/authMiddleware');
var app = express();
var port = process.env.PORT || 3003;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());
//app.use(helmet());
app.use(cors({
  origin:['http://localhost:8080'],
  credentials: true
}))
app.set('superSecret',config.secret);

app.use(express.static(path.join(__dirname, 'dist')))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api',routes);

app.get("/api/getUsers", authMiddleware, (req, res) => {

  res.json({})
})


// app.use('/',routes);
app.listen(port, () => {
  console.log(`App running on localhost:${port}.`)
});