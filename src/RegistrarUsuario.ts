import Banco from "./Banco"
import InverterSenha from "./InverterSenha"

export default class RegistrarUsuario {
    private banco = new Banco()
    private inverterSenha = new InverterSenha()

    executar(nome: string, email: string, senha: string) {

        const senhaCripto = this.inverterSenha.criptografar(senha)

        const usuario = {
            id: Math.random(),
            nome,
            email,
            senha: senhaCripto
        }

        this.banco.inserir(usuario)
        return usuario
    }
}