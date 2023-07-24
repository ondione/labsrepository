
import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders , HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs/';
import 'rxjs/';
import { map, catchError } from 'rxjs/operators';
import { Facture } from '../models/facture';

@Injectable()
export class FactureService {
    private _serUrl = '';
    facture: Facture ;
    opt:any;

    constructor(private _http: HttpClient){ }

    private extractData(res:any){
        let body = res;
        return body || [];
    }
   
    getListFacture(): Observable<Facture[]> {
        this._serUrl = 'http://localhost/Projectangular2/api/v1/getAllFactures';
       
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'http://localhost:4200/',
            'Access-Control-Allow-Methods':'GET'
        });

        this.opt = { 
            headers: header,
            params:  {},
            responseType: 'json',
            observer : 'response'
        };

        return this._http.get(this._serUrl, this.opt)
        .pipe( 
            map( data => this.extractData(data)),
            catchError( error => of(error))
        );
    }

    getFactureById(id: number): Observable<ArrayBuffer>{

        this._serUrl = 'http://localhost/Projectangular2/api/v1/getFactureById';
       
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'http://localhost:4200/',
            'Access-Control-Allow-Methods':'GET'
        }); 
        let params = { num_facture: id };
       
        this.opt = { 
            headers: header
        };

        return this._http.post(this._serUrl,params, this.opt)
        .pipe( 
            map( data => this.extractData(data)) ,
            catchError( error => of(error)) 
        ); 
    }


    addFacture(Facture: Facture)  {
        this._serUrl = 'http://localhost/Projectangular2/api/v1/addFacture';
       
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'http://localhost:4200/',
            'Access-Control-Allow-Methods':'POST'
        }); 
        let params = Facture;
      
        this.opt = { 
            headers: header
        };

        return this._http.post(this._serUrl, params, this.opt)
        .pipe(
            map( data => this.extractData(data)  ),
            catchError( error => of(error))
        );
    }
}