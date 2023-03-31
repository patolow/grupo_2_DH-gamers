const agregarItem = document.querySelectorAll('.agregarCarrito'); //atrapo todos los botones submit
let carrito = []

agregarItem.forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    // Evita que el formulario se envíe al hacer click
   // Atrapo los datos del producto desde el formulario
   const productId = form.querySelector('[name="productId"]').value;
   const productName = form.querySelector('[name="productName"]').value;
   const productPrice = form.querySelector('[name="productPrice"]').value;

    // Crea un objeto con los datos del producto
    // const product = { id: productId, name: productName, price: productPrice };
    console.log(product);

  });

});

    
