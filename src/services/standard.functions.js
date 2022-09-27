import {baseUrl, axiosInstance} from './API';
import React, {useState, useEffect} from 'react';
import $ from 'jquery';


class stdFunctions {
    //getting active blinker

   // converting numbers to currency
   kenyaCurrency=(num)=>{
        let formatCurrency = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "KES",
      })
      return formatCurrency.format(num)
    }

    //checking if a transaction is a deposit 
    isDepositTransaction=(transactionType)=>{
        if (transactionType==="Deposit"){
            return true
        }
        else{
            return false
        }
    }

    //is money transfer
    isMoneyTransfer=(str)=>{
        if(str==="Money_transfer"){
            return true
        }
        else{
            return false
        }
    }

    //checking if phone number is valid
    isValidPhoneNum=(str)=>{
        if(str.length>1){
            return true
        }
        else{
            return true
        }

    }

    isValidPhoneNum2=(str)=>{
        

        var safaricomPhone=/^(?:254|\+254|0)?(7(?:(?:[129][0–9])|(?:0[0–8])|(4[0–1]))[0–9]{6})$/
        var airtelPhone=/^(?:254|\+254|0)?(7(?:(?:[3][0-9])|(?:5[0-6])|(8[0-9]))[0-9]{6})$/
        var equitelPhone=/^(?:254|\+254|0)?(76[34][0-9]{6})$/
        var orangePhone=/^(?:254|\+254|0)?(77[0-6][0-9]{6})$/
        if(safaricomPhone.test(str)){
            return true
            console.log("this is a safaricom number")
            alert("safaricom")
        }
        else{
            return false
            console.log("this is not a safaricom number")
            alert("not safaricom")
        }
        return true
       

    }

    //checking if a number is greater than one
    isgreaterThanOne=(str)=>{
        str=parseFloat(str)
        if(str>1){
            return true
        }
        else{
            return false
        }
    }

    //includes function
    strIncludes(str1,str2){
        if(str1.includes(str2)){
            return true
        }
        else{
            return false
        }
    }

    //includes function
    equalTo(str1,str2){
        if(str1===str2){
            return true
        }
        else{
            return false
        }
    }

    //includes function
    includes(str1,str2){
       
        if(str1.includes(str2))
        {
            //alert("i do have")
            return true
        }
        else{
            //alert("I dont")
            return false
        }
    }

    //checking wich value is greater
    amountIsGreaterThan=(str1,str2)=>{
        str1=parseFloat(str1)
        str2=parseFloat(str2)
        if(str2>str1){
            return true
        }
        else{
            return false
        }
    }
    //checking if a number is greater than 0
    isGreaterThanZero=(str)=>{
        str=parseFloat(str)
        if(str>0){
            return true
        }
        else{
            return false
        }
    }
    //checking if account is active
    isActiveAccount=(str)=>{
       if(str==="Active"){
        return true
       } 
       else{
        return false
       }
    }


    //checking if account is pocket money
    isPocketMoney=(str)=>{
        if(str==="POCKECT_MONEY"){
         return true
        } 
        else{
         return false
        }
     }

     
    //checking if an account id a welfare account
    isWelfareAccount=(str)=>{
        if(str==="WELFARE_ACCOUNT"){
         return true
        } 
        else{
         return false
        }
     }


    //removing and underscore
    removeUnderscore=(str)=>{
        let cleaned = ('_' + str).replace(/\D/g, ' ');

        str=str.replace('_',' ')
        return str;
    }

    //disabling a button
    dissableBtn=()=>{
        $(this).prop('disabled', false);
    }

    //remove specified character
    removeSpecificCharacter=(str,character)=>{
        let cleaned = (character + str).replace(/\D/g, ' ');

        //str=str.replace(",",' ')
        return str;
    }

    //adding 254 to mobile numbers
    add254(str){
        let firstWord = str.charAt(0)

        if(firstWord==="0"){
           
            const lastDigits = str.substring(str.indexOf(0) + 1);
            return "254"+lastDigits
        }
        else{
            return str
        }
    }

    
    
      

    isDeviceAnAndroiid(){
        var res = "Device is not Android Phone";
        var Android = /(android)/i.test(navigator.userAgent);
        
        if(Android) {
            return true
        }
        else{
            return false
        }
    }

    //checking if device is an ipad
    isIpad(){
        var Ipad = /(ipad)/i.test(navigator.userAgent);
      if (Ipad)
      {
        return true
      }
      else{
        return false
      }
    }

    //checking if the browser iis a mobile
    isMobilePhone(){
        (function(a){($.browser=$.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);        
        if($.browser.mobile)
        {
            return true
        }
        else
        {
            return false
        }
    }
    

    //comparing two separate strings
    areTheyThesame(str1,str2){

        if(str1===str2){
            //alert("they are the same")
            return true
        }
        else{
            //alert("Not the same")
            return false
        }
    }

    //formating characters to a specific style
    chunkSubstr=(str, size)=> {
        
        const numChunks = Math.ceil(str.length / size)
        const chunks = new Array(numChunks)
      
        for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
          chunks[i] = str.substr(o, size)
        }

        return chunks
      }

    //phone number formating function starts here
    phoneOutput=(str)=> {
        //Filter only numbers from the input
        let cleaned = ('' + str).replace(/\D/g, '');
        cleaned=('+' + cleaned).replace(/\D/g, '');

        //Check if the input is of correct length
        let match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{3})$/);

        if (match) {
           return '+' + match[1] + ' ' + match[2] + ' ' + match[3]+ '' + match[4]
          };
        
         return str
    }

    //credit card out put
    creditCrad1=(cc)=> {
        // If less than 6 characters return full number
        if (cc.length < 6)
        return cc;
        
        // Take out first character
        let firstChar = cc.charAt(0);
        cc = cc.slice(1);
        
        // Replace characters except last 4
        cc = cc.replace(/\d(?=.{4,}$)/g, '#');

        // Add first character back
        cc = firstChar + cc;

        return cc;
    }

    creditCard2=(str)=>{
        return str.replace(/[^\dA-Z]/g, '').replace(/(.{3})/g, '$1 ').trim();
    }

    //check if array is empty
    isArrayEmpty=(num)=>{
        if(num===0){
           return true
        }
        else{
            return false
        }
    }

    //function that removed the first character
    removeFirstCharacter=(str)=>{
        str=str.substr(1)
        return(str)
    }

    //checking if i have more than one blinkers
    isBlinkersMore=(num)=>{
        if(num===1){
           return false
        }
        else{
            return true
        }
    }

    //checking if a transaction is a goods purchase transaction
    isGoodsPurchase=(str)=>{
        if(str==="Merchant_Pay"){
            return true
        }
        if(str==="Money_transfer"){
            return true
        }
        if(str==="Deposit"){
            return false
        }
    }

    //checking if transaction is a merchant pay
    isMerchantPay=(str)=>{
        if(str==="Merchant_Pay"){
            return true
        }
        else{
            return false
        }
    }

     parentId=localStorage.getItem("parentId")
     parentEmail= localStorage.getItem("parentEmail")
     parentUserName= localStorage.getItem("parentUserName")
     parentFName=localStorage.getItem("parentUserFName")
     parentLName=localStorage.getItem("parentUserLName")
     parentWalletBal=localStorage.getItem("guardianWalletBal")
     ActiveBlinker=parseInt(localStorage.getItem("activeBlinker"))
     ActiveBlinkerIndex=parseInt(localStorage.getItem("activeBlinkerIndex"))
     parentPhoneNo=localStorage.getItem("parentPhone")
}

export default new stdFunctions();