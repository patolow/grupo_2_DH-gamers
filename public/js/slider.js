//almacenar slider en una variable
var slider =$('#slider');
//almacenar botones
var siguiente = $('#btn-next');
var anterior = $('#btn-prev');
//mover ultima imagen al primer lugar
$('#slider section:last').insertBefore('#slider section:first')
//mostrar la primera imagen con un margen de -100%
slider.css('margin-left', '-'+100+'%');

function moverD(){
    slider.animate({
        marginLeft:'-'+200+'%'
    } , 700, function(){
        $('#slider section:first').insertAfter('#slider section:last');
        slider.css('margin-left', '-'+100+'%');
    });
}

function moverI(){
    slider.animate({
        marginLeft:0
    } , 700, function(){
        $('#slider section:last').insertBefore('#slider section:first');
        slider.css('margin-left', '-'+100+'%');
    });
}



siguiente.on('click', function() {
    moverD();
});

anterior.on('click', function() {
    moverI();
});




//



//almacenar slider en una variable
var slider2 =$('#slider2');
//almacenar botones
var siguiente2 = $('#btn-next2');
var anterior2 = $('#btn-prev2');
//mover ultima imagen al primer lugar
$('#slider2 section:last').insertBefore('#slider2 section:first')
//mostrar la primera imagen con un margen de -100%
slider2.css('margin-left', '-'+100+'%');

function moverD2(){
    slider2.animate({
        marginLeft:'-'+200+'%'
    } , 700, function(){
        $('#slider2 section:first').insertAfter('#slider2 section:last');
        slider2.css('margin-left', '-'+100+'%');
    });
}

function moverI2(){
    slider2.animate({
        marginLeft:0
    } , 700, function(){
        $('#slider2 section:last').insertBefore('#slider2 section:first');
        slider2.css('margin-left', '-'+100+'%');
    });
}



siguiente2.on('click', function() {
    moverD2();
});

anterior2.on('click', function() {
    moverI2();
});