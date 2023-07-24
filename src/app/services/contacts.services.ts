
import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders , HttpResponse } from '@angular/common/http';
import { Observable, of , forkJoin} from 'rxjs/';
import { map, catchError } from 'rxjs/operators';
import { Contact } from '../models/contact';
import { mergeMap } from 'rxjs/operators';
import { AppSettingService } from './appService';

@Injectable()
export class ContactService {
    private _serUrl = '';
    contact: Contact[] = [];
    opt:any;

    constructor(private _http: HttpClient, 
        private _setting: AppSettingService 
    ){ }

    private requestSettings(method){
        let baseUrl = this._setting.formatPhpApiUrl('')
        
        console.log(baseUrl , " baseUrl ");
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'http://localhost:4200/',
            'Access-Control-Allow-Methods':`${method}`
        }); 
        let params = { };
        let options = { 
            headers: header
        };
        return { options , baseUrl , params}
    }

    private extractData(res:any){
        let body = res;

        return body || [];
    }
   
    getListContacts() : Observable<Contact[]>{
        var settings = this.requestSettings("GET")
        this._serUrl = `${settings.baseUrl+'getAllContact'}`;
        settings.options["params"] = {};
        settings.options["responseType"]= 'json';
        settings.options["observer"] = 'response';
        return this._http.get(this._serUrl, settings.options)
        .pipe( 
            map( data => this.extractData(data)),
            catchError( error => of(error))
        );
    }
    getContactById(id: number): Observable<any>{
        this._serUrl = this._setting.formatPhpApiUrl('getContactById');
        var url1 = this._setting.formatPhpApiUrl('listecontacttogroup');
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'http://localhost:4200/',
            'Access-Control-Allow-Methods':'GET'
        }); 
        let header1 = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'http://localhost:4200/',
            'Access-Control-Allow-Methods':'POST'
        }); 
        let params = { idContact: id };
    
        this.opt = { 
            headers: header
        };
        let opt ={ headers: header1 };
        const contact =  this._http.post(this._serUrl, params, this.opt).pipe(res =>this.extractData(res) );
        const groupes = this._http.post(url1,{ contactId: id }, opt).pipe(res =>this.extractData(res));
        return forkJoin([contact, groupes])
        .pipe( 
            map( data => data),
            catchError( error => of(error))
        );
    }

    addContact(contact: Contact)  {
        var settings = this.requestSettings("POST");
        this._serUrl =  `${settings+'addcontact'}`;
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'http://localhost:4200/',
            'Access-Control-Allow-Methods':'POST'
        }); 
        let params = contact;
        this.opt = { headers: header };
        return this._http.post(this._serUrl, params, settings.options)
        .pipe(
            map( data => this.extractData(data)  ),
            catchError( error => of(error))
        );
    }

    updateContact(contact)  {  
        this._serUrl = this._setting.formatPhpApiUrl('updatecontact');
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'PUT'
        }); 
        let params = contact;
        this.opt = { 
            headers:header
        };
        return this._http.put(this._serUrl, params, this.opt)
        .pipe( 
            map(data => this.extractData(data)  ) ,
            catchError( error => of(error))
        );
    }

    deleteContact(contact:Contact){
        this._serUrl = this._setting.formatPhpApiUrl('deleteContact'); 
        let params = { contactId: +contact.id };
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'http://localhost:4200/',
            'Access-Control-Allow-Methods':"DELETE"
        });
        this.opt = { 
            headers:header,
            params: params,
            responseType: 'json',
            observer : 'response'
        };
        return this._http.delete(this._serUrl, this.opt)
        .pipe( 
            map( data => this.extractData(data)),
            catchError( error => of(error))
        ); 
    }

    deleteContacts(ids:string[]){
        this._serUrl = this._setting.formatPhpApiUrl('deleteContact');
        let params = {contactIds:JSON.stringify(ids)};
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'http://localhost:4200/',
            'Access-Control-Allow-Methods':"DELETE"
        });
        this.opt = { 
            headers:header,
            params: params,
            responseType: 'json',
            observer : 'response'
        };
        return this._http.delete(this._serUrl, this.opt)
        .pipe( 
            map( data => this.extractData(data) ),
            catchError( error => of(error))
        ); 
    }

    contactToGroup(obj){
        this._serUrl = this._setting.formatPhpApiUrl('contactToGroup');
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'http://localhost:4200/',
            'Access-Control-Allow-Methods':'POST'
        }); 
        let params = obj;
        this.opt = { 
            headers: header
        };
        return this._http.post(this._serUrl, params, this.opt)
        .pipe(
            map( data => this.extractData(data)),
            catchError( error => of(error))
        );
    }

    listecontacttogroup(contactId){
        this._serUrl = this._setting.formatPhpApiUrl('listecontacttogroup');
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'http://localhost:4200/',
            'Access-Control-Allow-Methods':'POST'
        }); 
        
        let params = { contactId: contactId };
        this.opt = {  headers: header };

        return this._http.post(this._serUrl, params, this.opt)
        .pipe(
            map( data => this.extractData(data)  ),
            catchError( error => of(error))
        );
    }

    uploadFileToUrl(file, contactId){
        var fd = new FormData();
        fd.append('file', file);
        this._serUrl =  this._setting.formatPhpApiUrl('uploadfiles');
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'http://localhost:4200/',
            'Customize-Contact-Id': `${contactId}`
        }); 
        this.opt = {   headers: header };
        return this._http.post(this._serUrl, fd )
        .pipe( 
            map(data => this.extractData(data) ),
            catchError( error => of(error))
        );
    }

    imprimeContactList(){
        var settings = this.requestSettings("GET");
        this._serUrl = `${settings.baseUrl+'imprimecontacts'}`;
        return this._http.get(this._serUrl, settings.options)
        .pipe( 
            map( data => this.extractData(data)),
            catchError( error => of(error))
        );
    }
    
    exportCsvfile(){
        var settings = this.requestSettings("GET");
        this._serUrl = `${settings.baseUrl+'generatecsvfile'}`;
        return this._http.get(this._serUrl, settings.options)
        .pipe( 
            map( data => this.extractData(data)),
            catchError( error => of(error))
        );
    }

    contactsofgroup(GroupId: number){
        var settings = this.requestSettings("POST");
        this._serUrl = `${settings.baseUrl+'contactsofgroup'}`;
        let params = { GroupId };
        
        return this._http.post(this._serUrl, params, settings.options)
        .pipe(
            map( data => this.extractData(data)),
            catchError( error => of(error))
        );
    }
}