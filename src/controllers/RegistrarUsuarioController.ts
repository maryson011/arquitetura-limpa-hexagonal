import RegistrarUsuario from "../core/usuario/RegistrarUsuario";
import { Express } from "express";

export default class RegistrarUsuarioController {
    constructor(
        private servidor: Express,
        private registrarUsuario: RegistrarUsuario
    ) {
        servidor.post('/registrar', async (req, res) => {
            try {
                await registrarUsuario.executar(
                    req.body.nome,
                    req.body.email,
                    req.body.senha
                )
                res.status(201).send()
            } catch (e: any) {
                res.status(400).send(e.message)
            }
        })
    }
}