const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser') //From express version 4, body-parser is seperated from express module
const cors = require('cors')
const axios = require('axios')
const multer = require('multer')

const { spawn } = require('child_process');

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({ extended: true }));
/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json())

app.use(cors())

app.get('/', function (req, res) {
  res.send('This is Circuit Simulator Server')
})

app.post('/example-1', function (req, res) {
  var data = req.body
  var output = "";
  var pyCommand = spawn('python', ['server/lib/execute/cs-example-1.py', data.trise,
    data.tfall,
    data.tdelay,
    data.twidth,
    data.vm,
    data.tfly,
    data.z0,
    data.zs,
    data.zl,
    data.tmax])

  var sentResult = function (result) {
    var lltlData = result.toString();

    console.log("Set chart data back to client")
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({ "data_chart": lltlData }))
  }

  pyCommand.stdout.on('data', (result) => {
    output += result.toString('utf8');
  });

  pyCommand.on('exit', (result) => {
    sentResult(output);
  });
})

app.post('/get-chart-data-by-netlist', function (req, res) {
  var data = req.body.netList
  var output = "";
  var pyCommand = spawn('python', ['server/lib/execute/cs-netlist-reading.py', data])

  var sentResult = function (result) {
    var lltlData = result.toString();

    console.log("Set chart data back to client")
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({ "data_chart": lltlData }))
  }

  pyCommand.stdout.on('data', (result) => {
    output += result.toString('utf8');
  });

  pyCommand.on('exit', (result) => {
    sentResult(output);
  });
})

/**
 ... express.js boilerplate
 routes, middlewares, helpers, loggers, etc
**/

// configuring Multer to use files directory for storing files
// this is important because later we'll need to access file path
const storage = multer.diskStorage({
  destination: './files',
  filename(req, file, cb) {
    cb(null, `${new Date()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// express route where we receive files from the client
// passing multer middleware
app.post('/files', upload.single('file'), (req, res) => {
  const file = req.file; // file passed from client
  const meta = req.body; // all other values passed from the client, like name, etc..\

  if (file != undefined) {
    res.status(200)
    res.send("successful")
  } else {

    res.status(500)
    res.send("fail")
  }
});

// define the folder that will be used for static assets
app.use(express.static(path.join(__dirname, 'data')));

app.listen(3333, function () {
  console.log('Circuit Simulator Server listening on port 3333!')
})
