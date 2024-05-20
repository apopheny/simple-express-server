var express = require('express');
var bodyParser = require('body-parser');
var path = require('path'); // Import the path module
var app = express();

// Allow all requests from all domains & localhost
app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'POST, GET');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

var ingredients = [
  { id: '234kjw', text: 'Eggs' },
  { id: 'as82w', text: 'Milk' },
  { id: '234sk1', text: 'Bacon' },
  { id: 'ppo3j3', text: 'Frog Legs' },
];

app.get('/ingredients', function (req, res) {
  console.log('GET From SERVER');
  res.send(ingredients);
});

app.post('/ingredients', function (req, res) {
  var ingredient = req.body;
  console.log(req.body);
  ingredients.push(ingredient);
  res.status(200).send('Successfully posted ingredient');
});

// Add a default route to serve the index.html file
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3080, '0.0.0.0', () => {
  console.log('Server is running on port 3080');
});
