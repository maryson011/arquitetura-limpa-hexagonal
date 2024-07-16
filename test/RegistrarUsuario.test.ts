import Colecao from '../src/Colecao';
import Banco from '../src/Banco';
import RegistrarUsuario from '../src/RegistrarUsuario';
import InverterSenha from '../src/InverterSenha';

test('Deve registrar um usuário', () => {
    const colecao = new Banco()
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