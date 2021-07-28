const mysql = require('../database/sql')

module.exports = {
	
	returnAll: (req, res) => {
		mysql.execute('SELECT customerID AS ID, customerName AS NAME, customerRG AS RG FROM customers', (err, success) => {
			if (success) {
				return res.status(200).json({ customers: success })
			} else {
				return res.status(400).json({ error: 'Não foi possivel retornar os clientes' })
			}
		})
	},

	customerInfo: (req, res) => {
		const { customerRG } = req.params

		mysql.execute(`SELECT customers.customerName, items.itemName FROM orders INNER JOIN customers ON orders.customerID = customers.customerID
	INNER JOIN items ON items.itemID = orders.itemID WHERE customers.customerRG = ?`, [customerRG], (err, success) => {
			if (success) {
				return res.status(200).json({ compras: success })
			} else {
				res.status(500).json({ error: 'Não foi possivel retornar as compras do usuario' })
			}
		})
	},

	register: (req, res) => {
		const { name, rg } = req.body

		mysql.query('INSERT INTO customers (customerName, customerRG) VALUES (?, ?)', [name, rg], (err, success) => {
			if (success.affectedRows > 0) {
				return res.status(200).json({ status: 'Usuario registrado com sucesso' })
			} else {
				return res.status(500).json({ error: 'Não foi possivel foi possivel registrar o cliente' })
			}
		})
	}

}