const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    CREDENTIALS: true,
  })
);
app.use(express.json());
app.use(express.urlencoded());

//*Connecting to DB
async function connectToAtlas() {
  const mongoose = await require('mongoose');
  let a = await mongoose.connect(process.env.DB_URL, () => {
    console.log('*************DB CONNECTED**************');
  });
}
connectToAtlas();

//*MAIN ROUTE
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'server start point @ :4000/ ',
  });
});
//*ROUTERS
const loginRoute = require('./router/loginRoute');
app.use('/login', loginRoute);
const register = require('./router/register');
app.use('/register', register);

const attendanceRegisterRoute = require('./router/attendanceRegisterRoute');
app.use('/attendanceRegisterRoute', attendanceRegisterRoute);
const attendanceLoginRoute = require('./router/attendanceLoginRoute');
app.use('/attendanceLoginRoute', attendanceLoginRoute);

app.listen(process.env.PORT || 4000, (req, res) => {
  console.log(`server started msg in terminal at ${process.env.PORT} `);
});
