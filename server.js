#!/usr/env node

const http = require("http");
const fs = require("fs");
const path = require("path");
const parseUrl = require("parseurl");
const send = require("send");
const portfinder = require("portfinder");
const { spawn } = require("child_process");

const server = http.createServer(function onRequest(req, res) {
  send(req, parseUrl(req).pathname, {
    index: false,
    root: process.cwd(),
  })
    .once("directory", directory)
    .pipe(res);
});

async function run() {
  const port = await portfinder.getPortPromise({ port: 8686 });
  server.listen(port, "0.0.0.0");
  const cmd = path.join(__dirname, "node_modules", ".bin", "ngrok");
  spawn(cmd, ["http", port], { stdio: "inherit" }).on("exit", () =>
    process.exit(0)
  );
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

// Note: the majority of this code is copy/pasted from the `send` module's examples

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
