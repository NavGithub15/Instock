require("dotenv").config();
const express = require('express')
const app = express();
const PORT = process.env.PORT || 8080;
const warehouse = require('./routes/warehouses');
const inventory = require('./routes/inventories');
const cors = require("cors");


app.use(express.json());
app.use(cors());

app.use('/warehouses', warehouse);
app.use('/inventory', inventory);


app.listen(PORT, function () {
  console.log('App is now running at http://localhost:' + PORT);
});