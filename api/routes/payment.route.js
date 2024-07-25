const express = require("express")
const payment = require("../controllers/payment.controller")
const auth = require("../middlewares/auth.middleware")
const app = express.Router()

app.post("/checkout", auth, payment.checkout)
app.post("/paymentverifcation", payment.paymentVerification)



module.exports = app