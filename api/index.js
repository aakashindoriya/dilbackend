require("dotenv").config()
const express=require("express")
const cors=require("cors")
const connect = require("./db/connect.db")
const userRoute=require("./routes/user.route")
const productRoute=require("./routes/product.route")
const cartRoute=require("./routes/cart.route")
const wishlistRoute=require("./routes/wishlist.route")
const paymentRoute=require("./routes/payment.route")
const app=express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get("/",(req,res)=>{
    try {
        res.status(200).send("Welcome to DIL")
    } catch (error) {
        res.send(500).send("error",error)
    }
})

app.use("/user",userRoute)
app.use("/product",productRoute)
app.use("/cart",cartRoute)
app.use("/wishlist",wishlistRoute)
app.use("/payment",paymentRoute)
app.listen(process.env.PORT,async()=>{
    await connect()
    console.log("server is running on ",process.env.PORT )
})

