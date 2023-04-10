const agregarItem = document.querySelectorAll('.agregarCarrito');
let carrito = [];

agregarItem.forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const cantidad = document.querySelector('.quantity');

    const productId = form.querySelector('[name="productId"]').value;
    const productName = form.querySelector('[name="productName"]').value;
    const productPrice = form.querySelector('[name="productPrice"]').value;
    const productCategory = form.querySelector('[name="productCategory"]').value;
    const productStock = form.querySelector('[name="productStock"]').value;
    const productImage = form.querySelector('[name="productImage"]').value;

    const quantityCheck = cantidad !== null && cantidad.value !== null ? parseInt(cantidad.value) : 1;

    const product = {
      id: productId,
      name: productName,
      price: productPrice,
      category: productCategory,
      stock: productStock,
      image: productImage,
      quantity: quantityCheck 
    };

    carrito.push(product);
    console.log(carrito);

    // Enviar los productos al servidor usando axios

    axios.post('/cart', carrito)
      .then(response => {
        // console.log(response);
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Producto(s() agregado(s) al carrito!',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(error => {
        //si no esta loggeado, redirecciona al login segun la URL en la que apretamos el boton
        if (error.response?.data?.redirectToLogin) {
          //ToDo: esto debe ser una util function
          const protocol = location.protocol
          const host     = location.host
          const result   = protocol + '//' + host
          window.location.replace(result+"/users/login")
        }
      });
  });
});
