import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-ts';
//import *  as fs from 'fs';


@Injectable()
export class CryptoUtilities {

    cryptMessage(message){
        let secretKey = "ZERDF"; //this.getScretKey();
        const encryptedMessage = CryptoJS.AES.encrypt(message, secretKey).toString();
        return encryptedMessage;
    }

    decryptMessage(encryptedMessage){

        let secretKey = "ZERDF"; //this.getScretKey();
        const bytes = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
        if (bytes.toString()) {
            let data = bytes.toString(CryptoJS.enc.Utf8);
            return data;
        }
    }

   /* getScretKey(){
        let config = fs.readFileSync("/assets/settings/appSetting.json", { encoding:'utf-8'});
        if(config){
            let cfg = JSON.parse(config);
            return cfg.secretKey;
        }else{
            return null;
        }
    }*/
}