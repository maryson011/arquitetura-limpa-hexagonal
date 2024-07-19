
// import Colecao from "../portas/Colecao"
import ProvedorCriptografia from "./portas/ProvedorCriptografia"
import ColecaoUsuario from "./portas/ColecaoUsuario"
import Usuario from "./Usuario"
import Id from "../shared/Id"
import CasoDeUso from "../shared/CasoDeUso"

export type Entrada = { nome: string, email: string, senha: string }
// DTO - data transfer object
export default class RegistrarUsuario implements CasoDeUso<Entrada, Usuario>{

    constructor(
        private colecao: ColecaoUsuario,
        private provedorCripto: ProvedorCriptografia
    ) {}

    async executar(dto: Entrada ): Promise<Usuario> {

        const senhaCripto = this.provedorCripto.criptografar(dto.senha)

        const usuarioExistente = await this.colecao.buscarPorEmail(dto.email)
        if(usuarioExistente) throw new Error('Usuário já existe!')

        // const usuario: Partial<Usuario> = {
        const usuario: Usuario = {
            id: Id.gerar(),
            nome: dto.nome,
            email: dto.email,
            senha: senhaCripto
        }

        this.colecao.inserir(usuario)
        return usuario
    }
}