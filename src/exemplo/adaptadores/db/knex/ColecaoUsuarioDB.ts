import ColecaoUsuario from "../../../app/usuario/portas/ColecaoUsuario";
import Usuario from "../../../app/usuario/Usuario";
import conexao from "./conexao";

export default class ColecaoUsuarioDB implements ColecaoUsuario {

    async inserir(usuario: Usuario): Promise<void> {
        await conexao.table('usuarios').insert(usuario)
    }

    buscarPorEmail(email: string): Promise<Usuario | null> {
        return conexao.table('usuarios').where('email', email).first()
    }
}