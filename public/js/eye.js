let eye = document.getElementById("eye")
let input = document.getElementById("formulario__input")

eye.addEventListener("click", function() {

    if (input.type == "password" && input.value) {
        input.type  = "text"
        eye.style.opacity = 0.2
    } else {
        input.type  = "password"
        eye.style.opacity = 0.8
    }

})