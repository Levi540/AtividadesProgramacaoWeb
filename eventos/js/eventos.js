$(function() {
    $(".coordenadas").mouseenter(function(){
        console.log("O mouse entrou no retngulo");
        $(".valores").fadeIn(1000);
    });

    $(".coordenadas").mousemove(function(e){
        console.log(e.clientX, e.clientY);
        var posicoes = $(this).offset();
        var x = e.clientX - posicoes.left;
        var y = e.clientY - posicoes.top;
        $(".valores").html(`coordenadas x: ${x} e y: ${y}`);
    });

    $(".coordenadas").mouseout(function(){
        console.log("o mouse saiu da área do retangulo");
        $(".valores").fadeOut(1000);
    });

    $("#btn").click(function() {
        $(".sobre").html('<object data="https://pt.wikipedia.org/wiki/Jogo_da_velha"/>');
    });
});