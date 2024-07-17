import bcrypt from 'bcrypt'
import ProvedorCriptografia from '../../core/usuario/portas/ProvedorCriptografia';

export default class CriptoReal implements ProvedorCriptografia {
    criptografar(senha: string): string {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(senha, salt)
    }

    comparar(senha: string, senhaCriptografada: string): boolean {
        return bcrypt.compareSync(senha, senhaCriptografada)
    }

}