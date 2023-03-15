const prices = require('./routes/prices');

const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.engine('html', require('ejs').renderFile);
app.use('/', prices);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listning on port ${port}...`))