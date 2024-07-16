import Colecao from '../src/Colecao';
import Banco from '../src/Banco';
import RegistrarUsuario from '../src/RegistrarUsuario';

test('Deve registrar um usuário', () => {
    const colecao: Colecao = new Banco()
    const casoDeUso = new RegistrarUsuario(colecao)
    const usuario = casoDeUso.executar(
        'João da Silva',
        'joão@email.com',
        '1234'
    )

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('João da Silva')
})