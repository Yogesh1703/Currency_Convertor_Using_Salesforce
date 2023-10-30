import { LightningElement, track } from 'lwc';
 
import {countryCodeList} from 'c/countryList';
 
import cImg from '@salesforce/resourceUrl/ConveterIMG';
 
export default class CurrencyConveterApp extends LightningElement {
 
    img=cImg;
 
    openModel=false;
 
    list=countryCodeList;
 
    @track amt=0;
    result;
    error;
   
 
     @track countryFrom="INR";
     @track countryTo="USD";
 
     val(event){
        this.amt=event.target.value;
     }
 
    handleChange(event){
        const {name,value}= event.target;
 
        console.log('Name'+name);
        console.log('value'+value);
 
        if(name=='CountryFrom'){
            this.countryFrom=value;
        }else if(name=='CurrencyTo'){
            this.countryTo=value;
        }
    }
 
   
 
    back(){
        this.openModel=false;
    }
 
    onClickHandler(event){
        event.preventDefault();
        this.convet();
    }
 
    async convet(){
        const link=`https://api.exchangerate.host/convert?from=${this.countryFrom}&to=${this.countryTo}`
        try{
            const data=await fetch(link);
            const jsondata=await data.json();
            console.log(jsondata);
 
            this.result=Number((this.amt)*jsondata.result).toFixed(2);
            console.log('Result'+this.result);
            this.openModel=true;
        }
        catch(error){
            console.log('facing error to fetch..');
        }
    }
 
 
}
