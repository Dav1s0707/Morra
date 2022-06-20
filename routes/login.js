module.exports = (app) => {
    app.get('/login', (req, res) => {
        res.render('login.ejs')
    })

    //validar o usuario e a senha
    app.post('/login', async (req, res) => {
        //recuperar as informaçoes do formulario
        var dados = req.body
        //conectar ao bancos de dados
        var database = require("../config/database")()
        //selecionar a modelsdo usuario
        var usuarios = require("../models/usuarios")

        var verificar = await usuarios.findOne({ email: dados.email })

        if (!verificar) {
            return res.send("email não cadastrado")
        }
        var cript = require('bcryptjs')

        var comparar = await cript.compare(dados.senha, verificar.senha)

        if (!comparar) {
            return res.send("Senha errada!")
        }
        //redirecionar para a rota atividades(precisar enviar o id)
        
        res.redirect("/atividades?id="+verificar._id)
    })
}