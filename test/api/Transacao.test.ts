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
