var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ObservacaoLocalService } from './observacao.service';
import { Observacao } from '../../models/observacao.model';
import { removeArrayItem } from 'ionic-angular/util/util';
var AtualizaQuestionario = /** @class */ (function (_super) {
    __extends(AtualizaQuestionario, _super);
    function AtualizaQuestionario(storage) {
        var _this = _super.call(this, storage) || this;
        _this.storage = storage;
        return _this;
    }
    AtualizaQuestionario.prototype.setObservacoes = function (criarNovas) {
        if (criarNovas === void 0) { criarNovas = true; }
        this.criarObservacao = criarNovas;
        this.listaObservacoes = new Array();
    };
    AtualizaQuestionario.prototype.verificarListaQuestionarioPipeline = function (questionariosServidor, questionariosLocal) {
        return this.verificarQuestionarioRemovido(questionariosServidor, questionariosLocal);
    };
    AtualizaQuestionario.prototype.verificarQuestionarioRemovido = function (questionariosServidor, questionariosLocal) {
        var atualizado = false;
        var _loop_1 = function (i) {
            questionarioAux = questionariosServidor.find(function (q) { return q.id === questionariosLocal.questionarios[i].id; });
            if (!questionarioAux) {
                this_1.novaObservacao("Atenção: Exclusão de Questionário", "O questionário [" + questionariosLocal.questionarios[i].nome + "] foi removido do servidor de dados.");
                questionariosLocal.questionarios.splice(i, 1);
                i--;
                atualizado = true;
            }
            out_i_1 = i;
        };
        var this_1 = this, questionarioAux, out_i_1;
        for (var i = 0; i < questionariosLocal.questionarios.length; i++) {
            _loop_1(i);
            i = out_i_1;
        }
        return (this.verificarQuestionarioAdicionado(questionariosServidor, questionariosLocal) || atualizado);
    };
    AtualizaQuestionario.prototype.verificarQuestionarioAdicionado = function (questionariosServidor, questionariosLocal) {
        var atualizado = false;
        var _loop_2 = function (questionario) {
            questionarioAux = questionariosLocal.questionarios.find(function (q) { return q.id === questionario.id; });
            if (!questionarioAux) {
                atualizado = true;
                questionariosLocal.questionarios.push(questionario);
                this_2.novaObservacao("Atualização: Novo Questionário", "O questionário [" + questionario.nome + "] está disponível!");
            }
        };
        var this_2 = this, questionarioAux;
        for (var _i = 0, questionariosServidor_1 = questionariosServidor; _i < questionariosServidor_1.length; _i++) {
            var questionario = questionariosServidor_1[_i];
            _loop_2(questionario);
        }
        return (this.verificarQuestionarioEditado(questionariosServidor, questionariosLocal) || atualizado);
    };
    AtualizaQuestionario.prototype.verificarQuestionarioEditado = function (questionariosServidor, questionariosLocal) {
        var atualizado = false;
        var _loop_3 = function (questionarioLocal) {
            questionarioServidor = questionariosServidor.find(function (q) { return q.id === questionarioLocal.id; });
            if (questionarioServidor) {
                if (questionarioServidor.editado_em !== questionarioLocal.editado_em) {
                    //Este questionário foi editado
                    atualizado = this_3.verificarPerguntasPipeline(questionarioServidor.perguntas, questionarioLocal);
                    //Atualizações Gerais
                    atualizado = this_3.verificarEdicoesGerais(questionarioServidor, questionarioLocal);
                }
            }
        };
        var this_3 = this, questionarioServidor;
        for (var _i = 0, _a = questionariosLocal.questionarios; _i < _a.length; _i++) {
            var questionarioLocal = _a[_i];
            _loop_3(questionarioLocal);
        }
        return atualizado;
    };
    AtualizaQuestionario.prototype.verificarPerguntasPipeline = function (perguntasServidor, perguntasLocal) {
        return this.verificarPerguntasAdicionadas(perguntasServidor, perguntasLocal);
    };
    AtualizaQuestionario.prototype.verificarPerguntasAdicionadas = function (perguntasServidor, perguntasLocal) {
        var atualizado = false;
        var _loop_4 = function (perguntaServidor) {
            perguntaLocal = perguntasLocal.perguntas.find(function (p) { return p.id === perguntaServidor.id; });
            if (!perguntaLocal) {
                atualizado = true;
                perguntasLocal.perguntas.push(perguntaServidor);
                this_4.novaObservacao("Atualização: Nova Pergunta", "O questionário [" + perguntasLocal.nome + "] recebeu uma nova pergunta [" + perguntaServidor.texto + "].");
            }
        };
        var this_4 = this, perguntaLocal;
        for (var _i = 0, perguntasServidor_1 = perguntasServidor; _i < perguntasServidor_1.length; _i++) {
            var perguntaServidor = perguntasServidor_1[_i];
            _loop_4(perguntaServidor);
        }
        return (this.verificarPerguntasRemovidas(perguntasServidor, perguntasLocal) || atualizado);
    };
    AtualizaQuestionario.prototype.verificarPerguntasRemovidas = function (perguntasServidor, perguntasLocal) {
        var atualizado = false;
        for (var i = 0; i < perguntasLocal.perguntas.length; i++) {
            var perguntaServidor = perguntasServidor.find(function (p) { return p.id === perguntasLocal.perguntas[i].id; });
            if (!perguntaServidor) {
                atualizado = true;
                if (removeArrayItem(perguntasLocal.perguntas, perguntasLocal.perguntas[i])) {
                    this.novaObservacao("Atenção: Exclusão de Pergunta", "Foi removido do question\u00E1rio \n                    [ " + perguntasLocal.nome + " ] a pergunta [ " + perguntasLocal.perguntas[i].texto + " ].");
                }
                ;
            }
        }
        return (this.verificarPerguntasEditadas(perguntasServidor, perguntasLocal) || atualizado);
    };
    AtualizaQuestionario.prototype.verificarPerguntasEditadas = function (perguntasServidor, perguntasLocal) {
        var atualizado = false;
        var _loop_5 = function (perguntaLocal) {
            perguntaServidor = perguntasServidor.find(function (q) { return q.id === perguntaLocal.id; });
            if (perguntaServidor.editado_em !== perguntaLocal.editado_em) {
                atualizado = this_5.veridicarEdicoesGeraisPergunta(perguntaServidor, perguntaLocal);
                this_5.novaObservacao("Atenção: Edição de Perguntas", "O questionário [" + perguntasLocal.nome + "] possui perguntas atualizadas.");
            }
        };
        var this_5 = this, perguntaServidor;
        for (var _i = 0, _a = perguntasLocal.perguntas; _i < _a.length; _i++) {
            var perguntaLocal = _a[_i];
            _loop_5(perguntaLocal);
        }
        return atualizado;
    };
    AtualizaQuestionario.prototype.veridicarEdicoesGeraisPergunta = function (perguntaServidor, perguntaLocal) {
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
    };
    AtualizaQuestionario.prototype.verificarEdicoesGerais = function (questionarioServidor, questionarioLocal) {
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
    };
    AtualizaQuestionario.prototype.novaObservacao = function (titulo, texto) {
        if (this.criarObservacao) {
            var observacao = new Observacao;
            observacao.titulo = titulo;
            observacao.texto = texto;
            this.listaObservacoes.push(observacao);
        }
    };
    AtualizaQuestionario.prototype.salvarObservacoes = function () {
        if (this.listaObservacoes.length > 0) {
            _super.prototype.adicionarListaObservacoes.call(this, this.listaObservacoes);
        }
    };
    AtualizaQuestionario = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Storage])
    ], AtualizaQuestionario);
    return AtualizaQuestionario;
}(ObservacaoLocalService));
export { AtualizaQuestionario };
//# sourceMappingURL=atualiza_questionario.service.js.map