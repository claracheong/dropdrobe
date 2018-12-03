// imports-dependencies
const express = require('express');

// define variables
const app = express();

//const AmazonScraper = require('amazon-scraper')
const config = require('./config.json')

//const amazon_scraper = AmazonScraper(config);
// enable CORS on /list route only
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// body
// Read verb          // request and send
app.get('/main', function(req, res) {
// array of objects
  const data = [{
    style: 'casual',
    definition: 'basics, essentials, everyday, easy, relaxed',
    image: 'https://notredame.box.com/shared/static/408cbkofqigvcrtddwl0bv5ptjrvwchj.jpg',
    inventory: 1,
    price: '$',
    likes: 0},
    {style: 'athleisure',
    definition: '',
    image: '',
    inventory: 1,
    price: '$$',
    likes: 0},
    {style: 'dressy',
    definition: '',
    image: '',
    inventory: 1,
    price: '$$$',
    likes: 0}]
  res.status(200).send(data)
});

app.get('/looks/casual', function(req, res) {
  const data = [{
    look: 'elixaberh',
    shoes: 'https://notredame.box.com/shared/static/s2vcwd3xphq57flmmg2gsjj4pxozvq3l.jpg',
    rings: 'https://notredame.box.com/shared/static/vmx1j5mwq6fnefd13nb8g765c5jqcwky.jpg',
    necklace: 'https://notredame.box.com/shared/static/azdtffg08doldkaj1e6rlugxmqyqqsty.jpg',
    outfit: 'https://notredame.box.com/shared/static/ogo6po3798uq286653s52itzwxvf992b.jpg'},
    {look: 'cheong',
    shoes: 'https://notredame.box.com/shared/static/s2vcwd3xphq57flmmg2gsjj4pxozvq3l.jpg',
    rings: 'https://notredame.box.com/shared/static/vmx1j5mwq6fnefd13nb8g765c5jqcwky.jpg',
    necklace: 'https://notredame.box.com/shared/static/azdtffg08doldkaj1e6rlugxmqyqqsty.jpg',
    outfit: 'https://notredame.box.com/shared/static/ogo6po3798uq286653s52itzwxvf992b.jpg'},
    {look: 'lara',
    shoes: 'https://notredame.box.com/shared/static/s2vcwd3xphq57flmmg2gsjj4pxozvq3l.jpg',
    rings: 'https://notredame.box.com/shared/static/vmx1j5mwq6fnefd13nb8g765c5jqcwky.jpg',
    necklace: 'https://notredame.box.com/shared/static/azdtffg08doldkaj1e6rlugxmqyqqsty.jpg',
    outfit: 'https://notredame.box.com/shared/static/ogo6po3798uq286653s52itzwxvf992b.jpg'}]
  res.status(200).send(data)
});

app.get('/looks/athleisure', function(req, res) {
  const data = [{
    look: 'elixaberh',
    shoes: 'https://notredame.box.com/shared/static/s2vcwd3xphq57flmmg2gsjj4pxozvq3l.jpg',
    rings: 'https://notredame.box.com/shared/static/vmx1j5mwq6fnefd13nb8g765c5jqcwky.jpg',
    necklace: 'https://notredame.box.com/shared/static/azdtffg08doldkaj1e6rlugxmqyqqsty.jpg',
    outfit: 'https://notredame.box.com/shared/static/ogo6po3798uq286653s52itzwxvf992b.jpg'}]
  res.status(200).send(data)
});

// amazon scraper
app.get('/amazon', function(req, res) {
  console.log('starting amazon');
  return amazon_scraper.scraper.catch(function (err) {
    console.log('failed');
    console.error(err);
  }).then(function(data) {
    console.log(data);
    amazon_scraper.printTable(data)
    return res.status(200).send(data)
  });
});

// in case of environmental variables for privacy
const port = process.env.PORT || 3000;
const httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
  console.log('backend running on port ' + port + '.');
});
