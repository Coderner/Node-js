const fs = require("fs");

fs.writeFileSync('./test.txt','hey there');

fs.writeFile('./test.txt','hellllo i am overwriting', (err) => {
    "we have error "+err;
});

console.log(fs.readFileSync('./test.txt').toString);

