let controladorDeCartoes = (function(){
  "use strict"

  var botoes = document.querySelectorAll(".opcoesDoCartao-remove");

  for (var i = 0; i < botoes.length; i++){
    botoes[i].addEventListener("click", removeCartao);
  };

  let $novoCartaoConteudo = document.querySelector(".novoCartao-conteudo");

  $novoCartaoConteudo.addEventListener("input", function(){
    let $error = document.querySelector(".error");
    if ($error){
      $error.remove();
    }

  })


  let contador = $(".cartao").length

    function adicionaCartao(conteudo, cor){
    contador++;

    let conteudoTag = $("<p>").addClass("cartao-conteudo")
                              .prepend(conteudo);

    let tipoCartao = decideTipoCartao(conteudo);

    $("<div>").addClass("cartao")
              .attr("id", "cartao_" + contador)
              .attr("tabindex", 0)
              .addClass(tipoCartao)
              .append(opcoes)
              .append(conteudoTag)
              .css("background-color", cor)
              .prependTo(".mural");

    return adicionaCartao;
  }

  return {
    adicionaCartao : adicionaCartao,
    idUltimoCartao : function(){
      return contador
    }
  }

  function decideTipoCartao(conteudo){
    let quebras = conteudo.split("<br>").length;
    let totalDeLetras = conteudo.replace(/<br>/g, " ").length;

    let ultimoMaior = "";
    conteudo.replace(/<br>/g, " ")
            .split(" ")
            .forEach(function(palavra){
              if (palavra.length > ultimoMaior.length){
                ultimoMaior = palavra;
              }
            });

      let tamMaior = ultimoMaior.length;
      let tipoCartao = "cartao--textoPequeno";

      if (tamMaior < 9 && quebras < 5 && totalDeLetras < 55) {
        tipoCartao = "cartao--textoGrande";
      } else if (tamMaior < 12 && quebras < 6 && totalDeLetras < 55){
        tipoCartao = "cartao-textoMedio";
      }
  }


})();
