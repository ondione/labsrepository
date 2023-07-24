import { Injectable, Inject }  from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';
import { Observable, Subject} from 'rxjs';
import { AppSettingService }  from './appService';
import { AuthentificationService } from './users.services';
import { Store, select } from '@ngrx/store';
import { State } from '../store_managment/reducers/index';

import { 
   isLoggedIn , 
   permissions ,
   hasPermission , 
   sessionUserData
}  from '../store_managment/selectors/session.selectors';

@Injectable()
export class sharedService {
   alertmessage = new Subject<string>();
   displayAlert = false;
   successMessage :string;
   alerttypeCss : string  ='';
   _serUrl;
   opt;
   isConnected = false;
   token;

   constructor(private http: HttpClient,
      private _setting: AppSettingService,
      private auth: AuthentificationService,
      private store: Store<State>
   ){}

   showAlert(params){
      this.alertmessage.next(params.message);
      this.alertmessage.subscribe( (message) => {
         this.successMessage = message;
         this.displayAlert = true;
         this.alerttypeCss = params.style;
      });   

      this.alertmessage.pipe( debounceTime(params.time) ).subscribe(() => {
         this.successMessage = null;
         this.displayAlert = false;
      });
   }

   getPerms(){
      let permissions = null;
      this.store.select(permissions).subscribe( resp =>{
         if(resp){
            permissions = resp;
         }
      });
      return permissions;
   }

   hasPerms(){
      let hasPerm = false;
      this.store.select(hasPermission).subscribe( resp =>{
         if(resp){
            hasPerm= resp;
         }
      });
      return hasPerm;
   }

   isUserConnected(){
      this.store.select(isLoggedIn).subscribe( resp =>{
         if(resp == true){
            this.isConnected = resp;
         }
      });
      return this.isConnected;
   }

   getPdfContentFile(filename:string) {
      this._serUrl = this._setting.formatUrl('');
      let params = {
         "jsonrpc":"2.0",
         "method":"contacts.pdfFile",
         "parameter":{file:filename}
      }
    
      let header = new HttpHeaders({ 
         'Content-Type':  'application/pdf' 
      });

      this.opt = { 
         headers: header,
         params:  params,
         responseType : 'blob',
         Accept : 'application/pdf',
         observe : 'response'
      };
      return this.http.get(this._serUrl, this.opt);
   }

   generatePDF(filename, blob){
      
      // commented can be used to generaate pdf already tested tested ok
      /* 
         const linkSource = 'data:application/pdf;base64,' +blob+'\n';
         const downloadLink = document.createElement("a");
         downloadLink.href = linkSource;
         downloadLink.download = filename;
         downloadLink.click();
      */
      blob = 'data:application/pdf;base64,' +blob+'\n';
         //let yourPDFDataBlob = new Blob([blob], { type: "application/pdf" });
      if (navigator.msSaveOrOpenBlob) {
        // IE specific download.
        navigator.msSaveBlob(blob, filename);
      } else {
        const downloadLink = document.createElement("a");
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.setAttribute("href", blob);
        downloadLink.setAttribute("download", filename);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
   }
   getUserToken(){
      this.store.select(sessionUserData).subscribe( resp =>{
         if(resp && resp.jwt){
            this.token = resp.jwt;
         }
      });
      return this.token;
   }
}