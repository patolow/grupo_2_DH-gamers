const formulario = document.getElementById("cp_formulario");
const inputs = document.querySelectorAll("#cp_formulario input");


const expresiones = {
	nombre:  /^[a-zA-Z0-9\_\-]{4,130}$/,
    precio: /^\d{1,14}$/, // 7 a 14 numeros., 
    stock: /^\d{1,14}$/, // 7 a 14 numeros.
    descripcion: /^[a-zA-ZÀ-ÿ0-9\s]{20,500}$/, 
    sliderImage:"",
    bestSellers: true,
	
}

const campos = {
	nombre: false,
    precio: false,
    bestSellers: false,
	stock: false,
    descripcion: false
}

const validarCpFormulario = (e) => {
	switch (e.target.name) {
		case "name":
			validarCpCampo(expresiones.nombre, e.target, "nombre");
		break;
		case "price":
			validarCpCampo(expresiones.precio, e.target, "precio");
		break;
    	case "stock":
			validarCpCampo(expresiones.stock, e.target, "stock");
		break;
		case "description":
			validarCpCampo(expresiones.descripcion, e.target, "descripcion");
		break;
		
	}
}
const validarCpCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`cp_grupo__${campo}`).classList.remove("cp_formulario__grupo-incorrecto");
		document.getElementById(`cp_grupo__${campo}`).classList.add("cp_formulario__grupo-correcto");
		document.querySelector(`#cp_grupo__${campo} i`).classList.add("fa-check-circle");
		document.querySelector(`#cp_grupo__${campo} i`).classList.remove("fa-times-circle");
		document.querySelector(`#cp_grupo__${campo} .cp_formulario__input-error`).classList.remove("cp_formulario__input-error-activo");
		campos[campo] = true;
	} else {
		document.getElementById(`cp_grupo__${campo}`).classList.add('cp_formulario__grupo-incorrecto');
		document.getElementById(`cp_grupo__${campo}`).classList.remove('cp_formulario__grupo-correcto');
		document.querySelector(`#cp_grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#cp_grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#cp_grupo__${campo} .cp_formulario__input-error`).classList.add('cp_formulario__input-error-activo');
		campos[campo] = false;
	}
}


/////////////////Validación de la imagen del Producto////////////////

function fileImageValidation(){
    var fileInput = document.getElementById('file');
    var filePath = fileInput.value;
    var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    if(!allowedExtensions.exec(filePath)){
        document.querySelector(`.product-photo .cp_formulario__input-error`).classList.add('cp_formulario__input-error-activo');;
        fileInput.value = '';
        return false;
    }else{
        document.querySelector(`.product-photo .cp_formulario__input-error`).classList.remove('cp_formulario__input-error-activo');;
    }
}


///////////////////////////////////////////////////////////////////

inputs.forEach((input) => {
	input.addEventListener("keyup", validarCpFormulario);
	input.addEventListener("blur", validarCpFormulario);
        });


          formulario.addEventListener('submit', (e) => {
            const termino = document.getElementById('terminos');
            if(campos.nombre && campos.precio /*&& campos.stock && campos.descripcion*/){
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Registro exitoso!',
                    showConfirmButton: false,
                    timer: 1500
                  })
        
                document.getElementById('cp_formulario__mensaje-exito').classList.add('cp_formulario__mensaje-exito-activo');
                setTimeout(() => {
                    document.getElementById('cp_formulario__mensaje-exito').classList.remove('cp_formulario__mensaje-exito-activo');
                }, 5000);
        
                document.querySelectorAll('.cp_formulario__grupo-correcto').forEach((icono) => {
                    icono.classList.remove('cp_formulario__grupo-correcto');
                });
            } else {
                e.preventDefault();
                document.getElementById('cp_formulario__mensaje').classList.add('cp_formulario__mensaje-activo');
            }
        });