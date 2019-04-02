export class Observacao {
    titulo  : string;
    texto   : string;
}

export class ObservacaoList {
    key     : string;
    lista   : Observacao[];

    constructor(key = ""){
        this.key = key;
        this.lista = new Array();
    }
}