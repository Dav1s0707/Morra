const mongoose = require('mongoose')

const modelo = mongoose.Schema({
    data: Date,
    tipo: String,
    entrega: String,
    diciplina: String,
    intrucoes: String,
    usuario: String,
    titulo:String,
    status:{type:String,default:"0"},
})

const atividades = mongoose.model('atividades', modelo)
module.exports = atividades