export default class Banco {
    private static itens: any[] = []

    inserir(item: any) {
        Banco.itens.push(item)
        return item
    }
}