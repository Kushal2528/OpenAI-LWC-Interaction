   import { LightningElement, track } from 'lwc';
   import generateResponse from '@salesforce/apex/ChatGPTRestCall.generateResponse';

    export default class ChatBotGPT3 extends LightningElement {
        @track messages = [];
        @track inputText = '';
        @track withPrevmessages=[];

        handleInput(event) {
            this.inputText = event.target.value;
        }

        handleKeyDown(event) {
            if (event.keyCode === 13 && !event.shiftKey) {
                event.preventDefault();
                this.handleSend();
            }
        }

        async handleSend() 
        {
            this.refs.inputWindow.value='';
            const message = {
                id: this.messages.length,
                content: this.inputText,
                isSelf: true // or false, depending on whether the message is from the current user
            };
            this.messages.push(message);

        /******************************************************* */
            let userPrompt={role:"user", content: this.inputText};
            this.withPrevmessages.push(userPrompt);
            const gpt4Response=await generateResponse({ lstPrompts: this.withPrevmessages });
            let gptPrompt={role:"assistant", content: gpt4Response};
            this.withPrevmessages.push(gptPrompt);
        /******************************************************* */            
            const response ={
                id: this.messages.length,
                content: gpt4Response,
                isSelf: false
            };
            this.messages.push(response);
            this.inputText = '';
        }
    }
