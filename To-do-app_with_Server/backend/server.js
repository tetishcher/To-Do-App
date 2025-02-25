const http = require("http");
const fs = require("fs");
const path = require("path");
const { getRequestBody } = require("./utils.js");
const databaseFile = path.resolve(__dirname, "items.json");
const encoding = "utf-8";

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "GET") {
    const items = await fs.promises.readFile(databaseFile, encoding);
    res.writeHead("200");
    res.write(items);
    res.end();
  } else if (req.method === "POST") {
    const itemsText = await fs.promises.readFile(databaseFile, encoding);
    const reqItemText = await getRequestBody(req);
    const reqItem = JSON.parse(reqItemText);
    const items = JSON.parse(itemsText);
    console.log(reqItem);
    console.log(items);
    if ( reqItem.action === "delete") {
      const index = items.findIndex((item) => item.id === reqItem.id);
      items.splice(index, 1);
    } else {
      reqItem.id = items[items.length - 1].id + 1 || 1
      items.push(reqItem);
    }
    const respText = JSON.stringify(items);
    fs.promises.writeFile(databaseFile, respText);
    res.writeHead("200");
    res.write(respText);
    res.end();
  }
});

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`The server is running http://localhost:${PORT}`);
});