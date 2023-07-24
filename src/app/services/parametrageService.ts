
import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders , HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs/';
import 'rxjs/';
import { map, catchError } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class ParametrageService {
    private _serUrl = '';
    opt:any;

    constructor(private _http: HttpClient){ }

    private extractData(res:any){
        let body = res;
        return body || [];
    }

    updateParamGeneral(param)  {  
        this._serUrl = 'http://localhost/Projectangular2/api/v1/updateParameter';
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'PUT'
        }); 
       
        this.opt = { 
            headers:header
        };

        return this._http.put(this._serUrl, param, this.opt)
        .pipe( 
            map(data => this.extractData(data) ),
            catchError( error => of(error))
        );
    }
}