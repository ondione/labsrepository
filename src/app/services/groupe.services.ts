
import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders , HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs/';
import 'rxjs/';
import { map, catchError } from 'rxjs/operators';
import { Group } from '../models/groupe';

@Injectable()
export class GroupService {
    private _serUrl = '';
    group: Group ;
    opt:any;
    constructor(private _http: HttpClient){ }

    private extractData(res:any){
        let body = res;
        return body || [];
    }
   
    getListGroups(): Observable<Group[]> {
        this._serUrl = 'http://localhost/Projectangular2/api/v1/getAllGroup';
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

    getGroupById(id: number): Observable<ArrayBuffer>{

        this._serUrl = 'http://localhost/Projectangular2/api/v1/getGroupById';
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'http://localhost:4200/',
            'Access-Control-Allow-Methods':'GET'
        }); 
        let params = { idGroup: id };
       
        this.opt = { 
            headers: header
        };

        return this._http.post(this._serUrl,params, this.opt)
        .pipe( 
            map( data => this.extractData(data)) ,
            catchError( error => of(error)) 
        ); 
    }

    addGroup(Group: Group)  {
        this._serUrl = 'http://localhost/Projectangular2/api/v1/addGroup';
       
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'http://localhost:4200/',
            'Access-Control-Allow-Methods':'POST'
        }); 
        let params = Group;
      
        this.opt = { 
            headers: header
        };

        return this._http.post(this._serUrl, params, this.opt)
        .pipe(
            map( data => this.extractData(data)  ),
            catchError( error => of(error))
        );
    }

    updateGroup(Group)  {  
        this._serUrl = 'http://localhost/Projectangular2/api/v1/updateGroup';
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'PUT'
        }); 
        let params = Group;
        this.opt = { 
            headers:header
        };
        return this._http.put(this._serUrl, params, this.opt)
        .pipe( 
            map(data => this.extractData(data)  ) ,
            catchError( error => of(error))
        );
    }

    deleteGroup(Group:Group){
        this._serUrl = 'http://localhost/Projectangular2/api/v1/deleteGroup'; 
        let params = { GroupId: +Group.id_group };
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'http://localhost:4200',
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
}