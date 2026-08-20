const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
    let filePath = req.url === "/" ? "index.html" : req.url.substring(1);
    filePath = path.join(__dirname, filePath);

    const ext = path.extname(filePath);

    let contentType = "text/html";

    if (ext === ".css") {
        contentType = "text/css";
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end("File not found");
            return;
        }

        res.writeHead(200, { "Content-Type": contentType });
        res.end(content);
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
