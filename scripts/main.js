var ingame = 0;
var soma = 0;
var casas = new Array(1,1,1,1,1,1,1,1);
var backup = new Array(1,1,1,1,1,1,1,1);
var impossiveis = new Array();
var aux = 0;
var contem = -1;

$(".casa").click(function(event){
    if (ingame == 0){
        value = prompt("Digite o nome do jogador:");
        if (value != null && value != ""){
            var status = $(this).attr('id');
            var id = status.slice(-1);
            var hist = parseInt(id);
            hist = hist + 1;
            $(this).text("");
            $( this ).prepend(hist + ": " + value );
        }
        if  (value=="del") {
            $(this).text("");
        }
    }
    if (ingame == 1){
        var status = $(this).attr('id');
        var id = status.slice(-1);
        if (casas[id] == 1){
            somar();
            if (soma > 3){
                casas[id] = 0;
                colorir();
                impossiveis.push(id);
            }
            if (soma == 3){
                casas[id] = 0;
                impossiveis.push(id);
                aux = impossiveis.shift();
                casas[aux] = 1;
                colorir();
            } 
            var hist = parseInt(id);
            hist = hist + 1;
            $("#historico").prepend(" - " + hist);
        }
    }   

    if (ingame == 2){
        $(this).text("");
        var status = $(this).attr('id');
        var id = status.slice(-1);
        var contem = impossiveis.indexOf(id);
        casas[id] = 0;
        if (contem >= 0){      
            impossiveis.splice(contem, 1);
        }
        if (contem < 0){
            aux = impossiveis.shift();
            casas[aux] = 1;
            colorir();
        }
        ingame = 1;
    }
});

$("#start").click(function(){
    ingame = 1;
    for (var i = 8 - 1; i >= 0; i--) {
        if ($("#casa" + i).text()=="") {
            casas[i] = 0;
        }
    }
    colorir();
});

$("#morreu").click(function(){
    contem = -1;
    ingame = 2;
});

function colorir(){
    for (var i = 8 - 1; i >= 0; i--) {
        if  (casas[i]==0){
            document.getElementById("casa" + i).style.background = "url('images/vermelho-app.png')";
        }
        if  (casas[i]==1){
            document.getElementById("casa" + i).style.background = "url('images/verde-app.png')";
        }
    }
}

function somar(){
    soma = 0;
    for (var i = 8 - 1; i >= 0; i--) {
        soma = soma + casas[i]
    }
    return soma;
}