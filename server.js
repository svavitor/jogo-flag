var connect = require('connect');
 var serveStatic = require('serve-static');

 connect()
     .use(serveStatic(__dirname))
     .listen(8080, () => console.log('Rodando em http://localhost:8080/jogo.html...'));