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

function showSaveDialog(filename, content) {
    // Здесь код для открытия вашего диалогового окна с полями filename и content
    // Пример:
    document.getElementById('filename').value = filename;
    document.getElementById('actual_content').value = content;
    document.getElementById('dialog').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

// Обработка события нажатия на кнопку "Отправить"
document.getElementById('send-button').addEventListener('click', function () {
   const messageInput = document.getElementById('message-text');
   const messageText = messageInput.value.trim();

   if (messageText !== '') {
       sendMessage(messageText);
       messageInput.value = ''; // Очистить поле ввода после отправки
   }
});

// Можно также добавить обработку нажатия клавиши Enter для отправки сообщения
document.getElementById('message-text').addEventListener('keyup', function (event) {
   if (event.key === 'Enter') {
       const messageInput = document.getElementById('message-text');
       const messageText = messageInput.value.trim();

       if (messageText !== '') {
           sendMessage(messageText);
           messageInput.value = ''; // Очистить поле ввода после отправки
       }
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
