import { PossivelEscolha } from './possivel_escolha.model';
import { Resposta } from './resposta.model';
import { UnidadeMedida } from './unidade_medida';
import { RespostaPergunta } from './resposta_pergunta.model';

export class Pergunta {

    id                          : string;
    perguntarequisito_set       : PerguntaRequesitoSet[];
    escolharequisito_set        : EscolhaRequesitoSet[];
    criado_em                   : string;
    editado_em                  : string;
    fake_deletado               : false;
    fake_deletado_em            : null;
    variavel                    : string;   
    texto                       : string;
    tipo                        : number;
    usuario                     : string;

    // Para Perguntas com Múltiplas Escolhas
    possiveis_escolhas          : PossivelEscolha[];
    multipla                    : boolean;

    // Para Perguntas com Valores
    maior_que                   : number;
    menor_que                   : number;
    unidade_medida              : UnidadeMedida;

    // Não pertencem ao JSON original
    resposta                    : Resposta;    
    
    pergunta_liberada           : boolean;
    // exibir_pergunta             : boolean;

    // Após Questionário Ser Sincronizado
    resposta_pergunta           : RespostaPergunta;

}

export class PerguntaRequesitoSet {
    id                  : string;
    pergunta_requisito  : PerguntaRequesito;
}

export class PerguntaRequesito {
    id              : string;
    questionario    : string;
    pergunta        : string;
    respondida      : boolean;
}

export class EscolhaRequesitoSet {
    id                  : string;
    questionario        : string;
    pergunta            : string;
    escolha_requisito   : string;
    escolhida           : boolean;
}
