$(document).ready(() => {

  CartItemCount = () => {
    $.ajax({
      url: '/cart/itemCount',
      method: 'GET',
      success: (response) => {
        $('#cart-item-count').text(response.count)
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  CartItemCount()

  // actualizar el carrito en un intervalo
  setInterval(CartItemCount, 1000)

})
