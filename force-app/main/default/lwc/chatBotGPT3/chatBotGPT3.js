   import { LightningElement, track } from 'lwc';
   import generateResponse from '@salesforce/apex/ChatGPTRestCall.generateResponse';
   import generateResponsev1 from '@salesforce/apex/ChatGPTService.generateResponse';

    export default class ChatBotGPT3 extends LightningElement {
        @track messages = [];
        @track inputText = '';
        @track withPrevmessages=[];
        @track value='v1'
        @track gpt4Response;
        @track showSpinner=false;

        handleInput(event) {
            this.inputText = event.target.value;
        }

        handleKeyDown(event) 
        {
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
        if(this.value=='v2')
        {
        /******************************************************* */
            console.log('inside v2');
            let userPrompt={role:"user", content: this.inputText};
            this.withPrevmessages.push(userPrompt);
            this.gpt4Response=await generateResponse({ lstPrompts: this.withPrevmessages });
            console.log('this.gpt4repsoe: '+this.gpt4Response);
            let gptPrompt={role:"assistant", content: this.gpt4Response};
            this.withPrevmessages.push(gptPrompt);
        /******************************************************* */
        }
        else if(this.value=='v1')
        {
            this.gpt4Response=await generateResponsev1({ messageText: this.inputText });
        }            
            console.log('GPT String response: '+this.gpt4Response);
            const response ={
                id: this.messages.length,
                content: this.gpt4Response,
                isSelf: false
            };
            this.messages.push(response);
            this.inputText = '';
        }


        get options() {
            return [
            { label: 'Version 1', value: 'v1' },
            { label: 'Version 2', value: 'v2' }
            ];
        }

        handleChange(event) {
            this.value = event.detail.value;
            console.log('inside v2 select this.value= '+this.value);
            this.messages=[];
            this.withPrevmessages=[]
            this.showSpinner=true;
            setTimeout(() => {
                this.showSpinner=false; 
            }, 2000);
        }
    }
