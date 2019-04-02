export class SetorCensitario {
    id: string;
    criado_em: string;
    editado_em: string;
    fake_deletado: boolean;
    fake_deletado_em: boolean;
    nome: string;
    setor_superior: string
}

export class SetorCensitarioList {
    key                     : string;
    setoresCensitarios      : SetorCensitario[];

    constructor(key = "") {
        this.key = key;
        this.setoresCensitarios = new Array();
    }
}