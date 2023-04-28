let eye = document.getElementById("eye")
let input = document.getElementById("password")

eye.addEventListener("click", function() {

    if (input.type == "password" && input.value) {
        input.type  = "text"
        eye.style.opacity = 0.2
    } else {
        input.type  = "password"
        eye.style.opacity = 0.8
    }

})

let eye2 = document.getElementById("eye2")
let input2 = document.getElementById("password2")

eye2.addEventListener("click", function() {

    if (input2.type == "password" && input2.value) {
        input2.type  = "text"
        eye2.style.opacity = 0.2
    } else {
        input2.type  = "password"
        eye2.style.opacity = 0.8
    }

})