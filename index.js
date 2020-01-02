const http = require("http");
const url = require("url");
const fs = require("fs");

http
  .createServer(function(req, res) {
    const q = url.parse(req.url, true);
    const filename = "." + q.pathname.concat(".html");
    fs.readFile(filename, function(err, data) {
      if (!err) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      } else {
        fs.readFile("./404.html", function(err, data) {
          if (!err) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            return res.end();
          } else {
            res.writeHead(404, { "Content-Type": "text/html" });
            return res.end("404: Page Not Found");
          }
        });
      }
    });
  })
  .listen(8080);
