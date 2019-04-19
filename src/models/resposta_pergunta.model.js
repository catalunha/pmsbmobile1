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
var RespostaPergunta = /** @class */ (function () {
    function RespostaPergunta(questionario, pergunta) {
        if (pergunta.resposta.longitude !== "" && pergunta.resposta.latitude !== "") {
            this.localizacao = new Coordenada();
            this.localizacao.altitude = "000";
            this.localizacao.latitude = String(pergunta.resposta.latitude).substring(0, 7);
            this.localizacao.longitude = String(pergunta.resposta.longitude).substring(0, 7);
        }
        else {
            this.localizacao = null;
        }
        this.resposta_questionario = questionario.resposta_questionario.id;
        this.pergunta = pergunta.id;
    }
    return RespostaPergunta;
}());
export { RespostaPergunta };
var RespostaTipo = /** @class */ (function () {
    function RespostaTipo(resposta_pergunta) {
        this.resposta_pergunta = resposta_pergunta;
    }
    return RespostaTipo;
}());
export { RespostaTipo };
var TipoTextoResposta = /** @class */ (function (_super) {
    __extends(TipoTextoResposta, _super);
    function TipoTextoResposta(pergunta) {
        var _this = _super.call(this, pergunta.resposta_pergunta.id) || this;
        _this.texto = pergunta.resposta.texto;
        return _this;
    }
    return TipoTextoResposta;
}(RespostaTipo));
export { TipoTextoResposta };
var TipoPossivelEscolhaResposta = /** @class */ (function (_super) {
    __extends(TipoPossivelEscolhaResposta, _super);
    function TipoPossivelEscolhaResposta(pergunta, possivel_escolha) {
        var _this = _super.call(this, pergunta.resposta_pergunta.id) || this;
        _this.possivel_escolha = possivel_escolha;
        return _this;
    }
    return TipoPossivelEscolhaResposta;
}(RespostaTipo));
export { TipoPossivelEscolhaResposta };
var TipoLocalizacaoResposta = /** @class */ (function (_super) {
    __extends(TipoLocalizacaoResposta, _super);
    function TipoLocalizacaoResposta(pergunta, coordenada) {
        var _this = _super.call(this, pergunta.resposta_pergunta.id) || this;
        _this.coordenada = coordenada;
        return _this;
        // this.coordenada.altitude = "000";
        // this.coordenada.longitude = String(pergunta.resposta.longitude).substring(0, 7);
        // this.coordenada.latitude = String(pergunta.resposta.latitude).substring(0, 7);
    }
    return TipoLocalizacaoResposta;
}(RespostaTipo));
export { TipoLocalizacaoResposta };
var TipoArquivoResposta = /** @class */ (function (_super) {
    __extends(TipoArquivoResposta, _super);
    function TipoArquivoResposta(pergunta) {
        var _this = _super.call(this, pergunta.resposta_pergunta.id) || this;
        _this.arquivo = pergunta.resposta.file;
        return _this;
    }
    ;
    return TipoArquivoResposta;
}(RespostaTipo));
export { TipoArquivoResposta };
var TipoNumeroResposta = /** @class */ (function (_super) {
    __extends(TipoNumeroResposta, _super);
    function TipoNumeroResposta(pergunta) {
        var _this = _super.call(this, pergunta.resposta_pergunta.id) || this;
        _this.numero = pergunta.resposta.numero;
        _this.unidade_medida = pergunta.unidade_medida.id;
        return _this;
    }
    return TipoNumeroResposta;
}(RespostaTipo));
export { TipoNumeroResposta };
var TipoImagemResposta = /** @class */ (function (_super) {
    __extends(TipoImagemResposta, _super);
    function TipoImagemResposta(pergunta) {
        var _this = _super.call(this, pergunta.resposta_pergunta.id) || this;
        _this.imagem = pergunta.resposta.imagem;
        return _this;
    }
    return TipoImagemResposta;
}(RespostaTipo));
export { TipoImagemResposta };
var Coordenada = /** @class */ (function () {
    function Coordenada() {
    }
    return Coordenada;
}());
export { Coordenada };
//# sourceMappingURL=resposta_pergunta.model.js.map