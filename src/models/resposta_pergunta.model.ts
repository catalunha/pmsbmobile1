// import { Resposta } from "./resposta.model";
import { Questionario } from "./questionario.model";
import { Pergunta } from "./pergunta.model";

export class RespostaPergunta {

    id: string;
    localizacao: Coordenada;
    resposta_questionario: string;
    pergunta;

    // Após Resposta Sincronizada
    resposta: RespostaTipo;
    tipo: Number;

    tipo_respostaSincronizada: RespostaTipo;

    constructor(questionario: Questionario, pergunta: Pergunta) {
        if (pergunta.resposta.longitude !== "" && pergunta.resposta.latitude !== "") {
            this.localizacao = new Coordenada();
            this.localizacao.altitude = "000";
            this.localizacao.latitude = String(pergunta.resposta.latitude).substring(0, 7);
            this.localizacao.longitude = String(pergunta.resposta.longitude).substring(0, 7);
        }else{
            this.localizacao = null;
        }
        this.resposta_questionario = questionario.resposta_questionario.id;
        this.pergunta = pergunta.id;
    }
}

export class RespostaTipo {
    resposta_pergunta: string;

    // Após Sincronização
    id: string;
    criado_em: string;
    editado_em: string;

    constructor(resposta_pergunta) {
        this.resposta_pergunta = resposta_pergunta;
    }
}

export class TipoTextoResposta extends RespostaTipo {
    texto: string;

    constructor(pergunta) {
        super(pergunta.resposta_pergunta.id);
        this.texto = pergunta.resposta.texto;
    }
}

export class TipoPossivelEscolhaResposta extends RespostaTipo {
    possivel_escolha: string;

    constructor(pergunta, possivel_escolha) {
        super(pergunta.resposta_pergunta.id);
        this.possivel_escolha = possivel_escolha;
    }
}

export class TipoLocalizacaoResposta extends RespostaTipo {
    coordenada: string;

    constructor(pergunta, coordenada) {
        super(pergunta.resposta_pergunta.id);
        this.coordenada = coordenada;
        // this.coordenada.altitude = "000";
        // this.coordenada.longitude = String(pergunta.resposta.longitude).substring(0, 7);
        // this.coordenada.latitude = String(pergunta.resposta.latitude).substring(0, 7);
    }
}

export class TipoArquivoResposta extends RespostaTipo {
    arquivo: File;

    constructor(pergunta) {
        super(pergunta.resposta_pergunta.id);
        this.arquivo = pergunta.resposta.file;
    };
}

export class TipoNumeroResposta extends RespostaTipo {
    numero: Number;
    unidade_medida: string;

    constructor(pergunta) {
        super(pergunta.resposta_pergunta.id);
        this.numero = pergunta.resposta.numero;
        this.unidade_medida = pergunta.unidade_medida.id;
    }
}

export class TipoImagemResposta extends RespostaTipo {
    imagem: string;

    constructor(pergunta) {
        super(pergunta.resposta_pergunta.id);
        this.imagem = pergunta.resposta.imagem;
    }
}

export class Coordenada {
    altitude: string;
    longitude: string;
    latitude: string;
}