// Пример отправки сообщения через API
function sendMessage(message) {
   addMessageToChat(message, true);
   const messageData = { message: message };
   fetch('http://10.0.0.8:8080/chat', {
       method: 'POST',
       body: JSON.stringify(messageData),
       headers: {
           'Content-Type': 'application/json'
       }
   })
   .then(response => response.json())
   .then(data => {
	addMessageToChat(data.message, false);
   })
   .catch(error => {
       console.error('Ошибка при отправке сообщения:', error);
   });
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
