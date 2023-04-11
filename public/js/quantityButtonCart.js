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
            const productId = document.querySelector('[name="productId"]').value;
            const productoARemover = {
                productId: parseInt(productId)
            }
            console.log(productoARemover);
            axios.post('/cart/remove', productoARemover)
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: `1 item removido! Te quedan ${cantidadActual}`,
                showConfirmButton: false,
                timer: 1500
              })
        }
        
        // Actualizar el valor del campo de cantidad
        cantidad.value = cantidadActual.toString()


    });

    // // Agregar evento de clic al botón "+"
    // aumentarBtn.addEventListener('click', function () {

    //     let cantidadActual = parseInt(cantidad.value);
    //     cantidadActual++;
    //     cantidad.value = cantidadActual.toString();
    // });

})
