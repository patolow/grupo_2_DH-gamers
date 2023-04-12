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
            let productId = document.querySelector('[name="productId"]').value;
            let productoARemover = {
                productId: parseInt(productId)
            }
            // console.log(productoARemover);
            axios.post('/cart/remove', productoARemover)
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: `1 item removido! Ahora quedan ${cantidadActual}`,
                showConfirmButton: false,
                timer: 1700
              })
        }
        
        // Actualizar el valor del campo de cantidad
        cantidad.value = cantidadActual.toString()


    });

    // // Agregar evento de clic al botón "+"
    aumentarBtn.addEventListener('click', function () {

        let cantidadActual = parseInt(cantidad.value);
        let productStock = document.querySelector('[name="productStock"]').value;
        let productId = document.querySelector('[name="productId"]').value;


        if (cantidadActual < productStock) {
            cantidadActual++;
            cantidad.value = cantidadActual.toString();

            const productoAgregar = {
                productId: parseInt(productId)
            }
            // console.log(productoAgregar);
            axios.post('/cart/add', productoAgregar)
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: `1 item agregado! Ahora son ${cantidadActual}`,
                showConfirmButton: false,
                timer: 1700
              })
        }
        else {
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: `No se pueden agregar  mas item, el stock maximo de ${cantidadActual} alcanzado`,
                showConfirmButton: false,
                timer: 1500
            })
        }
        
    });

})
