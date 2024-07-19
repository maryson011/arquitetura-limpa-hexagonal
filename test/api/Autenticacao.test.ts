import axios from 'axios'
import Usuario from '../../src/core/usuario/Usuario'

const baseUrl = process.env.API_URL

test('Deve registrar um novo usuário se não existir', async () => {
    const usuario: Partial<Usuario> = {
        nome: 'Marcela Paz',
        email: 'marcela@email.com',
        senha: '99999'
    }
    try {
        const resp = await axios.post(`${baseUrl}/registrar`, usuario)
        expect(resp.status).toBe(201)
    } catch (e: any) {
        expect(e.response.status).toBe(400)
        expect(e.response.data).toBe('Usuário já existe!')
    }
})

test('Deve logar com email e senha corretos', async () => {
    const usuario: Partial<Usuario> = {
        email: 'marcela@email.com',
        senha: '99999'
    }
    
    const resp = await axios.post(`${baseUrl}/login`, usuario)
    expect(resp.status).toBe(200)
    expect(resp.data.usuario.nome).toBe('Marcela Paz')
    expect(resp.data.usuario.email).toBe('marcela@email.com')
    expect(resp.data).toHaveProperty('token')
    
})