
// import Colecao from "../portas/Colecao"
import ProvedorCriptografia from "./portas/ProvedorCriptografia"
import ColecaoUsuario from "./portas/ColecaoUsuario"
import Usuario from "./Usuario"
import Id from "../shared/Id"

export default class RegistrarUsuario {

    constructor(
        private colecao: ColecaoUsuario,
        private provedorCripto: ProvedorCriptografia
    ) {}

    executar(nome: string, email: string, senha: string): Usuario {

        const senhaCripto = this.provedorCripto.criptografar(senha)

        // const usuario: Partial<Usuario> = {
        const usuario: Usuario = {
            id: Id.gerar(),
            nome,
            email,
            senha: senhaCripto
        }

        this.colecao.inserir(usuario)
        return usuario
    }
}