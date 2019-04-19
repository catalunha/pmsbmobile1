var RespostaQuestionario = /** @class */ (function () {
    function RespostaQuestionario(usuario, questionario) {
        this.usuario = usuario.id;
        this.setor_censitario = questionario.setor_censitario.id;
        this.questionario = questionario.id;
    }
    return RespostaQuestionario;
}());
export { RespostaQuestionario };
//# sourceMappingURL=resposta_questionario.model.js.map