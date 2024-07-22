import Transacao from "../../src/core/transacao/Transacao"

const transacaoRef = {
    descricao: 'Conta de Luz',
    valor: -100,
    vencimento: new Date('2021-01-01'),
    idUsuario:'cf37e7f1-ff91-4950-9e9c-5fc455732786',
} as Transacao

export default {
    semId: transacaoRef,
    lista: [
        {...transacaoRef, valor: 5000, descricao: 'Salário'},
        {...transacaoRef, valor: -450, descricao: 'Conta de luz'},
        {...transacaoRef, valor: -100, descricao: 'Conta de água'},
        {...transacaoRef, valor: -250, descricao: 'Conta de telefone'},
    ]

}