const chatBot = document.querySelector(".chatbot");
const chatBotWindow = document.querySelector(".chatbot-window");
chatBot.addEventListener("click", toggleChatBotWindow)

function toggleChatBotWindow() {
chatBotWindow.classList.toggle("inactive");
}