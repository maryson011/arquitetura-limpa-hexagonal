
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

    async executar(nome: string, email: string, senha: string): Promise<Usuario> {

        const senhaCripto = this.provedorCripto.criptografar(senha)

        const usuarioExistente = await this.colecao.buscarPorEmail(email)
        if(usuarioExistente) throw new Error('Usuário já existe!')

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