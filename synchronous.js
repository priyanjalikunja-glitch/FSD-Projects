const fs = require("fs");

// 1. writeFileSync() - Create and write to a file
fs.writeFileSync("student.txt", "Student Name: Priya\n");
console.log("File created and data written successfully");

// 2. appendFileSync() - Add data to the file
fs.appendFileSync("student.txt", "Course: Full Stack Development\n");
console.log("Data appended successfully");

// 3. readFileSync() - Read the file
let data = fs.readFileSync("student.txt", "utf8");
console.log(data);

// 4. unlinkSync() - Delete the file
fs.unlinkSync("student.txt");
console.log("File deleted successfully");