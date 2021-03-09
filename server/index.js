const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');

const authRouter = require('./routes/auth.routes');

const app = express();
const PORT = config.get('serverPort');

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);

const start = async () => {
  try {
    await mongoose.connect(config.get('dbUrl'));

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.error(e.message);
  }
};

start();
