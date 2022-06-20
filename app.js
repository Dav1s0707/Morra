//importa conf dos aquivos
const servidor = require("./config/servidor")
//carregar o express
const app = servidor.app
//carregar porta
const porta = servidor.porta

//carregar rota index (individual)
//const index = require('./routes/index')(app)
    
//importar consign
const consign =require('consign')
consign().include('./routes').into(app)


app.listen(porta)
console.log("http://localhost:3")