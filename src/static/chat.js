import RefineDialog from './save_dialog.js';

const apiAddress = "http://10.0.0.8:8080"

class Chat {
    constructor() {
        this.refineDialog = new RefineDialog()

        document.getElementById('send-button').addEventListener('click', () => {
            this.didTapSaveButton()
        });
    }

    didTapSaveButton() {
        const messageInput = document.getElementById('message-text');
        const messageText = messageInput.value.trim();
    
        if (messageText !== '') {
            this.sendMessage(messageText);
            messageInput.value = '';
        }
    }

    sendMessage(message) {
        this.addMessage(message, true);
        const messageData = { 
            type: "user_input",
            message: message 
        };
        fetch(apiAddress + '/chat', {
            method: 'POST',
            body: JSON.stringify(messageData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            this.processResponse(data)
        })
        .catch(error => {
            console.error('Ошибка при отправке сообщения:', error);
        });
     }

     processResponse(response) {
        switch (response.type) {
            case "answer":
                this.addMessage(response.message, false);
                break;
            case "refine":
                this.processRefineRequest(response.data);
            default:
                break;
        }
     }

     processRefineRequest(refineRequest) {
        const data = refineRequest.data;
        this.refineDialog.show(data.prompt, data.content, refineRequest.agent, data => {
            this.processResponse(data)
        });      
     }

     addMessage(message, isUserMessage) {
        const chatMessages = document.querySelector('.chat-window');
        const messageDiv = document.createElement('div');
        const prefix = isUserMessage ? "<br>User:<br><br>" : "<br>System:<br><br>" 
        messageDiv.innerHTML = prefix + message;
        chatMessages.appendChild(messageDiv);
     
        // Прокрутите окно сообщений вниз, чтобы видеть новые сообщения
        chatMessages.scrollTop = chatMessages.scrollHeight;
     }
}

const chat = new Chat();
