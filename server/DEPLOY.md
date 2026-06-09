# OrbitAgro API — Guia de Deploy

## Deploy da API no Render (Gratuito)

### Passo a passo:

1. **Crie uma conta** em [render.com](https://render.com)

2. **Crie um novo repositório** no GitHub apenas com a pasta `server/`:
   ```bash
   # Na raiz do projeto
   cd server
   git init
   git add .
   git commit -m "API OrbitAgro"
   git remote add origin https://github.com/SEU_USER/orbitagro-api.git
   git push -u origin main
   ```

3. **No Render, crie um "New Web Service":**
   - Conecte o repositório `orbitagro-api`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
   - Plano: **Free**

4. **Após o deploy**, o Render vai gerar uma URL como:
   ```
   https://orbitagro-api.onrender.com
   ```

5. **Configure o frontend** para usar essa URL:
   - Na Vercel, adicione a variável de ambiente:
     - Key: `VITE_API_URL`
     - Value: `https://orbitagro-api.onrender.com`

### Endpoints disponíveis:

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /culturas | Listar todas as culturas |
| GET | /culturas/:id | Buscar cultura por ID |
| POST | /culturas | Criar nova cultura |
| PUT | /culturas/:id | Atualizar cultura |
| DELETE | /culturas/:id | Remover cultura |
| GET | /alertas | Listar todos os alertas |
| GET | /alertas/:id | Buscar alerta por ID |
| POST | /contatos | Enviar mensagem de contato |

### Testando localmente:

```bash
cd server
npm install
npm start
# API disponível em http://localhost:3001
```
