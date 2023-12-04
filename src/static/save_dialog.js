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
        const content = messageInput.value.trim();

        this.saveExample(content);
    }

    show(prompt, content, agent, callback) {
        this.prompt = prompt
        this.agent = agent
        this.callback = callback
        
        document.getElementById('expected-content').value = content;
        document.getElementById('actual-code').textContent = prompt;
        
        document.getElementById('dialog').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    }

    hide() {
        document.getElementById('dialog').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }


    saveExample(content) {
        const apiAddress = "http://10.0.0.8:8080"

        const json = {
            "type": "refine",
            "agent_name": this.agent,
            "prompt": this.prompt,
            "content": content
        }

        fetch(apiAddress + '/chat', {
            method: 'POST',
            body: JSON.stringify(json),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            this.hide()
            this.callback(data)
        })
        .catch(error => {
            console.error('Ошибка при отправке сообщения:', error);
        });
    }  
}

export default RefineDialog;