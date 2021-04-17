const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });

const app = express();

const DB = process.env.DATABASE;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }).then(() => {
    console.log('MONGODB Connected...');
  }).catch((err) => {
    console.log('Not Connected...')
  })
  

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Image Uploader!!")
})

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});