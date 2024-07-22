import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import RegistrarUsuarioController from './controllers/RegistrarUsuarioController'
import RegistrarUsuario from './core/usuario/RegistrarUsuario'
import ColecaoUsuarioDB from './adapters/db/knex/ColecaoUsuarioDB'
import CriptoReal from './adapters/auth/CriptoReal'
import LoginUsuario from './core/usuario/LoginUsuario'
import LoginUsuarioController from './controllers/LoginUsuarioController'
import JwtAdapter from './adapters/auth/JwtAdapter'

const app = express()
const port = process.env.PORTA ?? 3001
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.listen(port, () => {
    console.log(`Server is running in port ${port}`)
})

// --------------------------------------------- Rotas abertas

const provedorToken = new JwtAdapter(process.env.JWT_SECRET!)
const colecaoUsuario = new ColecaoUsuarioDB()
const provedorCripto = new CriptoReal()

const registrarUsuario = new RegistrarUsuario(colecaoUsuario, provedorCripto)
const loginUsuario = new LoginUsuario(
    colecaoUsuario, 
    provedorCripto, 
    provedorToken
)

new RegistrarUsuarioController(app, registrarUsuario)
new LoginUsuarioController(app, loginUsuario)

