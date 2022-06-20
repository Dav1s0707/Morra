const express = require('express')
//importa o express

//executa o express
const app = express()

//definir porta do servidor
const porta = process.env.PORT || 3

//criar rota do tipo send

// app.get('/',(req, res)=>{
//     res.send("<marquee Cuidado com a Cuca que a Cuca te pega E pega daqui e pega de lá <br> Cuidado com a Cuca que a Cuca te pega E pega daqui e pega de lá")
// })
//app.listen(porta)
// 11/05

//definir pasta para css
app.use(express.static('./assets'))

//definir o express como body parse
app.use(express.urlencoded({extended:false}))


module.exports = { app, porta }
