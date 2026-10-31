const students = [
    { id: 1, name: "priya", age: 20 },
    { id: 2, name: "sneha", age: 21 },
    { id: 3, name: "jaya", age: 22 },
];

const newStudent = { id: 4, name: "janu", age: 24 };
students.push(newStudent);
console.log("All students:", students);
const studentIdToRead = 2;
const studentToRead = students.find(student => student.id === studentIdToRead);
if (studentToRead) {
    console.log(`Student with ID ${studentIdToRead}:`,studentToRead );
} else {
    console.log(`Student with ID ${studentIdToRead} not found.` );
}
const studentIdToUpdate = 3;
const studentData = { name: "jaya sri", age: 23};
const studentIndexToUpdate = students.findIndex( student => student.id === studentIdToUpdate);

if (studentIndexToUpdate !== -1) {
    students[studentIndexToUpdate] = {...students[studentIndexToUpdate],...studentData};

    console.log(`Student with ID ${studentIdToUpdate} updated:`,students [studentIndexToUpdate]
    );
} else {
    console.log(`Student with ID ${studentIdToUpdate} not found.`);
}
const studentIdToDelete = 1;
const studentIndexToDelete = students.findIndex(
    student => student.id === studentIdToDelete
);

if (studentIndexToDelete !== -1) {
    const deletedStudent = students.splice(
        studentIndexToDelete, 1 );
console.log(`Student with ID ${studentIdToDelete} deleted:`, deletedStudent[0]);
} else {
    console.log(`Student with ID ${studentIdToDelete} not found.`);
}

console.log("Final list of students:", students);