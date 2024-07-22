import axios from 'axios'
import Usuario from '../../src/core/usuario/Usuario'

const baseUrl = process.env.API_URL

test('Deve registrar um novo usuário se não existir', async () => {
    const resp = await axios.post(`${baseUrl}/transacao`)
    console.log(resp.data)
    expect(resp.status).toBe(200)
})
