import Banco from "./Banco"

export default class RegistrarUsuario {
    private banco = new Banco()

    executar(nome: string, email: string, senha: string) {

        const senhaCripto = senha.split('').reverse().join('')

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