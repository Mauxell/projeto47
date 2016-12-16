(function(controlador){
  "use strict"
  let $novoCartao = document.querySelector(".novoCartao");
  $novoCartao.addEventListener("submit", function (event){

    if (this.querySelector(".novoCartao-conteudo").value =='' &&
    !this.querySelector(".error")){
      let $msgError = document.createElement("span");
      $msgError.classList.add("error");
      $msgError.textContent = "Preencha o campo acima";

      this.insertBefore($msgError, document.querySelector(".novoCartao-salvar"))
    };
      event.preventDefault();
  });

  $(".novoCartao").submit(function (event){

    let campoConteudo = $(".novoCartao-conteudo");
    let conteudo = campoConteudo.val().trim().replace(/\n/g, "<br>");

    if (conteudo){
      controladorDeCartoes.adicionaCartao(conteudo);
      $(document).trigger("precisaSincronizar");
    }

    campoConteudo.val("");
    event.preventDefault();
  });
  
})(controladorDeCartoes);
