const API = {
    async sendMessage(message, conversationId = null) {
        try {
            const response = await fetch("/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: message,
                    conversation_id: conversationId
                })
            });

            if (!response.ok) {
                const text = await response.text();
                let errorMessage = response.statusText;

                try {
                    const json = JSON.parse(text);
                    errorMessage = json?.details || json?.error || errorMessage;
                } catch (e) {
                    if (text) errorMessage = text;
                }

                throw new Error(errorMessage);
            }

            return await response.json();
        } catch (error) {
            console.error(error);
            alert("Unable to connect to server.");
        }
    },

    async getConversations() {
        const response = await fetch("/conversations");
        return await response.json();
    },

    async getConversation(id) {
        const response = await fetch(`/conversation/${id}`);
        return await response.json();
    },

    async deleteConversation(id) {
        await fetch(`/conversation/${id}`, {
            method: "DELETE"
        });
    },

    async deleteAllConversations() {
        await fetch("/conversations", {
            method: "DELETE"
        });
    }
};
