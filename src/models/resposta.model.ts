import { PossivelEscolha } from "./possivel_escolha.model";

export class Resposta {
    latitude    : string;
    longitude   : string;    
}

export class TextoResposta extends Resposta {
    public texto : string;
}

export class EscolhaUnica extends Resposta {
    public possivel_escolha_id : PossivelEscolha;
}

export class MultiplaEscolha extends Resposta {
    public possiveis_escolhas_id : PossivelEscolha[];

    constructor(){
        super();
        this.possiveis_escolhas_id = new Array();
    }
}

export class Localizacao extends Resposta {
    public latitudeResposta    : string;
    public longitudeResposta   : string;
}

export class Arquivo extends Resposta {
    public fileName: string;
    public file : string;;
}

export class Numero extends Resposta {
    public numero : Number;
}

export class Imagem extends Resposta {
    public imagem : string;
    // public imageURI: any;
}