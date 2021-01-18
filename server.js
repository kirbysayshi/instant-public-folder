const http = require("http");
const fs = require("fs");
const path = require("path");
const parseUrl = require("parseurl");
const send = require("send");
const { spawn } = require("child_process");

const HTTP_PORT = 8686;

// Note: the majority of this code is copy/pasted from the `send` module's examples

const server = http.createServer(function onRequest(req, res) {
  send(req, parseUrl(req).pathname, {
    index: false,
    root: process.cwd(),
  })
    .once("directory", directory)
    .pipe(res);
});

server.listen(HTTP_PORT, "0.0.0.0");

const cmd = path.join(__dirname, "node_modules", ".bin", "ngrok");

spawn(cmd, ["http", HTTP_PORT], { stdio: "inherit" }).on("exit", () =>
  process.exit(0)
);

function directory(res, path) {
  const stream = this;

  // redirect to trailing slash for consistent url
  if (!stream.hasTrailingSlash()) {
    return stream.redirect(path);
  }

  // get directory list
  fs.readdir(path, function onReaddir(err, list) {
    if (err) return stream.error(err);

    // render an index for the directory
    res.setHeader("Content-Type", "text/html; charset=UTF-8");
    res.end(list.map((l) => `<a href="${l}">${l}</a>`).join("<br>\n") + "\n");
  });
}
