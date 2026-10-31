import http from 'http';

const students = [];
const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/students') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newstudent = JSON.parse(body);
            students.push(newstudent);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(
                JSON.stringify({
                    message: 'Students created successfully',
                    data: newstudent,
                }),
            );
        });
    }
    else if (req.method === 'GET' && req.url === '/students') {

        res.writeHead(200, { 'Content-Type': 'application/json' });

        res.end(
            JSON.stringify({
                message: 'Students read successfully',
                data: students
            }),
        );
    }
    else if (req.method === 'GET' && req.url.startsWith('/students/')) {
        const studentId = parseInt(req.url.split('/')[2]);
        const student = students.find(s => s.id === studentId);
        if (student) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(
                JSON.stringify({
                    message: 'Student read successfully',
                    data: student,
                }),
            );
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(
                JSON.stringify({
                    message: 'Student not found'
                })
            );
        }
    }
    else if (req.method === 'PUT' && req.url.startsWith('/students/')) {
        const studentId = parseInt(req.url.split('/')[2]);
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newstudent = JSON.parse(body);
            const studentIndex =
                students.findIndex(s => s.id === studentId);
            if (studentIndex !== -1) {students[studentIndex] = {...students[studentIndex],...newstudent };
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(
                    JSON.stringify({
                        message: 'Student updated successfully',
                        data: students[studentIndex]
                    })
                );

            } else {
                res.writeHead(404, {'Content-Type': 'application/json' });
                res.end(
                    JSON.stringify({
                        message: 'Student not found'
                    })
                );
            }
        });
    }
    else if (req.method === 'DELETE' &&
             req.url.startsWith('/students/')) {
        const studentId = parseInt(req.url.split('/')[2]);
        const studentIndex = students.findIndex(s => s.id === studentId);
        if (studentIndex !== -1) {
            const student = students.splice(studentIndex, 1);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(
                JSON.stringify({
                    message: 'Student deleted successfully',
                    data: student[0]
                })
            );

        } else {
            res.writeHead(404, {'Content-Type': 'application/json' });
            res.end(
                JSON.stringify({
                    message: 'Student not found'
                })
            );
        }
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(
            JSON.stringify({
                message: 'Page not found'
            })
        );
    }
});
server.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});