import http from 'http';

const server = http.createServer((req, res) => {

    if (req.method === 'POST' && req.url === '/students') {
        res.writeHead(200, { "content-type": "text/html" });
        res.write("<h1>Student created</h1>");
        res.end();
    }

    else if (req.method === 'GET' && req.url === '/students') {
        res.writeHead(200, { "content-type": "text/html" });
        res.write("<h1>Student List</h1>");
        res.end();
    }

    else if (req.method === 'GET' && req.url === '/students/1') {
        res.writeHead(200, { "content-type": "text/html" });
        res.write("<h1>Student Details</h1>");
        res.end();
    }

    else if (req.method === 'PUT' && req.url === '/students/1') {
        res.writeHead(200, { "content-type": "text/html" });
        res.write("<h1>Student Updated</h1>");
        res.end();
    }

    else if (req.method === 'DELETE' && req.url === '/students/1') {
        res.writeHead(200, { "content-type": "text/html" });
        res.write("<h1>Student Deleted</h1>");
        res.end();
    }

    else {
        res.writeHead(404, { "content-type": "text/html" });
        res.write("<h1>Page Not Found</h1>");
        res.end();
    }
});

server.listen(4000, () => {
    console.log("Server running at http://localhost:4000/");
});