const axios = require('axios');

const agregarItem = document.querySelectorAll('.agregarCarrito');
let carrito = [];

agregarItem.forEach(form => { 
  form.addEventListener('submit', e => {
    e.preventDefault();

    const productId = form.querySelector('[name="productId"]').value;
    const productName = form.querySelector('[name="productName"]').value;
    const productPrice = form.querySelector('[name="productPrice"]').value;

    const product = { id: productId, name: productName, price: productPrice };
    
    carrito.push(product);
    console.log(carrito);

    // Enviar los productos al servidor usando axios
    axios.post('/cart', carrito)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  });
});
