//https://github.com/lukehoban/es6features#module-loaders
let express = require('express');
let app = express();

app.use(express.static('./build'));

app.get('/', (req, res) => {
  res.sendFile('./build/index.html', {
    root: '.',
  });
});

let server = app.listen(8080, () => {
  let port = server.address().port;

  console.log(`App is up and running on port: ${port}`);
});
