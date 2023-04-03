
const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input1');

const expresiones = {
	producto1: /^[a-zA-Z0-9\_\-]{4,20}$/, // Letras, numeros, guion y guion_bajo
	category: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	price:/^\d{7,14}$/, // numeros
    discount:/^\d{7,14}$/,// numeros
    bestSellers: true,
    stock:/^\d{7,14}$/,// numeros
    reviews:/^\d{7,14}$/,// numeros
    deliveryDate: /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/, // fechas 
    description:/^[a-zA-Z0-9\_\-]{5,200}$/,
    sliderImage:"",

}

const campos = {
    producto1:false,
	price:false,
    discount:false,
    bestSellers: false,
    stock:false,
    reviews:false,
    deliveryDate:false, 
    description:false,
    sliderImage:false,
}

const validarFormulario = (e) => {
	switch (e.target.producto1) {
		case "producto1":
			validarCampo(expresiones.name, e.target, 'producto1');
		break;
		case "price":
			validarCampo(expresiones.price, e.target, 'price');
		break;
		case "discount":
			validarCampo(expresiones.discount, e.target, 'discount');
		break;
		case "bestSellers":
			validarCampo(expresiones.bestSellers, e.target, 'bestSellers');
		break;
		case "stock":
			validarCampo(expresiones.stock, e.target, 'stock');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo1__${campo}`).classList.remove('form__grupo1-incorrecto');
		document.getElementById(`grupo1__${campo}`).classList.add('form__grupo1-correcto');
		document.querySelector(`#grupo1__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo1__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo1__${campo} .form__input1-error1`).classList.remove('form__input1-error1-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo1__${campo}`).classList.add('form__grupo1-incorrecto');
		document.getElementById(`grupo1__${campo}`).classList.remove('form__grupo1-correcto');
		document.querySelector(`#grupo1__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo1__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo1__${campo} .form__input1-error1`).classList.add('form__input1-error1-activo');
		campos[campo] = false;
	}
}


inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});
/*
form.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.usuario && campos.producto1 && campos.price && campos.discount && campos.bestSellers && terminos.stock ){
		form.reset();

		document.getElementById('form__mensaje-exito').classList.add('form__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('form__mensaje-exito').classList.remove('form__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.form__grupo1-correcto').forEach((icono) => {
			icono.classList.remove('form__grupo1-correcto');
		});
	} else {
		document.getElementById('form__mensaje').classList.add('form__mensaje-activo');
	}
})
*/