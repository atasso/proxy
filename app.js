const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(cors());
app.use(bodyParser.json());


app.get('*', (req, res) => {
    console.log(req.url)
  request(
    { 
        url: 'https://mobile.digistat.it' + req.url,
    headers: {
        Authorization: req.headers.authorization
    }
 },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: response.statusCode });
      }

      res.json(JSON.parse(body));
    }
  )
});
app.post('*', (req, res) => {
    console.log(req.url)
    request.post({
        url: 'https://mobile.digistat.it' + req.url,
        headers: {
            Authorization: req.headers.authorization,
        
        },
        json: true,
        body: req.body
      }, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error ? error.message : response.statusCode });
      }

      res.send(200);
      });
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));