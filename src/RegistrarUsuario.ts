export default class RegistrarUsuario {
    usuario: any[] = []

    executar(nome: string, email: string, senha: string) {

        const senhaCripto = senha.split('').reverse().join('')

        const usuario = {
            id: Math.random(),
            nome,
            email,
            senha: senhaCripto
        }

        this.usuario.push(usuario)
        return usuario
    }
}