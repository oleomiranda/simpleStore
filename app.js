const express = require("express")
const app = express()
const customerRouter = require("./routers/customers")
const employeeRouter = require("./routers/employees")
const ordersRouter = require("./routers/orders")


app.use(express.json())
app.use("/customer", customerRouter)
app.use("/employee", employeeRouter)
app.use("/order", ordersRouter)



app.listen(8081, console.log('RODANDO....'))