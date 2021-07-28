const router = require('express').Router()
const mysql = require("../database/sql")
const orderControl = require("../controllers/orderControl")

//MOSTRA TODAS AS VENDAS
router.get("/all", orderControl.allSales)

//RESGITRAR NOVA VENDA
router.post("/new", orderControl.newSale)


module.exports = router