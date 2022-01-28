const connection = require("express-myconnection");

const controller = {};

controller.list = function (req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer', (err, customers) => {
            if (err) {
                res.json(err);
            }

            res.render('customers', {
                data: customers
            });
        })
    })
}

controller.errorPage = function (req, res) {
    res.render('error', {
        message: ''
    });
}

controller.save = function (req, res) {
    req.getConnection( (err, conn) => {
        if (err) {
            res.json(err);
        }

        const data = req.body;
        if (!data.name || !data.address) {
            res.render('error', {
                message: "You can't submit an empty form."
            })
            res.end();
            return;
        }
        // el ? hace referencia al array que pasamos
        // más ? hacen referencia a más datos
        conn.query('INSERT INTO customer set ? ', [data], (err, customer) => {
            if (err) {
                res.json(err);
            }

            res.redirect('/');
        })
    })
}

controller.edit = function (req, res) {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        if (err) {
            res.json(err);
        }

        conn.query('SELECT * FROM customer WHERE id = ?', [id], (err, customer) => {
            if (err) {
                res.json(err);
            }

            res.render('customer_edit', {
                data: customer[0]
            })
        })
    })
}

controller.update = function (req, res) {
    const id = req.params.id;
    const newCustomer = req.body;
    if (!newCustomer.name || !newCustomer.address) {
        res.render('error', {
            message: "You can't leave empty fields (name or address)."
        })
        res.end();
            return;
    }

    req.getConnection((err, conn) => {
        if (err) {
            res.json(err);
        }
        
        conn.query('UPDATE customer set ? WHERE id = ?', [newCustomer, id], (err, customer) => {
            if (err) {
                res.json(err);
            }

            res.redirect('/');
        })
    })
}

controller.delete = function (req, res) {
    req.getConnection((err, conn) => {
        if (err) {
            res.json(err);
        }

        const id = req.params.id;
        conn.query('DELETE FROM customer WHERE id = ?', [id], (err, customer) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/');
        })
    })
}

module.exports = controller