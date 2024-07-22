import Colecao from '../../src/exemplo/app/portas/Colecao';
// import BancoEmMemoria from '../src/exemplo/adaptadores/db/BancoEmMemoria';
import UsuarioEmMemoria from '../../src/adapters/db/UsuarioEmMemoria';
import RegistrarUsuario from '../../src/core/usuario/RegistrarUsuario';
import InverterSenha from '../../src/adapters/auth/InverterSenha';
import SenhaComEspaco from '../../src/adapters/auth/SenhaComEspaco';
import CriptoReal from '../../src/adapters/auth/CriptoReal';
import ColecaoUsuarioDB from '../../src/adapters/db/knex/ColecaoUsuarioDB'
import usuarios from '../data/usuarios';

test('Deve registrar um usuário invertendo a senha', async () => {
    const colecao = new UsuarioEmMemoria()
    const provedorCripto = new InverterSenha()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
    const usuario = await casoDeUso.executar({
        nome: usuarios.completo.nome,
        email: usuarios.completo.email,
        senha: usuarios.completo.senha!,
    })

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('João da Silva')
    expect(usuario.senha).toBe('4321')
})
test('Deve registrar um usuário com senha com espaço', async () => {
    const colecao = new UsuarioEmMemoria()
    const provedorCripto = new SenhaComEspaco()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
    const usuario = await casoDeUso.executar({
        nome: usuarios.completo.nome,
        email: usuarios.completo.email,
        senha: usuarios.completo.senha!,
    })

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('João da Silva')
    expect(usuario.senha).toBe('1 2 3 4')
})

test('Deve registrar um usuário com senha criptografada', async () => {
    const colecao = new UsuarioEmMemoria()
    const provedorCripto = new CriptoReal()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
    const usuario = await casoDeUso.executar({
        nome: usuarios.completo.nome,
        email: usuarios.completo.email,
        senha: usuarios.completo.senha!,
    })

    console.log(usuario.senha)

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('João da Silva')
    expect(provedorCripto.comparar('1234', usuario.senha!)).toBeTruthy()
})


test.skip('Deve registrar um usuário no banco real', async () => {
    const colecao = new ColecaoUsuarioDB()
    const provedorCripto = new CriptoReal()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)

    const usuario = await casoDeUso.executar({
        nome: usuarios.completo.nome,
        email: usuarios.completo.email,
        senha: usuarios.completo.senha!,
    })

    console.log(usuario.senha)

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('Patricia Souza')
    expect(provedorCripto.comparar('99999', usuario.senha!)).toBeTruthy()
})

test('Deve lançar erro ao cadastrar usuario já cadastrado', async () => {
    const colecao = new UsuarioEmMemoria()
    const provedorCripto = new CriptoReal()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)

    const nome = usuarios.completo.nome
    const email = usuarios.completo.email
    const senha = usuarios.completo.senha!

    await casoDeUso.executar({ nome, email, senha })
    const exec = async () => await casoDeUso.executar({ nome, email, senha })
    await expect(exec).rejects.toThrow('Usuário já existe!')
})