const { customerAccountingMock, customerAccountDB } = require('./__mocks__/customerAccMock.js')
const sqlite3 = require('sqlite3').verbose();

//jest.mock("sqlite3")

describe("customerAccounting", () => {
    // #mock
    it('Should initialize a sqlite session (in-memory)', () => {
        const spy = jest.spyOn(sqlite3, "Database").mockImplementation(() => {})
        customerAcc = new customerAccountDB();
        expect(spy).toHaveBeenCalled();
    })
    
    // #mock
    it('First argument of createCustomer is the customer id', () => {
        customerAcc = new customerAccountingMock();
        const createCustomerMock = jest.fn(customerAcc.createCustomer)
        createCustomerMock(1, 'John', false)
        expect(createCustomerMock.mock.calls[0][0]).toBe(1)
    })
    
    // #mock
    it('Second argument of createCustomer is the name', () => {
        customerAcc = new customerAccountingMock();
        const createCustomerMock = jest.fn(customerAcc.createCustomer)
        createCustomerMock(1, 'John', false)
        expect(createCustomerMock.mock.calls[0][1]).toBe('John')
    })
    
    // #mock
    it('First argument of createOrder is the customer id', () => {
        customerAcc = new customerAccountingMock();
        const createOrderMock = jest.fn(customerAcc.createCustomer)
        createOrderMock(1, 500, true)
        expect(createOrderMock.mock.calls[0][0]).toBe(1)
    })
    
    // #mock
    it('Second argument of createOrder is the name', () => {
        customerAcc = new customerAccountingMock();
        const createOrderMock = jest.fn(customerAcc.createOrder)
        createOrderMock(1, 500, true)
        expect(createOrderMock.mock.calls[0][1]).toBe(500)
    })

    // #stub
    it('Should throw error if createCustomer already exists', () => {
        customerAcc = new customerAccountingMock();
        const createCustomerMock = jest.fn(customerAcc.createCustomer)
        expect(createCustomerMock(1, 'John', true)).toBe("Customer already exists")
    })

    // #stub
    it('Should throw error if createOrder customerid does not exist', () => {
        customerAcc = new customerAccountingMock();
        const createOrderMock = jest.fn(customerAcc.createOrder)
        expect(createOrderMock(2, 300, false)).toBe("No matching customer")
    })

    // #stub
    it('Should generate the correct createCustomer SQL query', () => {
        customerAcc = new customerAccountingMock();
        const result = customerAcc.createCustomer(1, 'John', false)
        expect(result).toEqual('INSERT INTO Customers (id, name, total_amt) VALUES(1, John, 0);')
    })

    // #stub
    it('Should generate the correct createOrder SQL query', () => {
        customerAcc = new customerAccountingMock();
        const result = customerAcc.createOrder(2, 300, true)
        expect(result).toEqual(`INSERT INTO Orders (customer_id, amt) VALUES(2, 300); UPDATE Customers SET total_amt = total_amt + 300 WHERE id = 2;`)
    })

    // #stub
    it('Should generate the correct getCustomers SQL query', () => {
        customerAcc = new customerAccountingMock();
        const result = customerAcc.getCustomers()
        expect(result).toEqual(`SELECT * FROM Customers;`)
    })

    // #stub
    it('Should generate the correct getOrders SQL query', () => {
        customerAcc = new customerAccountingMock();
        const result = customerAcc.getOrders()
        expect(result).toEqual(`SELECT * FROM Orders;`)
    })

    // #spy
    it('Should close the database only when called', () => {
        customerAcc = new customerAccountingMock();
        const spy = jest.spyOn(customerAcc, "closeDB").mockImplementation(() => {})
        customerAcc.createCustomer(456, 'gganbu', false)
        customerAcc.closeDB()
        expect(spy).toHaveBeenCalledTimes(1)
    })
}) 