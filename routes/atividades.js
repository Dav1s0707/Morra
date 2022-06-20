const atividades = require("../models/atividades")
var usuario = require('../models/usuarios')

module.exports = (app) => {
    app.post('/atividades', async (req, res) => {
        var dados = req.body
        //return console.log(dados)
        //Conct Mongo
        const database = require("../config/database")()
        //importar o model atividades
        const atividades = require("../models/atividades")
        //gravar as informaçoes no formulario database
        var gravar = await new atividades({
            data: dados.data,
            tipo: dados.tipo,
            entrega: dados.entrega,
            diciplina: dados.diciplina,
            intrucoes: dados.orientacoes,
            usuario: dados.id,
            titulo: dados.titulo
        }).save()
        //recarregar a pagina atividades
        res.redirect('/atividades?id=' + dados.id)
    })
    app.get('/atividades', async (req, res) => {
        //listar todas as atividades d usuario logado
        var user = req.query.id
        if (!user) {
            res.redirect("/login")
        }
        var usuario = require('../models/usuarios')
        var atividades = require('../models/atividades')

        var dadosUser = await usuario.findOne({ _id: user })
        var dadosAberto = await atividades.find({ usuario: user, status: "0" }).sort({ data: 1 })
        var dadosEntregue = await atividades.find({ usuario: user, status: "1" }).sort({ data: 1 })
        var dadosExcluido = await atividades.find({ usuario: user, status: "2" }).sort({ data: 1 })

        res.render('atividades.ejs', { nome: dadosUser.nome, id: dadosUser._id, dadosAberto, dadosEntregue, dadosExcluido })

        // res.render('atividades.ejs', {
        //   nome: dadosUser.nome,
        // id: dadosUser._id,
        //lista: dadosAtividades})
    })


    app.get('/excluir', async (req, res) => {
        //qual ò documento será excluido da collection atividades?
        var doc = req.query.id
        //excluir  documento
        var excluir = await atividades.findOneAndUpdate(
            { _id: doc },
            { status: "2" }
        )
        //voltar para a atividades
        res.redirect('/atividades?id=' + excluir.usuario)

    })


    app.get('/entregue', async (req, res) => {
        //qual ò documento será excluido da collection atividades?
        var doc = req.query.id
        //excluir  documento
        var entregue = await atividades.findOneAndUpdate(
            { _id: doc },
            { status: "1" }
        )
        //voltar para a atividades
        res.redirect('/atividades?id=' + entregue.usuario)
    })

    app.get('/desfazer', async (req, res) => {
        //qual ò documento será excluido da collection atividades?
        var doc = req.query.id
        //excluir  documento
        var desfazer = await atividades.findOneAndUpdate(
            { _id: doc },
            { status: "0" }
        )
        //voltar para a atividades
        res.redirect('/atividades?id=' + desfazer.usuario)
    })

    //rederinzar a view alterar.ejs
    app.get("/alterar", async (req, res) => {
        //recuperar o id da atividade na barra de endereço
        var id = req.query.id
        //procurar o id na collection atividades
        var alterar = await atividades.findOne({ _id: id })
        //localizar usuario proprietatio da atividades
        var user = await usuario.findOne({ _id: alterar.usuario })
        //renderizar a view alterar e enviar o nome e id do usuario e todos os dados da atividades
        res.render("alterar.ejs", { nome: user.nome, id: user._id, alterar })
    })

    app.post("/alterar", async (req, res) => {
        //armazenar as informaçoes recebidads do formulario
        var dados = req.body
        //visualizar os dados
        res.send(dados)
    })
}