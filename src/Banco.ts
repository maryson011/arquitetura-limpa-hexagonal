import Colecao from "./Colecao"

export default class Banco implements Colecao{
    private static itens: any[] = []

    inserir(item: any) {
        Banco.itens.push(item)
        return item
    }
}