const mysql = require("../database/sql")
module.exports = {
	allSales: (req, res) => {
		mysql.execute(`SELECT orders.orderID, customers.customerName, employees.employeeName, items.itemName 
		FROM orders INNER JOIN customers ON customers.CustomerID = orders.customerID 
		INNER JOIN employees ON employees.employeeID = orders.employeeID 
		INNER JOIN items ON items.itemID = orders.itemID ORDER BY customers.customerName`, (err, orders) => {
			if (orders) {
				return res.status(200).json({ orders: orders })
			} else {
				return res.status(400).json({ error: 'Não foi possivel retornar as vendas' })
			}
		})
	},

	newSale: (req, res) => {
		const { customerRG, employeeID, itemName } = req.body

		mysql.beginTransaction((err) => {
			if (err) {
				mysql.rollback()
				return res.status(500).json({ error: 'Houve um erro' })
			} else {
				mysql.query(`INSERT INTO orders(itemID, customerID, employeeID) 
			VALUES (
				(SELECT itemID FROM items WHERE itemName = ?), 
			(SELECT customerID from customers WHERE customerRG = ?), (?))`, [itemName, customerRG, employeeID], (err, success) => {
					if (err) {
						mysql.rollback()
						return res.status(400).json({ status: 'Não foi possivel registrar a compra' })
					} else {
						mysql.execute('SELECT * FROM orders WHERE orderID = (SELECT MAX(orderID) FROM orders)', (err, orders) => {
							if (orders) {
								return res.status(200).json({ status: orders })
							} else {
								return res.status(500).json({ error: 'Não foi possivel retornar o registro da compra' })
							}
						})
					}
				})
			}
		})
	}

}