class RefineDialog {
    constructor() {
        document.getElementById('save-button').addEventListener('click', () => {
            this.didTapSaveButton();
        });

        document.getElementById('cancel-save-dialog-button').addEventListener('click', () => {
            this.hide();
        });
    }

    didTapSaveButton() {
        const messageInput = document.getElementById('expected-content');
        const messageText = messageInput.value.trim();

        this.saveExample(messageText);
    }

    show(prompt, content) {
        document.getElementById('expected-content').value = content;
        document.getElementById('actual-code').textContent = prompt;
        
        document.getElementById('dialog').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    }

    hide() {
        document.getElementById('dialog').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }


    saveExample(prompt, content) {
        const json = {
            "prompt": prompt,
            "content": content
        }

        fetch(apiAddress + '/save', {
            method: 'POST',
            body: JSON.stringify(json),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
             this.hide()
        })
        .catch(error => {
            console.error('Ошибка при отправке сообщения:', error);
        });
    }  
}

export default RefineDialog;