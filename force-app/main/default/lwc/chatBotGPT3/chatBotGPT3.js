   import { LightningElement, track } from 'lwc';
   import generateResponse from '@salesforce/apex/ChatGPTService.generateResponse';

    export default class ChatBotGPT3 extends LightningElement {
        @track messages = [];
        @track inputText = '';

        handleInput(event) {
            this.inputText = event.target.value;
        }

        handleKeyDown(event) {
            if (event.keyCode === 13 && !event.shiftKey) {
                event.preventDefault();
                this.handleSend();
            }
        }

        async handleSend() {
            const message = {
                id: this.messages.length,
                content: this.inputText,
                isSelf: true // or false, depending on whether the message is from the current user
            };
            this.messages.push(message);
            const gpt4Response=await generateResponse({ messageText: this.inputText });
            console.log('Aa gelo bhai: '+gpt4Response);
            const response ={
                id: this.messages.length,
                content: gpt4Response,
                isSelf: false
            };
            console.log('ResponswaContentwa: '+response.content);
            this.messages.push(response);
            this.inputText = '';
        }

        // async generateChatGPTResponse(prompt) {
        // try {
        //     const response = await generateResponse({ messageText: prompt });
        //     console.log('responne pehla bar: '+response);          
        //     return response;
        // } catch (error) {
        //     console.error('Error: Unable to generate response from ChatGPT.', error);
        //     return 'Error: Unable to generate response from ChatGPT.';
        // }
    }
