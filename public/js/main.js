const chatBot = document.querySelector(".chatbot");
const chatBotWindow = document.querySelector(".chatbot-window");
chatBot.addEventListener("click", toggleChatBotWindow)

function toggleChatBotWindow() {
chatBotWindow.classList.toggle("inactive");
}

const hamburguesaDesplegable = document.getElementById("hamburguesa-desplegable");
const menuHamburguesa = document.querySelector("#menu-hamburguesa");
const subMenuHamburguesa = document.getElementsByClassName("sub-menu-hamburguesa");

hamburguesaDesplegable.addEventListener("click", function(){
    menuHamburguesa.classList.toggle("inactive")
    menuUSer.classList.add("inactive")
})

const userDesplegable = document.getElementById("user-desplegable");
const menuUSer = document.querySelector("#menu-user");
const subMenuUser = document.getElementsByClassName("sub-menu-user");

userDesplegable.addEventListener("click", function(){
    menuUSer.classList.toggle("inactive")
    menuHamburguesa.classList.add("inactive")
})