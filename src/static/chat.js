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
        const messageData = { message: message };
        fetch(apiAddress + '/chat', {
            method: 'POST',
            body: JSON.stringify(messageData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
             if (data.type === 'answer') {
                 addMessageToChat(data.message, false); // Обрабатываем как обычный ответ
             } else if (data.type === 'query' && data.query.type === 'save') {
                 this.refineDialog.show(data.query.data.prompt, data.query.data.content);
             }
        })
        .catch(error => {
            console.error('Ошибка при отправке сообщения:', error);
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
