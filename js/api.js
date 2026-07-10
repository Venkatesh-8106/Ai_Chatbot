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

                throw new Error("Failed to connect.");

            }

            return await response.json();

        }

        catch (error) {

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

    }

};