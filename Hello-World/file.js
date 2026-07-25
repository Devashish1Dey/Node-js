const fs = require("fs")
const os = require('os')

console.log(os.cpus().length)

// // Sync...
// fs.writeFileSync('./text.txt', 'This is a text file')

// Async...
// fs.writeFile('./text.txt', 'This is a Async text file', (err) => {})

    
// Sync...   Blocking....
// const result = fs.readFileSync('./contacts.txt', 'utf-8')
// console.log(result)

// // Async...  Non-Blocking...
// fs.readFile('./contacts.txt', 'utf-8', (err, result) => {
//     if (err){
//         console.log("Error", err)
//     }
//     else{
//         console.log(result)
//     }
// })

// fs.appendFileSync('./text.txt', "Hey There\n")

// fs.cpSync('./text.txt', './copy.txt')    // to copy a file

// fs.unlinkSync('./copy.txt')    // to delete a file

// console.log(fs.statSync("./text.txt").isFile())

// fs.mkdirSync('my-docs')  // to create a directory
// fs.mkdirSync('my-docs/a/b', {recursive: true})  // to create a directory and sub-directories