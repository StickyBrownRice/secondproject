require("dotenv").config();

const express = require("express");
const cors = require("cors");
const dbConnection = require("./configs/db");
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://MatthewLee:76597659@cluster0.qfcv3vg.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });

const clickCountSchema = new mongoose.Schema({
  count: Number
});

const ClickCount = mongoose.model('ClickCount', clickCountSchema);

const app = express();

app.post('/click', async (req, res) => {
  try {
    const result = await ClickCount.findOne();
    let count = result ? result.count : 0;

    count++;
    await ClickCount.updateOne({}, { count }, { upsert: true });

    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating click count' });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});