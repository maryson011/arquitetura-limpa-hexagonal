import LoginUsuario from "../core/usuario/LoginUsuario";
import { Express } from "express";

export default class LoginUsuarioController {
    constructor(
        private servidor: Express,
        private casoDeUso: LoginUsuario
    ) {
        servidor.post('/login', async (req, res) => {
            try {
                const resposta = await casoDeUso.executar({
                    email: req.body.email,
                    senha: req.body.senha
                }
                )
                res.status(200).json({
                    usuario: resposta.usuario,
                    token: resposta.token,
                })
            } catch (e: any) {
                res.status(403).send(e.message)
            }
        })
    }
}