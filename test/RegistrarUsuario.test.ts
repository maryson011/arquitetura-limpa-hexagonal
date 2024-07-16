import Colecao from '../src/exemplo/app/portas/Colecao';
import BancoEmMemoria from '../src/exemplo/adaptadores/BancoEmMemoria';
import RegistrarUsuario from '../src/exemplo/app/usuario/RegistrarUsuario';
import InverterSenha from '../src/exemplo/adaptadores/InverterSenha';
import SenhaComEspaco from '../src/exemplo/adaptadores/SenhaComEspaco';

test('Deve registrar um usuário invertendo a senha', () => {
    const colecao = new BancoEmMemoria()
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
    const colecao = new BancoEmMemoria()
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