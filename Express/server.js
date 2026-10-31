import express from "express";
import fs from "fs";
const app = express();
app.use(express.json());
// Read data
const readData = () => {
    const data = fs.readFileSync("./data/faculty.json", "utf-8");
    return JSON.parse(data);
};
// Write data
const writeData = (data) => {
    fs.writeFileSync("./data/faculty.json", JSON.stringify(data, null, 2), "utf-8");
};
// 1) CREATE FACULTY
// POST http://localhost:8080/api/v1/faculty
// Payload: {"name":"Ravi","dept":"CSE","salary":100000}
app.post("/api/v1/faculty", (req, res) => {
    const allFaculty = readData();
    const newFaculty = {
        id: allFaculty.length === 0 ? 1 : allFaculty[allFaculty.length - 1].id + 1,
        ...req.body
    };
    allFaculty.push(newFaculty);
    writeData(allFaculty);
    res.status(201).json({
        message: "New Faculty added successfully",
        data: newFaculty
    });
});
// 2) READ ALL FACULTY
// GET http://localhost:8080/api/v1/faculty
app.get("/api/v1/faculty", (req, res) => {
    const allFaculty = readData();
    res.status(200).json({
        message: "All Faculty retrieved successfully",
        data: allFaculty
    });
});
// 3) READ FACULTY BY DEPARTMENT
// GET http://localhost:8080/api/v1/faculty/department?dept=CSE
app.get("/api/v1/faculty/department", (req, res) => {
    const allFaculty = readData();
    if (!req.query.dept) {
        return res.status(400).json({
            message: "Department is required"
        });
    }
    const dept = req.query.dept.toLowerCase();
    const faculty = allFaculty.filter(
        f => f.dept.toLowerCase() === dept
    );
    res.status(200).json({
        message: "Faculty retrieved by department successfully",
        data: faculty
    });
});
// 4) READ FACULTY BY ID
// GET http://localhost:8080/api/v1/faculty/1
app.get("/api/v1/faculty/:id", (req, res) => {
    const allFaculty = readData();
    const faculty = allFaculty.find(
        f => f.id === parseInt(req.params.id)
    );
    if (!faculty) {
        return res.status(404).json({
            message: "Faculty not found"
        });
    }
    res.status(200).json({
        message: "Faculty retrieved successfully",
        data: faculty
    });
});
// 5) UPDATE FACULTY
// PUT http://localhost:8080/api/v1/faculty/1
// Payload: {"name":"Ravi Kumar","dept":"CSE","salary":120000}
app.put("/api/v1/faculty/:id", (req, res) => {
    const allFaculty = readData();
    const facultyIndex = allFaculty.findIndex(
        f => f.id === parseInt(req.params.id)
    );
    if (facultyIndex === -1) {
        return res.status(404).json({
            message: "Faculty not found"
        });
    }
    const updatedFaculty = {
        ...allFaculty[facultyIndex],
        ...req.body
    };
    allFaculty[facultyIndex] = updatedFaculty;
    writeData(allFaculty);
    res.status(200).json({
        message: "Faculty updated successfully",
        data: updatedFaculty
    });
});
// 6) DELETE FACULTY
// DELETE http://localhost:8080/api/v1/faculty/1
app.delete("/api/v1/faculty/:id", (req, res) => {
    const allFaculty = readData();
    const facultyIndex = allFaculty.findIndex(
        f => f.id === parseInt(req.params.id)
    );
    if (facultyIndex === -1) {
        return res.status(404).json({
            message: "Faculty not found"
        });
    }
    const deletedFaculty = allFaculty.splice(facultyIndex, 1)[0];
    writeData(allFaculty);
    res.status(200).json({
        message: "Faculty deleted successfully",
        data: deletedFaculty
    });
});
// START SERVER
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/api/v1/faculty`);
});
