const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
//const { response } = require('express');
const stripe = require("stripe")(
  "sk_test_51HUBspHeUL0xV8YFvrUr5oTwvhpTOmutE1unMaSWWHpmrRqnskfCiMAQ9WyZ5B4hXB0Bxo3bzUiBqmzZYuAjwxQw00H2YZlGqY"
);

//api

//app config
const app = express();

//middlewares

app.use(cors({ origin: true }));
app.use(express.json());

//api routes
app.get("/", (requeste, response) => response.status(200).send("Wsdas"));

app.get("/kristjan", (requeste, response) =>
  response.status(200).send("Whats up Kristjan")
);

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment request Recieved BOOM fro this ammon >>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  //OK -- Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//listen command
exports.api = functions.https.onRequest(app);

//http://localhost:5001/clone-c6a0c/us-central1/api
