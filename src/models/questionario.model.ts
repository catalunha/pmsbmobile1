import { Pergunta } from './pergunta.model';
import { Usuario } from './usuario.model';
import { RespostaQuestionario } from './resposta_questionario.model';
import { SetorCensitario } from './setor_censitario.model';

export class Questionario {

    id          : string;
    usuario     : Usuario;
    nome        : string;
    criado_em   : string;
    editado_em  : string;
    iniciado_em : string;
    publicado   : boolean;
    perguntas   : Pergunta[];

    // Não pertence ao JSON original
    atualizado_em               : string;
    resposta_questionario       : RespostaQuestionario;  // Questionario Sincronizado
    questionario_sincronizado   : boolean;

    setor_censitario            : SetorCensitario;

    constructor() {
        this.perguntas = new Array();
    }
}

export class QuestionariosList {
    key             : string;
    questionarios   : Questionario[];

    constructor(key = "") {
        this.key = key;
        this.questionarios = new Array();
    }
}

