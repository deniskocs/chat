const apiAddress = "http://10.0.0.8:8080"

// Пример отправки сообщения через API
function sendMessage(message) {
   addMessageToChat(message, true);
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
            // Если тип запроса 'save', отображаем диалог
            showSaveDialog(data.query.data.file, data.query.data.content);
        }
   })
   .catch(error => {
       console.error('Ошибка при отправке сообщения:', error);
   });
}

function sendSaveMessage(message) {
   fetch(apiAddress + '/save', {
       method: 'POST',
       body: JSON.stringify(message),
       headers: {
           'Content-Type': 'application/json'
       }
   })
   .then(response => response.json())
   .then(data => {
        hideSaveDialog()
   })
   .catch(error => {
       console.error('Ошибка при отправке сообщения:', error);
   });
}


function hideSaveDialog() {
    document.getElementById('dialog').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}


function showSaveDialog(filename, content) {
    document.getElementById('actual-content').value = content;
    document.getElementById('dialog').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

document.getElementById('cancel-save-dialog-button').addEventListener('click', function () {
   hideSaveDialog();
});

document.getElementById('save-button').addEventListener('click', function () {
   const messageInput = document.getElementById('expected-content');
   const messageText = messageInput.value.trim();

   sendSaveMessage(messageText);
});


document.getElementById('send-button').addEventListener('click', function () {
   const messageInput = document.getElementById('message-text');
   const messageText = messageInput.value.trim();

   if (messageText !== '') {
       sendMessage(messageText);
       messageInput.value = '';
   }
});

function addMessageToChat(message, isSent) {
   const chatMessages = document.querySelector('.chat-window');
   const messageDiv = document.createElement('div');
   const prefix = isSent ? "<br>User:<br><br>" : "<br>System:<br><br>" 
   messageDiv.innerHTML = prefix + message;
   chatMessages.appendChild(messageDiv);

   // Прокрутите окно сообщений вниз, чтобы видеть новые сообщения
   chatMessages.scrollTop = chatMessages.scrollHeight;
}
