let currentConversationId = null;

const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const newChatBtn = document.getElementById("newChatBtn");
const conversationList = document.getElementById("conversationList");
const searchInput = document.getElementById("searchChat");
const exportBtn = document.getElementById("exportBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");

function downloadTextFile(content, fileName) {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

function exportMessages(messages, title = "chat-export") {
    if (!messages.length) {
        alert("No messages to export.");
        return;
    }

    const exportText = messages
        .map((message) => {
            const role = message.role === "user" ? "You" : "AI";
            const content = typeof message.content === "string" ? message.content : "";
            return `${role}: ${content}`;
        })
        .join("\n\n");

    downloadTextFile(exportText, `${title}.txt`);
}

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

        const assistantReply = data?.response || data?.message || "I’m here to help.";
        currentConversationId = data?.conversation_id;
        addMessage("assistant", assistantReply);
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
            title.className = "chat-item-title";
            title.textContent = chat.title || "New Chat";

            const actions = document.createElement("div");
            actions.className = "chat-item-actions";

            const exportConversationBtn = document.createElement("button");
            exportConversationBtn.className = "export-btn";
            exportConversationBtn.textContent = "⤓";
            exportConversationBtn.title = "Export conversation";

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-btn";
            deleteBtn.textContent = "🗑";
            deleteBtn.title = "Delete conversation";

            actions.appendChild(exportConversationBtn);
            actions.appendChild(deleteBtn);

            div.appendChild(title);
            div.appendChild(actions);

            div.onclick = async () => {
                currentConversationId = chat._id;
                const messages = await API.getConversation(chat._id);
                loadConversation(messages);
            };

            exportConversationBtn.onclick = async (e) => {
                e.stopPropagation();

                try {
                    const conversationMessages = await API.getConversation(chat._id);
                    exportMessages(conversationMessages, chat.title || "conversation");
                } catch (err) {
                    console.error(err);
                }
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

exportBtn.onclick = async () => {
    try {
        const chats = await API.getConversations();

        if (!chats.length) {
            alert("No chats to export yet.");
            return;
        }

        const exportSections = [];

        for (const chat of chats) {
            const messages = await API.getConversation(chat._id);

            if (!messages.length) {
                continue;
            }

            const title = (chat.title || "Conversation").replace(/\s+/g, " ").trim();
            const conversationText = messages
                .map((message) => {
                    const role = message.role === "user" ? "You" : "AI";
                    const content = typeof message.content === "string" ? message.content : "";
                    return `${role}: ${content}`;
                })
                .join("\n\n");

            exportSections.push(`=== ${title} ===\n\n${conversationText}`);
        }

        if (!exportSections.length) {
            alert("No chats to export yet.");
            return;
        }

        downloadTextFile(exportSections.join("\n\n"), "all-chats-export.txt");
    } catch (err) {
        console.error(err);
        alert("Unable to export all chats.");
    }
};

deleteAllBtn.onclick = async () => {
    if (!confirm("Delete all conversations?")) return;

    try {
        await API.deleteAllConversations();
        currentConversationId = null;
        clearChat();
        loadConversations();
    } catch (err) {
        console.error(err);
    }
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
addMessage("assistant", "Hello! How can I help you today?");
