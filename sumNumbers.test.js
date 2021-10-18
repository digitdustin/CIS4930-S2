const sumNumbers = require('./sumNumbers.js');
const fs = require('fs')
const mock = require('mock-fs');

describe('sumNumbers', () => {

    //set sample data before each test
    beforeEach(() => {
        mock({
            'testData': {
                'nums.txt': '2 4 6'
            }
        });
    });

    //restore original file after each test has been ran
    afterAll(() => {
        mock.restore();
    });

    // #mock
    it("Should call mock function once", () => {
        const mockSumNumbers = jest.fn(sumNumbers("testData/nums.txt"));
        mockSumNumbers();
        expect(mockSumNumbers).toHaveBeenCalled();
    })

    // #spy
    it("Should call readFileSync function once", () => {
        const spy = jest.spyOn(fs, "readFileSync")
        const mockSumNumbers = jest.fn(sumNumbers("testData/nums.txt"));
        
        mockSumNumbers();

        expect(spy).toHaveBeenCalledTimes(1);
    })
    
    // #spy
    it("Should call appendFileSync function once", () => {
        const spy = jest.spyOn(fs, "appendFileSync")
        const mockSumNumbers = jest.fn(sumNumbers("testData/nums.txt"));
        
        mockSumNumbers();

        expect(spy).toHaveBeenCalledTimes(1);
    })

    // #fake
    it('Should append sum of numbers in file to end', () => {
        const expectedResult = '2 4 6 12';
        const mockSumNumbers = jest.fn(sumNumbers("testData/nums.txt"));

        mockSumNumbers()

        const result = fs.readFileSync('testData/nums.txt', 'UTF-8')
        expect(result).toEqual(expectedResult)
    })

    // #fake
    it('Should add space with sum appended', () => {
        const expectedResult = '2 4 612';
        const mockSumNumbers = jest.fn(sumNumbers("testData/nums.txt"));

        mockSumNumbers()

        const result = fs.readFileSync('testData/nums.txt', 'UTF-8')
        expect(result).not.toEqual(expectedResult)
    })

    // #fake
    it('Should return the same file with different content (appended sum)', () => {
        const original = fs.readFileSync('testData/nums.txt', 'UTF-8')
        const mockSumNumbers = jest.fn(sumNumbers("testData/nums.txt"));
        
        mockSumNumbers()
        
        const final = fs.readFileSync('testData/nums.txt', 'UTF-8')
        //file content has changed
        expect(original).not.toEqual(final)
    })

    // #stub
    it('Should throw an error when the file does not exist', () => {
        const mockSumNumbers = jest.fn(sumNumbers("testData/numsfake.txt"));
        mockSumNumbers.mockReturnValue('The file does not exist');
        expect(mockSumNumbers()).toEqual('The file does not exist')
    }) 
})

