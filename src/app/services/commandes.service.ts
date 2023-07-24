
import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders , HttpResponse  } from '@angular/common/http';
import { Observable, of ,forkJoin} from 'rxjs/';

import { map, catchError, tap } from 'rxjs/operators';

import { Commande } from '../models/commandes';
import { AppSettingService } from './appService';



@Injectable({
  providedIn: 'root'
})
export class CommandeService {
    private _serUrl = '';
    commandes: Commande[] = [];
    opt;

    constructor( private _http: HttpClient, private _setting: AppSettingService ){}

    private extractData(res:any){
      let body = res;
      return body || [];
    }
   
    getListCommandes(): Observable<Commande[]>{

        this._serUrl = this._setting.formatUrl(''); 
        let params = {
            "jsonrpc":"2.0",
            "method":"commandes.getAllCommandes",
            "parameter":{}
        };
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        });

        this.opt = { 
            headers: header,
            params:  params,
            responseType: 'json',
            observer : 'response'
        };

        return this._http.get(this._serUrl, this.opt)
        .pipe( 
            map( data => this.extractData(data)),
            catchError( error => of(error))
        );
    }

    getCommandeById(id: number): Observable<Commande>{

        this._serUrl = this._setting.formatUrl(''); 
        let params = {
            "jsonrpc":"2.0",
            "method":"commandes.getCommandeById",
            "parameter":{
                id: id
            }
        };
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        });

        this.opt = { 
            headers: header
        };

        return this._http.post(this._serUrl,params, this.opt)
        .pipe( 
            map( data => this.extractData(data)),
            catchError( error => of(error))
        );
    }

    addContact(commande: Commande)  {

        this._serUrl = this._setting.formatUrl(''); 
        let params = {
            "jsonrpc":"2.0",
            "method":"commande.addCommande",
            "parameter":{
                commande :commande
            }
        };
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        });

        let opt = { 
            headers:header
        };
        return this._http.post(this._serUrl, params, opt)
        .pipe( 
            map( data => this.extractData(data)),
            catchError( error => of(error))
        );
    }

    updateCommande(contact)  {  
    
        this._serUrl = this._setting.formatUrl(''); 
        let params = {
            "jsonrpc":"2.0",
            "method":"commandes.updateCommande",
            "parameter":{
               contact :contact
            }
        };
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        });

        let opt = { 
            headers:header
        };
        return this._http.put(this._serUrl,params, opt);
    }

    deleteCommande(commande:Commande){
        this._serUrl = this._setting.formatUrl(''); 
        let params = {
            "jsonrpc":"2.0",
            "method":"commandes.deleteCommande",
            "parameter":{
                commandeId: commande.id_cmd
            }
        };
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        });
        let opt = { 
            headers:header
        };
        return this._http.post(this._serUrl,params, opt);
    }
    private handleError(error: Response){
        return Observable.throw(error.json());
    }
}


