(function(){
  "use strict"
  let usuario = "mauxell@gmail.com";

  $(document).on("precisaSincronizar", function(){
    $("#sync").removeClass("botaoSync--sincronizado");
    $("#sync").addClass("botaoSync--esperando")
  });

  $(document).on("precisaSincronizar", function(){
    let cartoes = [];

    $(".cartao").each(function(){
      let cartao = {};
      cartao.conteudo = $(this).find(".cartao-conteudo").html();
      cartao.cor = $(this).css("background-color");
      cartoes.push(cartao)
    })
  });

  $("#sync").click(function(){
    $(document).trigger("precisaSincronizar");
  })

  $.getJSON("https:ceep.herokuapp.com/cartoes/carregar?callback=?",
   {usuario : usuario},
  function(res){
    let cartoes = res.cartoes;
    console.log(cartoes.length + " carregados em " + res.usuario);
    cartoes.forEach(function(cartao){
      controladorDeCartoes.adicionaCartao(cartao.conteudo);
    });
  })

  $("#sync").click(function(){
    let cartoes = [];
    $(".cartao").each(function(){
      let cartao = {};
      cartao.conteudo = $(this).find(".cartao-conteudo").html();
      cartoes.push(cartao);
    })

    let mural = {
      usuario : usuario,
      cartoes : cartoes
    }

    var mauxell = new Mauxell();

    mauxell.ajax({
      url: "https://ceep.herokuapp.com/cartoes/salvar",
      method: "POST",
      data: mural,
      success : function(res){
        $("#sync").addClass("botaoSync--sincronizado");
        console.log(res.quantidade + "cartões salvos em " + res.usuario);

        let quantidadeRemovidos = controladorDeCartoes.idUltimoCartao() - res.quantidade;
        console.log(quantidadeRemovidos + " Cartoes removidos");
      },
      error : function(){
        $("#sync").addClass("botaoSync--deuRuim");
        console.log("Não foi possível salvar o mural");
      },
      complete : function(){
        $("#sync").removeClass("botaoSync--esperando");
      }
    });

  });

  $("#sync").click(function(){
    $("#sync").removeClass("botaoSync--sincronizado");
    $("#sync").addClass("botaoSync--esperando");
  });
})();
