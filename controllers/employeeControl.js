const mysql = require("../database/sql")

module.exports = {
	resgister: (req, res) => {
		const { name } = req.body
		mysql.query('INSERT INTO employees (employeeName) VALUES (?)', [name], (err, success) => {
			if (success.affectedRows > 0) {
				return res.status(200).json({ status: 'Vendedor registrado com sucesso' })
			} else {
				return res.status(400).json({ error: 'Não foi possivel registrar o vendedor' })
			}
		})
	},

	delete: (req, res) => {
		const { name, id } = req.body

		mysql.query('DELETE FROM employees WHERE employeeName = ? AND employeeID = ?', [name, id], (err, success) => {
			if (success.affectedRows > 0) {
				return res.status(200).json({ status: 'Registro do vendedor foi deletado' })
			} else {
				return res.status(400).json({ error: 'Não foi possivel deletar o registro do vendedor' })
			}
		})
	},

	salesByEmployee: (req, res) => {
		const { employeeID } = req.params
		mysql.query('SELECT * FROM orders WHERE employeeID = ?', [employeeID], (err, success) => {
			if (success) {
				return res.status(200).json({ vendas: success })
			} else {
				return res.status(400).json({ error: 'Não foi possivel retornar as vendas' })
			}
		})
	},

	allEmployees: (req, res) => {
		mysql.execute('SELECT employeeID AS ID, employeeName AS NAME FROM employees ORDER BY employeeName', (err, success) => {
			if (success) {
				return res.status(200).json({ employees: success })
			} else {
				return res.status(500).json({ error: 'Não foi possivel retornar os vendedores' })
			}
		})
	}
}