import axios from 'axios'
import { getAutorizationHeader } from '../util/auth'
import transacoes from '../data/transacoes'

const baseUrl = process.env.API_URL

test('Deve registrar um novo usuário se não existir', async () => {
    try {
        const headers = await getAutorizationHeader()
        const resp = await axios.post(
            `${baseUrl}/transacao`, 
            transacoes.semId, 
            headers
        )
        expect(resp.status).toBe(200)
    } catch(e: any) {
        console.log(e.response.data)
        expect(e.response.status).toBe(400)
    }
})
test('Deve alterar uma transação por id', async () => {
    try {
        const headers = await getAutorizationHeader()
        const resp = await axios.post(
            `${baseUrl}/transacao/3cf1f688-9370-4a39-b41d-69af8a74b932`, 
            { ...transacoes.semId, valor: -137.65}, 
            headers
        )
        expect(resp.status).toBe(200)
    } catch(e: any) {
        console.log(e.response.data)
        expect(e.response.status).toBe(400)
    }
})

test('Deve popular com uma lista de transações', async () => {
    try {
        const headers = await getAutorizationHeader()
        const respostas = transacoes.lista.map(async transacao => {
            const resp = await axios.post(
                `${baseUrl}/transacao`, 
                transacao, 
                headers
            )
            return resp.status
        })
        const listaDeStatus = await Promise.all(respostas)
        expect(listaDeStatus.every(s => s===200)).toBe(true)
    } catch(e: any) {
        console.log(e.response.data)
        expect(e.response.status).toBe(400)
    }
})
