function addMessage(role, content) {
    const chatBox = document.getElementById("chatBox");
    const message = document.createElement("div");
    message.className = `message ${role}`;

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = role === "user" ? "U" : "A";

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = content;

    message.appendChild(avatar);
    message.appendChild(bubble);
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping() {
    const typing = document.getElementById("typing");
    typing.style.display = "block";
}

function hideTyping() {
    const typing = document.getElementById("typing");
    typing.style.display = "none";
}

function clearChat() {
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML = "";
    hideTyping();
}

function loadConversation(messages) {
    clearChat();

    messages.forEach((message) => {
        addMessage(message.role, message.content);
    });
}