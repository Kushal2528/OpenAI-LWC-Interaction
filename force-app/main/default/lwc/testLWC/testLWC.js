import { LightningElement,track } from 'lwc';
import testPass from '@salesforce/apex/testPassValue.testPass';

export default class TestLWC extends LightningElement 
{
  @track messages=[]
    async handleTest()
    {
        let testWrapperDummy={role:"system", content: "1st message You are a helpful assistant"};
        let prompt2={role:"User", content: "2nd message test"};
        this.messages.push(testWrapperDummy);
        this.messages.push(prompt2);
        await testPass({msgList : this.messages}).then({

        }).catch({

        });
    }
}