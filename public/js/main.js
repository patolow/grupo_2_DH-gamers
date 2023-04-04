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
    
})