function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function formatMessageContent(content) {
    const lines = String(content).split(/\n/);
    const htmlLines = [];

    for (const line of lines) {
        const trimmed = line.trim();

        if (!trimmed) {
            htmlLines.push("<div class='message-gap'></div>");
            continue;
        }

        if (/^[-*]\s+/.test(trimmed)) {
            htmlLines.push(`<div>${escapeHtml(trimmed.replace(/^[-*]\s+/, ""))}</div>`);
            continue;
        }

        let formatted = escapeHtml(trimmed)
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>");

        htmlLines.push(`<div>${formatted}</div>`);
    }

    return htmlLines.join("");
}

function addMessage(role, content) {
    const chatBox = document.getElementById("chatBox");
    const message = document.createElement("div");
    message.className = `message ${role}`;

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = role === "user" ? "U" : "A";

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.innerHTML = formatMessageContent(content);

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
