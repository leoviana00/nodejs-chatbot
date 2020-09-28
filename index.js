// Adicionando pacotes
var restify = require('restify');
var builder = require('botbuilder');

// Configurando a porta que o projeto irá responder
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Criando um conector com o Bot Framework.
var inMemoryStorage = new builder.MemoryBotStorage();
var connector = new builder.ChatConnector({
    // Como o código irá ser executado em um ambiente local, não será necessário o Microsoft_APP_ID nem o password
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
/* criando duas Actions uma com um POST, para que o nosso Bot possa receber as mensagens dos nossos usuários 
e uma outra com um request para que o Bot possa interagir com os usuários. */
server.post('/api/messages', connector.listen());
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("Você disse: %s", session.message.text);
    session.send("Olá, em que posso lhe ajudar?");
}).set('storage', inMemoryStorage); //Usando o armazenamento de estado na memória

// Será necessário baixar o Bot Framework Emulator para testar o código
// https://github.com/Microsoft/BotFramework-Emulator/releases










