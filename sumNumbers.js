var fs = require("fs");

const sumNumbers = (filePath) => {
    try {
        var numberList = fs.readFileSync(filePath, "UTF-8");
    } catch {
        return 'The file does not exist'
    }
    numbers = numberList.split(' ');
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += Number(numbers[i]);
    }
    fs.appendFileSync(filePath, String(' ' + sum))
}

module.exports = sumNumbers;