const jsonServer = require("json-server");
const cors = require("cors");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(process.cwd(), "server", "db.json"));
const middlewares = jsonServer.defaults();

server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (
    req.path.startsWith("/culturas") &&
    (req.method === "POST" || req.method === "PUT")
  ) {
    req.body.ultimaAtualizacao = new Date().toISOString();
  }
  if (req.path.startsWith("/contatos") && req.method === "POST") {
    req.body.dataEnvio = new Date().toISOString();
  }
  next();
});

server.use(router);

module.exports = server;
