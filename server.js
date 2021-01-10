const express = require('express');
const path = require('path');
const app = express();
const notes = require('./db/db.json'); 
const { response } = require('express');

const PORT = process.env.PORT || 3001;

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`App listening on PORT http://localhost:${PORT}`);
  });