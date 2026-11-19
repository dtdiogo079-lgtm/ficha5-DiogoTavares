# A minha coleção de cartas

## Como executar o projeto

### 1. Iniciar o servidor

Abre um terminal na pasta principal do projeto e executa:

```bash
node --watch server.js
```

O servidor fica disponível em http://localhost:3000.

### 2. Iniciar o React

Abre um segundo terminal e executa:

```bash
cd client
npm run dev
```

A aplicação fica disponível em http://localhost:5173.

## Perguntas

### 3. Porque é que o browser bloqueia o fetch quando falta CORS?

O browser utiliza a política CORS para controlar os pedidos entre origens diferentes. Mesmo que o servidor responda, o browser pode impedir que o JavaScript aceda à resposta se faltar o cabeçalho `Access-Control-Allow-Origin`.

### 4. Quantos pedidos são feitos e onde vivem os dados?

A aplicação faz um pedido à API quando é aberta. Ao filtrar as cartas, não são feitos novos pedidos, porque os filtros funcionam com os dados já recebidos. Os dados vivem no servidor e são enviados em formato JSON. O React constrói o HTML no cliente.