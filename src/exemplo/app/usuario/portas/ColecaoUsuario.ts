import Usuario from "../Usuario";

export default interface ColecaoUsuario {
    inserir(usuario: Usuario): Promise<void>
    buscarPorEmail(email: string): Promise<Usuario | null>
}