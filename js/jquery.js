// Abrir / Cerra tanto catálogo como carrito
$(document).ready(function(){
    $("#catalogo, #carro").hide();
});
$("#lista").prepend('<button class="open">↓ Catálogo</button>').click(function(){
    $("#catalogo").toggle(500);
});

$("#lista2").prepend('<button class="open">↓ Carrito</button>').click(function(){
    $("#carro").toggle(500);
});

// Vaciar carrito
$("#carro").append('<button class="clean">Vaciar</button>');
$(document).ready(function(){
    $(".clean").click(function(){
        $(".cartshop").empty("<article>");
    });
});

// Comprar
$("#carro").append('<button class="buy">Comprar</button>');
$(".buy").click(function(){
    alert("¡Su compra ha sido realizada con éxito!");
    $(".cartshop").empty()
});
$("#contador").append('<h6></h6>')
