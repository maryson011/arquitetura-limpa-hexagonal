import Colecao from '../src/exemplo/app/portas/Colecao';
// import BancoEmMemoria from '../src/exemplo/adaptadores/db/BancoEmMemoria';
import UsuarioEmMemoria from '../src/adaptadores/db/UsuarioEmMemoria';
import RegistrarUsuario from '../src/core/usuario/RegistrarUsuario';
import InverterSenha from '../src/adaptadores/auth/InverterSenha';
import SenhaComEspaco from '../src/adaptadores/auth/SenhaComEspaco';
import CriptoReal from '../src/adaptadores/auth/CriptoReal';
import ColecaoUsuarioDB from '../src/adaptadores/db/knex/ColecaoUsuarioDB'

test('Deve registrar um usuário invertendo a senha', async () => {
    const colecao = new UsuarioEmMemoria()
    const provedorCripto = new InverterSenha()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
    const usuario = await casoDeUso.executar(
        'João da Silva',
        'joão@email.com',
        '1234'
    )

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('João da Silva')
    expect(usuario.senha).toBe('4321')
})
test('Deve registrar um usuário com senha com espaço', async () => {
    const colecao = new UsuarioEmMemoria()
    const provedorCripto = new SenhaComEspaco()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
    const usuario = await casoDeUso.executar(
        'João da Silva',
        'joão@email.com',
        '1234'
    )

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('João da Silva')
    expect(usuario.senha).toBe('1 2 3 4')
})

test('Deve registrar um usuário com senha criptografada', async () => {
    const colecao = new UsuarioEmMemoria()
    const provedorCripto = new CriptoReal()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
    const usuario = await casoDeUso.executar(
        'João da Silva',
        'joão@email.com',
        '1234'
    )

    console.log(usuario.senha)

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('João da Silva')
    expect(provedorCripto.comparar('1234', usuario.senha!)).toBeTruthy()
})


test.skip('Deve registrar um usuário no banco real', async () => {
    const colecao = new ColecaoUsuarioDB()
    const provedorCripto = new CriptoReal()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)

    const usuario = await casoDeUso.executar(
        'Marcelo Brito',
        'marcelo@gmail.com',
        '2222'
    )

    console.log(usuario.senha)

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('Marcelo Brito')
    expect(provedorCripto.comparar('2222', usuario.senha!)).toBeTruthy()
})

test('Deve lançar erro ao cadastrar usuario já cadastrado', async () => {
    const colecao = new UsuarioEmMemoria()
    const provedorCripto = new CriptoReal()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)

    const nome = 'João da Silva'
    const email = 'joão@email.com'
    const senha = '1234'

    await casoDeUso.executar(nome, email, senha)
    const exec = async () => await casoDeUso.executar(nome, email, senha)
    await expect(exec).rejects.toThrow('Usuário já existe!')
})