require('dotenv/config')
const express = require('express')

const TransacoesRepositorio = require("./transacoes-repositorio")

const app = express()

const port = 3002

// Permite acessar o req.body
app.use(express.json());
// "Serve" arquivos da pasta public
app.use(express.static(`${__dirname}/public`))

app.get('/transacoes', (req, res) => {
    const repositorio = new TransacoesRepositorio()
    const transacoes = repositorio.listarTransacoes()
    //{
    //    transacoes;[
    //        {"valor: "10", "descricao":"bolo", "categoria": "despesa"}
    //    ]
    //}
    let saldo = 0
    transacoes.transacoes.forEach((transacao)=> {
        if(transacao.categoria === "Despesa"){
            saldo = saldo - transacao.valor
        }
        if (transacao.categoria === "Receita"){
            saldo = saldo + transacao.valor
        }
    })
    transacoes.saldo = saldo
    console.log(transacoes)
    res.send(transacoes)
})

app.post('/transacoes', (req, res) => {
    const repositorio = new TransacoesRepositorio()
    const transacao = req.body
    console.log(transacao);
    repositorio.criarTransacao(transacao)
    res.status(201).send(transacao)
})

app.listen(port, () => {
    console.log(`Servidor ouvindo na porta ${port}`)
})
