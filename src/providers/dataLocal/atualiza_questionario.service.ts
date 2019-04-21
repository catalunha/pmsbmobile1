import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Questionario, QuestionariosList } from "../../models/questionario.model";
import { Pergunta } from "../../models/pergunta.model";
import { ObservacaoLocalService } from './observacao.service';
import { Observacao } from '../../models/observacao.model';
import { removeArrayItem } from 'ionic-angular/util/util';

@Injectable()
export class AtualizaQuestionario extends ObservacaoLocalService {

    // Possibilidades de Atualizações de Questionários: 
    // Questionários Adicionados;
    // Questionários Editados:
    //      - Perguntas Removidas;
    //      - Perguntas Editadas;
    //      - Perguntas Adicionadas;
    // Questionários Removidos;

    private criarObservacao: boolean;
    private listaObservacoes: Observacao[];

    constructor(public storage: Storage) {
        super(storage);
    }

    setObservacoes(criarNovas = true) {
        this.criarObservacao = criarNovas;
        this.listaObservacoes = new Array();
    }

    verificarListaQuestionarioPipeline(questionariosServidor: Questionario[], questionariosLocal: QuestionariosList): boolean {
        return this.verificarQuestionarioRemovido(questionariosServidor, questionariosLocal)
    }

    private verificarQuestionarioRemovido(questionariosServidor: Questionario[], questionariosLocal: QuestionariosList): boolean {
        var atualizado = false;
        for (let i = 0; i < questionariosLocal.questionarios.length; i++) {
            var questionarioAux = questionariosServidor.find(q => q.id === questionariosLocal.questionarios[i].id);
            if (!questionarioAux) {
                this.novaObservacao("Atenção: Exclusão de Questionário", "O questionário [" + questionariosLocal.questionarios[i].nome + "] foi removido do servidor de dados.");
                questionariosLocal.questionarios.splice(i, 1);
                i--;
                atualizado = true;
            }
        }

        return (this.verificarQuestionarioAdicionado(questionariosServidor, questionariosLocal) || atualizado);
    }

    private verificarQuestionarioAdicionado(questionariosServidor: Questionario[], questionariosLocal: QuestionariosList): boolean {
        var atualizado = false;
        for (let questionario of questionariosServidor) {
            var questionarioAux = questionariosLocal.questionarios.find(q => q.id === questionario.id);
            if (!questionarioAux) {
                atualizado = true;
                questionariosLocal.questionarios.push(questionario);
                this.novaObservacao("Atualização: Novo Questionário", "O questionário [" + questionario.nome + "] está disponível!");
            }
        }

        return (this.verificarQuestionarioEditado(questionariosServidor, questionariosLocal) || atualizado);
    }

    verificarQuestionarioEditado(questionariosServidor: Questionario[], questionariosLocal: QuestionariosList): boolean {
        var atualizado = false;
        for (let questionarioLocal of questionariosLocal.questionarios) {
            var questionarioServidor = questionariosServidor.find(q => q.id === questionarioLocal.id);

            if (questionarioServidor) {
                if (questionarioServidor.editado_em !== questionarioLocal.editado_em) {
                    //Este questionário foi editado
                    atualizado = this.verificarPerguntasPipeline(questionarioServidor.perguntas, questionarioLocal);
                    //Atualizações Gerais
                    atualizado = this.verificarEdicoesGerais(questionarioServidor, questionarioLocal);
                }
            }
        }

        return atualizado;
    }

    private verificarPerguntasPipeline(perguntasServidor: Pergunta[], perguntasLocal: Questionario): boolean {
        return this.verificarPerguntasAdicionadas(perguntasServidor, perguntasLocal);
    }

    private verificarPerguntasAdicionadas(perguntasServidor: Pergunta[], perguntasLocal: Questionario): boolean {
        console.log("verificarPerguntasAdicionadas")
        var atualizado = false;
        for (let perguntaServidor of perguntasServidor) {
            var perguntaLocal = perguntasLocal.perguntas.find(p => p.id === perguntaServidor.id);
            if (!perguntaLocal) {
                atualizado = true;
                perguntasLocal.perguntas.push(perguntaServidor);
                this.novaObservacao("Atualização: Nova Pergunta", "O questionário [" + perguntasLocal.nome + "] recebeu uma nova pergunta [" + perguntaServidor.texto + "].");
            }
        }
        return (this.verificarPerguntasRemovidas(perguntasServidor, perguntasLocal) || atualizado);
    }

    private verificarPerguntasRemovidas(perguntasServidor: Pergunta[], perguntasLocal: Questionario): boolean {
        console.log("verificarPerguntasRemovidas")
        var atualizado = false;
        for (var i = 0; i < perguntasLocal.perguntas.length; i++) {
            var perguntaServidor = perguntasServidor.find(p => p.id === perguntasLocal.perguntas[i].id);
            if (!perguntaServidor) {
                atualizado = true;
                if (removeArrayItem(perguntasLocal.perguntas, perguntasLocal.perguntas[i])) {
                    this.novaObservacao("Atenção: Exclusão de Pergunta", `Foi removido do questionário 
                    [ ${perguntasLocal.nome} ] a pergunta [ ${perguntasLocal.perguntas[i].texto} ].`);
                };
            }
        }
        return (this.verificarPerguntasEditadas(perguntasServidor, perguntasLocal) || atualizado);
    }

    private verificarPerguntasEditadas(perguntasServidor: Pergunta[], perguntasLocal: Questionario): boolean {
        console.log("verificarPerguntasEditadas")
        var atualizado = false;
        for (let perguntaLocal of perguntasLocal.perguntas) {
            try {
                var perguntaServidor: Pergunta = perguntasServidor.find(q => q.id === perguntaLocal.id);
                if (perguntaServidor) {
                    if (perguntaServidor.editado_em !== perguntaLocal.editado_em) {
                        atualizado = this.veridicarEdicoesGeraisPergunta(perguntaServidor, perguntaLocal);
                        this.novaObservacao("Atenção: Edição de Perguntas", "O questionário [" + perguntasLocal.nome + "] possui perguntas atualizadas.");
                    }
                } else {
                    console.log({ perguntaServidor: perguntaServidor })
                    console.log({ perguntaLocal: perguntaLocal })
                }
            } catch (err) {
                console.log("erro")
                console.log({ perguntaServidor: perguntaServidor })
                console.log({ perguntaLocal: perguntaLocal })
            }

        }
        return atualizado;
    }

    private veridicarEdicoesGeraisPergunta(perguntaServidor: Pergunta, perguntaLocal: Pergunta): boolean {
        var atualizado = false;

        if (perguntaLocal.editado_em !== perguntaServidor.editado_em) {
            atualizado = true;
            perguntaLocal.editado_em = perguntaServidor.editado_em;
        }

        if (perguntaLocal.multipla !== perguntaServidor.multipla) {
            atualizado = true;
            perguntaLocal.multipla = perguntaServidor.multipla;
        }

        if (perguntaLocal.possiveis_escolhas !== perguntaServidor.possiveis_escolhas) {
            atualizado = true;
            perguntaLocal.possiveis_escolhas = perguntaServidor.possiveis_escolhas;
        }

        if (perguntaLocal.resposta !== perguntaServidor.resposta) {
            atualizado = true;
            perguntaLocal.resposta = perguntaServidor.resposta;
        }

        if (perguntaLocal.texto !== perguntaServidor.texto) {
            atualizado = true;
            perguntaLocal.texto = perguntaServidor.texto;
        }

        if (perguntaLocal.tipo !== perguntaServidor.tipo) {
            atualizado = true;
            perguntaLocal.tipo = perguntaServidor.tipo;
        }

        if (perguntaLocal.variavel !== perguntaServidor.variavel) {
            atualizado = true;
            perguntaLocal.variavel = perguntaServidor.variavel;
        }

        perguntaLocal.escolharequisito_set = perguntaServidor.escolharequisito_set;
        perguntaLocal.perguntarequisito_set = perguntaServidor.perguntarequisito_set;

        return atualizado;
    }

    private verificarEdicoesGerais(questionarioServidor: Questionario, questionarioLocal: Questionario): boolean {
        var atualizado = false;

        if (questionarioLocal.nome !== questionarioServidor.nome) {
            this.novaObservacao("Atualização", "O questionário [" + questionarioLocal.nome + "] teve seu nome atualizado para " + questionarioServidor.nome);
            atualizado = true;
            questionarioLocal.nome = questionarioServidor.nome;
        }

        if (questionarioLocal.publicado != questionarioServidor.publicado) {
            atualizado = true;
            questionarioLocal.publicado = questionarioServidor.publicado;
        }

        if (questionarioLocal.usuario !== questionarioServidor.usuario) {
            atualizado = true;
            questionarioLocal.usuario = questionarioServidor.usuario;
        }

        if (questionarioLocal.editado_em !== questionarioServidor.editado_em) {
            atualizado = true;
            questionarioLocal.editado_em = questionarioServidor.editado_em;
        }

        return atualizado;
    }

    private novaObservacao(titulo: string, texto: string) {
        if (this.criarObservacao) {
            var observacao = new Observacao;
            observacao.titulo = titulo;
            observacao.texto = texto;
            this.listaObservacoes.push(observacao);
        }
    }

    salvarObservacoes() {
        if (this.listaObservacoes.length > 0) {
            super.adicionarListaObservacoes(this.listaObservacoes);
        }
    }

}