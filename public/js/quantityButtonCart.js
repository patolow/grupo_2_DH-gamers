window.addEventListener('load', function (){

  const disminuirBtns = document.querySelectorAll('.qty-minus'); 
  const aumentarBtns = document.querySelectorAll('.qty-plus');
  const cantidades = document.querySelectorAll('.quantity');

  disminuirBtns.forEach(function(disminuirBtn, index) {
    // Agregar evento de clic al botón "-"
    disminuirBtn.addEventListener('click', function (){
      // Obtener el valor actual del campo de cantidad
      let cantidadActual = parseInt(cantidades[index].value);

      // Disminuir la cantidad en 1 si el valor actual es mayor que 0
      if (cantidadActual > 1) {
        cantidadActual--;
        let productId = document.querySelector('[name="productId"]').value;
        let productoARemover = {
            productId: parseInt(productId)
        }
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
      cantidades[index].value = cantidadActual.toString()
    });
  });

  aumentarBtns.forEach(function(aumentarBtn, index) {
    // Agregar evento de clic al botón "+"
    aumentarBtn.addEventListener('click', function () {

      let cantidadActual = parseInt(cantidades[index].value);
      let productStock = document.querySelectorAll('[name="productStock"]')[index].value;
      let productId = document.querySelectorAll('[name="productId"]')[index].value;


      if (cantidadActual < productStock) {
        cantidadActual++;
        cantidades[index].value = cantidadActual.toString();

        const productoAgregar = {
          productId: parseInt(productId)
        }
        axios.post('/cart/add', productoAgregar)
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: `1 item agregado! Ahora son ${cantidadActual}`,
          showConfirmButton: false,
          timer: 1700
        })
      } else {
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: `No se pueden agregar  mas item, el stock maximo de ${cantidadActual} alcanzado`,
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  });

});
