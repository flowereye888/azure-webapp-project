const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {

  let filePath =
    req.url === "/"
      ? path.join(__dirname, "index.html")
      : path.join(__dirname, req.url);

  const ext = path.extname(filePath);

  const contentTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml"
  };

  const contentType =
    contentTypes[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {

    if (err) {
      res.writeHead(404, {
        "Content-Type": "text/html"
      });

      res.end("<h1>404 - Page Not Found</h1>");
      return;
    }

    res.writeHead(200, {
      "Content-Type": contentType
    });

    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(
    `TM Lowcarbon Service AB website running on port ${PORT}`
  );
});
