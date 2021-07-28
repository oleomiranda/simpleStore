const router = require('express').Router()
const mysql = require("../database/sql")
const employeeControl = require("../controllers/employeeControl")

//REGISTRA NOVO VENDEDOR
router.post("/register", employeeControl.resgister)

//DELETAR REGISTRO DE VENDEDOR
router.delete("/delete", employeeControl.delete)

//RETORNA QUANTIDADE DE VENDAS DO VENDEDOR 
router.get("/sales/:employeeID", employeeControl.salesByEmployee)

//RETORNA TODOS OS VENDEDORES 
router.get("/all", employeeControl.allEmployees)



module.exports = router