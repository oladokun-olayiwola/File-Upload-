require('dotenv').config();
require('express-async-errors');

const express = require('express');
const fileUpload = require('express-fileupload') 
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  cloud_name: process.env.CLOUD_NAME,
})
const app = express();

// database
const connectDB = require('./db/connect');

const ProductRouter = require('./routes/productRoutes')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(fileUpload({ useTempFiles: true }));

app.use(express.static('./public'))
app.use(express.json());


app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>');
});

//   Routes
app.use('/api/v1/products', ProductRouter)

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// DataBase Connection

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
