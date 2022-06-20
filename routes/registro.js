module.exports = (app) => {
    app.get('/registro', (req, res) => {
        res.render('registro.ejs')
    })

    //gravar as informaes digitadas no mongo
    app.post("/registro", async(req, res) => {
        //recuperar as informaçoes digitas
        var dados = req.body
        //iportar as config  do database
        var database = require('../config/database')()
        //definir em qual coelção vamos gravar
        var usuarios = require("../models/usuarios")
        //verificar se email esta cadastrado
        var verificar = await usuarios.findOne({email:dados.email})
        if(verificar){
            return res.send("email ja cadastrado")
        } 

        //cripitografar a senha
        var cript = require("bcryptjs")
        var senhasegura = await cript.hash(dados.senha,10) 


        //gravar o documento
        var documento = await new usuarios ({
            nome: dados.nome,
            email: dados.email,
            senha: senhasegura
        }).save()
        res.redirect('/login')



    })


}