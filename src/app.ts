import express from 'express';
const app = express();
const dotenv = require('dotenv');
const db = require('./config/db');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter')
const port = 1335;

dotenv.config();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use('/user', userRouter);
app.use('/product', productRouter);

app.listen(port, () => {
      db();
      console.log('app is running at', port); 
});