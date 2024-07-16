import RegistrarUsuario from '../src/RegistrarUsuario';

test('Deve registrar um usuário', () => {
    const casoDeUso = new RegistrarUsuario()
    const usuario = casoDeUso.executar(
        'João da Silva',
        'joão@email.com',
        '1234'
    )

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('João da Silva')
})