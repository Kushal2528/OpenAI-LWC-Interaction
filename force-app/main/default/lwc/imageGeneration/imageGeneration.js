import { LightningElement,track,api } from 'lwc';
import getImages from '@salesforce/apex/ChatGPTRestCall.getImages';
import noHeader from '@salesforce/resourceUrl/NoHeader';
import {loadStyle} from "lightning/platformResourceLoader";

export default class ImageGeneration extends LightningElement 
{
    @track keyword;
    @track imgData;
    @track showSpinner=false;

    connectedCallback() 
    {
        loadStyle(this, noHeader)
        .then(result => {});
    }

    getKeywords(event)
    {
        this.keyword=event.target.value;
        console.log('keyword: '+this.keyword);
    }
    apiCall()
    {
        this.showSpinner=true;
        console.log('Inside apicall with key value: '+this.keyword);
        getImages({generateKey:this.keyword}).then(result=>{
                this.imgData=result[0];
                console.log('result= '+result+'\nimgData: '+this.imgData);
        }).catch(error=>{
            console.log('Apex error: '+JSON.stringify(error));
            this.imgData='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png';
        });
    }
    handleImageLoad()
    {
        this.showSpinner=false;
        this.refs.textInput.value='';
    }

}