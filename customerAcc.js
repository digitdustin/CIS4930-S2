//https://www.sqlitetutorial.net/sqlite-nodejs/connect/

/**
 * The customerAccounting class was implemented with sqlite. sqlite is serverless and thus
 * is not running on a port.
 * 
 * name: sqlite
 * version: 3.36.0
 * download link: https://www.sqlite.org/download.html
 * 
 * sqlite data was managed locally through DB Browser and is tested using an in-memory database,
 * whereas the 'prod' DB is stored locally within the repo in 'test.db'
 * 
 */

const sqlite3 = require('sqlite3').verbose();

class customerAccounting {
    db;
    constructor() {
        this.db = new sqlite3.Database('./test.db', (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Connected to the SQlite database.');
        });
    }

    getCustomers = async () => {
        let sql = `SELECT * FROM Customers;`
        
        console.log(this.db);

        this.db.all(sql, [], (err, rows) => {
            if (err) {
              throw err;
            }
            rows.forEach((row) => {
              console.log(`Customer ID: ${row.id} | Customer Name: ${row.name} | Total Order Amount: ${row.total_amt}`);
            });
          });
    }

    getOrders = () => {
        let sql = `SELECT * FROM Orders;`
        
        this.db.all(sql, [], (err, rows) => {
            if (err) {
              throw err;
            }
            rows.forEach((row) => {
              console.log(`Customer ID: ${row.customer_id} | Order Amount: ${row.amt}`);
            });
          });
    }

    closeDB = () => {
        this.db.close((err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    }

    createCustomer = (id, name) => {
        if (this.checkCustomerExists(id)) {
            console.log("Customer already exists");
            return;
        }
    
        let sql = `INSERT INTO Customers (id, name, total_amt) VALUES(?, ?, 0);`
        
        this.db.all(sql, [id, name], (err, rows) => {
            if (err) {
              throw err;
            }
          });
    }
    
    createOrder = (id, amt) => {
        if (!this.checkCustomerExists(id)) {
            console.log('No matching customer');
            return;
        };
    
        let sql = `INSERT INTO Orders (customer_id, amt) VALUES(?, ?);`
    
        this.db.all(sql, [id, amt], (err, rows) => {
            if (err) {
                throw err;
            }
        });
    
        sql = `UPDATE Customers SET total_amt = total_amt + ? WHERE id = ?;`
        
        this.db.all(sql, [amt, id], (err, rows) => {
            if (err) {
                throw err;
            }
        });
    }
    
    checkCustomerExists = (id) => {
        let exists = true;
    
        let sql = `SELECT * FROM Customers WHERE id = ?;`
    
        this.db.all(sql, [id], (err, rows) => {
            if (err) {
              throw err;
            }
            if (rows.length > 0) exists = true;
            else exists = false;
        });
    
        return exists;
    }
}

var CA = new customerAccounting();
console.log(CA);
CA.getCustomers();
CA.createCustomer(2, "Alec")
CA.createOrder(2, 400)
CA.getCustomers();
CA.getOrders();
CA.closeDB();

module.exports = customerAccounting;

/* 
const getCustomers = () => {
    let db = openDB();

    let sql = `SELECT * FROM Customers;`
    
    db.all(sql, [], (err, rows) => {
        if (err) {
          throw err;
        }
        rows.forEach((row) => {
          console.log(`Customer ID: ${row.id} | Customer Name: ${row.name}`);
        });
      });
}

const getOrders = (db) => {
    let sql = `SELECT * FROM Orders;`
    
    db.all(sql, [], (err, rows) => {
        if (err) {
          throw err;
        }
        rows.forEach((row) => {
          console.log(`Customer ID: ${row.customer_id} | Order Amount: ${row.amt}`);
        });
      });
}

const createCustomer = (id, name) => {
    let db = openDB();

    if (checkCustomerExists(id, db)) {
        console.log("Customer already exists");
        return;
    }

    let sql = `INSERT INTO Customers (id, name, total_amt) VALUES(?, ?, 0);`
    
    db.all(sql, [id, name], (err, rows) => {
        if (err) {
          throw err;
        }
        getCustomers(db);
      });

    closeDB(db);
}

const createOrder = (id, amt) => {
    let db = openDB();

    if (!checkCustomerExists(id, db)) {
        console.log('No matching customer');
        return;
    };

    let sql = `INSERT INTO Orders (customer_id, amt) VALUES(?, ?);`

    db.all(sql, [id, amt], (err, rows) => {
        if (err) {
            throw err;
        }
    });

    sql = `UPDATE Customers SET total_amt = total_amt + ? WHERE id = ?;`
    
    db.all(sql, [amt, id], (err, rows) => {
        if (err) {
            throw err;
        }
        getCustomers(db);
        getOrders(db);
    });

    closeDB(db);
}

const checkCustomerExists = (id, db) => {

    let exists = true;

    let sql = `SELECT * FROM Customers WHERE id = ?;`

    db.all(sql, [id], (err, rows) => {
        if (err) {
          throw err;
        }
        if (rows.length > 0) exists = true;
        else exists = false;
    });

    return exists;
}

const openDB = () => {
    let db = new sqlite3.Database('./test.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the in-memory SQlite database.');
    });
    return db;
}

const closeDB = (db) => {
    db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
} */

