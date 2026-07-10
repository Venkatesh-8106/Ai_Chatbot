let currentConversationId = null;

const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const newChatBtn = document.getElementById("newChatBtn");
const conversationList = document.getElementById("conversationList");
const searchInput = document.getElementById("searchChat");

async function sendMessage() {
    const message = input.value.trim();

    if (!message) return;

    addMessage("user", message);
    input.value = "";
    showTyping();

    try {
        const data = await API.sendMessage(message, currentConversationId);

        hideTyping();

        if (!data) {
            addMessage("assistant", "Sorry, I could not reach the server.");
            return;
        }

        currentConversationId = data.conversation_id;
        addMessage("assistant", data.response || "I’m here to help.");
        loadConversations();
    } catch (err) {
        hideTyping();
        addMessage("assistant", "Something went wrong. Please try again.");
        console.error(err);
    }
}

async function loadConversations() {
    try {
        const chats = await API.getConversations();
        conversationList.innerHTML = "";

        chats.forEach((chat) => {
            const div = document.createElement("div");
            div.className = "chat-item";

            const title = document.createElement("span");
            title.textContent = chat.title || "New Chat";

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-btn";
            deleteBtn.textContent = "✕";

            div.appendChild(title);
            div.appendChild(deleteBtn);

            div.onclick = async () => {
                currentConversationId = chat._id;
                const messages = await API.getConversation(chat._id);
                loadConversation(messages);
            };

            deleteBtn.onclick = async (e) => {
                e.stopPropagation();

                if (confirm("Delete this conversation?")) {
                    await API.deleteConversation(chat._id);

                    if (chat._id === currentConversationId) {
                        clearChat();
                        currentConversationId = null;
                    }

                    loadConversations();
                }
            };

            conversationList.appendChild(div);
        });
    } catch (err) {
        console.error(err);
    }
}

newChatBtn.onclick = () => {
    currentConversationId = null;
    clearChat();
    loadConversations();
};

sendBtn.onclick = sendMessage;

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

searchInput.addEventListener("keyup", () => {
    const value = searchInput.value.toLowerCase();

    document.querySelectorAll(".chat-item").forEach((item) => {
        const text = item.innerText.toLowerCase();
        item.style.display = text.includes(value) ? "flex" : "none";
    });
});

loadConversations();
addMessage("assistant", "Hello 👋 I can help with questions, writing, and planning.");