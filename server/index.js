const jsonServer = require("json-server");
const cors = require("cors");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3001;

// Habilitar CORS para qualquer origem (necessário para o frontend na Vercel)
server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

server.use(middlewares);

// Middleware para adicionar ultimaAtualizacao automaticamente em POST e PUT de culturas
server.use(jsonServer.bodyParser);
server.use((req, _res, next) => {
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

server.listen(PORT, () => {
  console.log(`OrbitAgro API rodando na porta ${PORT}`);
  console.log(`Endpoints disponíveis:`);
  console.log(`  GET    /culturas`);
  console.log(`  GET    /culturas/:id`);
  console.log(`  POST   /culturas`);
  console.log(`  PUT    /culturas/:id`);
  console.log(`  DELETE /culturas/:id`);
  console.log(`  GET    /alertas`);
  console.log(`  GET    /alertas/:id`);
  console.log(`  POST   /contatos`);
});
