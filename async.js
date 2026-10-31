const fs = require("fs");

// 1. writeFile() - Create and write to a file
fs.writeFile("student.txt", "Student Name: Priya\n", (err) => {
    if (err) throw err;
    console.log("File created and data written successfully");

    // 2. appendFile() - Add data to the file
    fs.appendFile("student.txt", "Course: Full Stack Development\n", (err) => {
        if (err) throw err;
        console.log("Data appended successfully");

        // 3. readFile() - Read the file
        fs.readFile("student.txt", "utf8", (err, data) => {
            if (err) throw err;
            console.log("\nFile Content:");
            console.log(data);

            // 4. unlink() - Delete the file
            fs.unlink("student.txt", (err) => {
                if (err) throw err;
                console.log("File deleted successfully");
            });
        });
    });
});

console.log("Program continues without waiting...");