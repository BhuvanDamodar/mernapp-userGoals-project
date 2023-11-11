const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config()


const app = express();
connectDB();
const port = process.env.PORT || 3000

//Using middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use("/api/goal", require("./routes/GoalRoutes"))
app.use(errorHandler)

app.listen(port, ()=> console.log(`server running on port: ${port}`));