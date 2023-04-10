window.addEventListener('load', function (){

    const disminuirBtn = document.querySelector('.qty-minus'); 
    const aumentarBtn = document.querySelector('.qty-plus');
    const cantidad = document.querySelector('.quantity');
    
    // Agregar evento de clic al botón "-"
    disminuirBtn.addEventListener('click', function (){
        // Obtener el valor actual del campo de cantidad
        let cantidadActual = parseInt(cantidad.value);
  
        // Disminuir la cantidad en 1 si el valor actual es mayor que 0
        if (cantidadActual > 1) {
            cantidadActual--;
        }
        
        // Actualizar el valor del campo de cantidad
        cantidad.value = cantidadActual.toString()
    });

    // Agregar evento de clic al botón "+"
    aumentarBtn.addEventListener('click', function () {

        let cantidadActual = parseInt(cantidad.value);
        cantidadActual++;
        cantidad.value = cantidadActual.toString();
    });

})
