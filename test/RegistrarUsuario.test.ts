import Colecao from '../src/exemplo/app/portas/Colecao';
// import BancoEmMemoria from '../src/exemplo/adaptadores/db/BancoEmMemoria';
import UsuarioEmMemoria from '../src/exemplo/adaptadores/db/UsuarioEmMemoria';
import RegistrarUsuario from '../src/exemplo/app/usuario/RegistrarUsuario';
import InverterSenha from '../src/exemplo/adaptadores/auth/InverterSenha';
import SenhaComEspaco from '../src/exemplo/adaptadores/auth/SenhaComEspaco';
import CriptoReal from '../src/exemplo/adaptadores/auth/CriptoReal';
import ColecaoUsuarioDB from '../src/exemplo/adaptadores/db/knex/ColecaoUsuarioDB'

test('Deve registrar um usuário invertendo a senha', () => {
    const colecao = new UsuarioEmMemoria()
    const provedorCripto = new InverterSenha()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
    const usuario = casoDeUso.executar(
        'João da Silva',
        'joão@email.com',
        '1234'
    )

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('João da Silva')
    expect(usuario.senha).toBe('4321')
})
test('Deve registrar um usuário com senha com espaço', () => {
    const colecao = new UsuarioEmMemoria()
    const provedorCripto = new SenhaComEspaco()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
    const usuario = casoDeUso.executar(
        'João da Silva',
        'joão@email.com',
        '1234'
    )

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('João da Silva')
    expect(usuario.senha).toBe('1 2 3 4')
})

test('Deve registrar um usuário com senha criptografada', () => {
    const colecao = new UsuarioEmMemoria()
    const provedorCripto = new CriptoReal()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
    const usuario = casoDeUso.executar(
        'João da Silva',
        'joão@email.com',
        '1234'
    )

    console.log(usuario.senha)

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('João da Silva')
    expect(provedorCripto.comparar('1234', usuario.senha!)).toBeTruthy()
})


test('Deve registrar um usuário no banco real', () => {
    const colecao = new ColecaoUsuarioDB()
    const provedorCripto = new CriptoReal()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)

    const usuario = casoDeUso.executar(
        'Maria Rose',
        'maria@gmail.com',
        '4321'
    )

    console.log(usuario.senha)

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('Maria Rose')
    expect(provedorCripto.comparar('4321', usuario.senha!)).toBeTruthy()
})