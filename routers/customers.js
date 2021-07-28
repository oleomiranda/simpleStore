const router = require("express").Router()
const mysql = require("../database/sql")
const customerControl = require("../controllers/customerControl")

//MOSTRA TODOS CLIENTES
router.get("/all", customerControl.returnAll)

//REGISTRA NOVO CLIENTE
router.post("/register", customerControl.register)

//RETORNA DADOS DE UM CLIENTE 
router.get("/all/:customerRG", customerControl.customerInfo)


module.exports = router