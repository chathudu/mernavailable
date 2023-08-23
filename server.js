const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");




require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5500;

app.use(cors());

// app.use(cors({
//   'allowedHeaders': ['sessionId', 'Content-Type'],
//   'exposedHeaders': ['sessionId'],
//   'origin': '*',
//   'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   'preflightContinue': false
// }));
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB Connection Success!!");
});

app.listen(PORT, () => {
  console.log(`Server Running on PORT : ${PORT}`);
});

//routes

const availableRouter = require("./routes/available");
app.use("/available", availableRouter);

const mailRouter = require("./routes/route");
app.use("/api", mailRouter);

const itemRouter = require("./routes/item");
app.use("/agri/items", itemRouter);

const PlayerRouter = require("./routes/player");
app.use("/box/player", PlayerRouter);

const PlayerfinalRouter = require("./routes/playerfinal");
app.use("/box/playerfinal", PlayerfinalRouter);

const loginRouter = require("./routes/logins");
app.use("/agri/users", loginRouter);

//services
const paymentService = require("./services/paymentService");
app.use("/agri/paymentService", paymentService);

const paymentServiceMobile = require("./services/paymentService_mobile");
app.use("/agri/paymentService/mobile", paymentServiceMobile);

const deliveryService = require("./services/deliveryService");
app.use("/agri/deliveryService", deliveryService);

const cartRouter = require("./routes/cart");
app.use("/agri/carts", cartRouter);

