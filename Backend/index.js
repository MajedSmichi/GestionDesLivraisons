const express = require('express')
const mongoose=require('mongoose')
const router = require('./routes/clientRoute')
var cors = require('cors')
const multer = require('multer')
const { auth } = require('./controllers/authentification')
require('dotenv').config()
const app = express()
app.use(express.json());

app.use(cors())

app.use("/uploads", express.static("uploads"));
app.use("/users", router)
app.use("/users/auth", auth);

if (process.env.NODE_ENV === 'production') {
  //*Set static folder up in production
  app.use(express.static('../Frontend/build'));

  app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, '../Frontend', 'build','index.html')));
}




mongoose.set("strictQuery", false);
mongoose.connect(
    process.env.MONGODB_URI,
     { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})