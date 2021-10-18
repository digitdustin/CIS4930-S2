//https://www.sqlitetutorial.net/sqlite-nodejs/connect/

const sqlite3 = require('sqlite3').verbose();

class customerAccountDB {
    db;
    constructor() {
        this.openDB()
    }
    openDB = () => {
        this.db = new sqlite3.Database(':memory:');
    }
    closeDB = () => {
        this.db.close()
    }
}

class customerAccountingMock {
    db;
    constructor() {
        this.openDB()
    }

    openDB = () => {
        this.db = "Database"
    }

    getCustomers = () => {
        return `SELECT * FROM Customers;`
    }

    getOrders = () => {
        return `SELECT * FROM Orders;`
    }

    closeDB = () => {
        console.log('The database has been closed');
    }

    createCustomer = (id, name, customerExists) => {
        if (customerExists) {
            return "Customer already exists"
        }
    
        return `INSERT INTO Customers (id, name, total_amt) VALUES(${id}, ${name}, 0);`
    }
    
    createOrder = (id, amt, customerExists) => {
        if (!customerExists) {
            return 'No matching customer'
        };
    
        return `INSERT INTO Orders (customer_id, amt) VALUES(${id}, ${amt}); UPDATE Customers SET total_amt = total_amt + ${amt} WHERE id = ${id};`
        
    }
    
    checkCustomerExists = (id) => {
        return sql = `SELECT * FROM Customers WHERE id = ?;`
    }
}


module.exports = { customerAccountDB, customerAccountingMock };
