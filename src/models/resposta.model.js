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
var Resposta = /** @class */ (function () {
    function Resposta() {
    }
    return Resposta;
}());
export { Resposta };
var TextoResposta = /** @class */ (function (_super) {
    __extends(TextoResposta, _super);
    function TextoResposta() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TextoResposta;
}(Resposta));
export { TextoResposta };
var EscolhaUnica = /** @class */ (function (_super) {
    __extends(EscolhaUnica, _super);
    function EscolhaUnica() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EscolhaUnica;
}(Resposta));
export { EscolhaUnica };
var MultiplaEscolha = /** @class */ (function (_super) {
    __extends(MultiplaEscolha, _super);
    function MultiplaEscolha() {
        var _this = _super.call(this) || this;
        _this.possiveis_escolhas_id = new Array();
        return _this;
    }
    return MultiplaEscolha;
}(Resposta));
export { MultiplaEscolha };
var Localizacao = /** @class */ (function (_super) {
    __extends(Localizacao, _super);
    function Localizacao() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Localizacao;
}(Resposta));
export { Localizacao };
var Arquivo = /** @class */ (function (_super) {
    __extends(Arquivo, _super);
    function Arquivo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ;
    return Arquivo;
}(Resposta));
export { Arquivo };
var Numero = /** @class */ (function (_super) {
    __extends(Numero, _super);
    function Numero() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Numero;
}(Resposta));
export { Numero };
var Imagem = /** @class */ (function (_super) {
    __extends(Imagem, _super);
    function Imagem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Imagem;
}(Resposta));
export { Imagem };
//# sourceMappingURL=resposta.model.js.map