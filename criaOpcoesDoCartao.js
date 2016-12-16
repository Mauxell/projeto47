let criaOpcoesDoCartao = (function (){
  "use strict"

  function removeCartao() {
    var cartao = document.querySelector("#cartao_" + this.getAttribute("data-ref"));
    cartao.classList.add("cartao--some");
    setTimeout(function(){
      cartao.remove();
      $(document).trigger("precisaSincronizar");
    },400);
  }

  let ehPraEditar = false;
  function toggleEdicao(){
    let cartao = $("#cartao_" + this.dataset.red);
    let conteudo = cartao.find(".cartao-conteudo");

    if(ehPraEditar){
      ehPraEditar = false;
      conteudo.attr("contenteditable", false);
      conteudo.blur();
    } else {
      ehPraEditar = true;
      conteudo.attr("contenteditable", true);
      conteudo.focus();
    }
  };


  return function (idNovoCartao){

    let botaoRemove = $("<button>").addClass("opcoesDoCartao-remove")
                                   .addClass("opcoesDoCartao-opcao")
                                   .attr("data-ref", idNovoCartao)
                                   .text("Remover")
                                   .click(removeCartao);

    let botaoEdita = $("<button>").addClass("opcoesDoCartao-edita")
                                  .addClass("opcoesDoCartao-opcao")
                                  .attr("data-ref", idNovoCartao)
                                  .text("Editar")
                                  .click(toggleEdicao);

    let opcoes = $("<div>").addClass("opcoesDoCartao")
                           .append(botaoRemove)
                           .append(botaoEdita);

    return opcoes;

  }

})();
