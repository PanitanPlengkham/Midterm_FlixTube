const express = require('express');
const { MongoClient } = require('mongodb');


const app = express();


const PORT = process.env.PORT;
const DBHOST = process.env.DBHOST;
const DBNAME = process.env.DBNAME;


MongoClient.connect(DBHOST, { useUnifiedTopology: true })
  .then((client) => {

    app.locals.db = client.db(DBNAME);
    

    app.listen(PORT, () => {
      console.log(`Advertising service is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });


app.get('/advertising', (req, res, next) => {

  const products = req.app.locals.db.collection('products');
  

  products.find().toArray((err, items) => {
    if (err) return next(err);
    

    const product = items[Math.floor(Math.random() * items.length)];
    

    res.json(product);
  });
});

