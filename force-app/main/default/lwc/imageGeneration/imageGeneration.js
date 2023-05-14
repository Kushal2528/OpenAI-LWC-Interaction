import { LightningElement,track,api } from 'lwc';
import getImages from '@salesforce/apex/ChatGPTRestCall.getImages';

export default class ImageGeneration extends LightningElement 
{
    @track keyword;
    @track imgData;
    getKeywords(event)
    {
        this.keyword=event.target.value;
        console.log('keyword: '+this.keyword);
    }
    apiCall()
    {
        console.log('Inside apicall with key value: '+this.keyword);
        getImages({generateKey:this.keyword}).then(result=>{
                this.imgData=result[0];
                console.log('result= '+result+'\nimgData: '+this.imgData);
        }).catch(error=>{
            console.log('Apex error: '+JSON.stringify(error));
            this.imgData='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png';
        });
    }

    handleLoad() {
    getImages({generateKey:this.keyword})
        .then(result => {
            this.contacts = result;
        })
        .catch(error => {
            this.error = error;
        });
}
}