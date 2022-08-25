const transacoes = {
    transacoes: [
        {
            valor: 10,
            descricao: "Pastel"
        },
        {
            valor: 3,
            descricao: "Doce"
        }
    ]
}

class TransacoesRepositorio {

    listarTransacoes() {
        return transacoes
    }

    criarTransacao(transacao) {
        const lista = transacoes.transacoes
        lista.push(transacao)
    }
}

module.exports = TransacoesRepositorio