import { Questionario } from "./questionario.model";
import { Usuario } from "./usuario.model";
import { RespostaPergunta } from "./resposta_pergunta.model";

export class RespostaQuestionario {
    
    id: string;
    usuario: string;
    setor_censitario: string;
    questionario: string;

    // Após Questionário Ser Sincronizado
    perguntas: RespostaPergunta;

    constructor(usuario: Usuario, questionario: Questionario) {
        this.usuario = usuario.id;
        this.setor_censitario = questionario.setor_censitario.id;
        this.questionario = questionario.id;
    }
}