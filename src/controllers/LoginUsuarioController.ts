import LoginUsuario from "../core/usuario/LoginUsuario";
import { Express } from "express";

export default class LoginUsuarioController {
    constructor(
        private servidor: Express,
        private casoDeUso: LoginUsuario
    ) {
        servidor.post('/login', async (req, res) => {
            try {
                const usuario = await casoDeUso.executar(
                    req.body.email,
                    req.body.senha
                )
                res.status(200).json({
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                })
            } catch (e: any) {
                res.status(403).send(e.message)
            }
        })
    }
}