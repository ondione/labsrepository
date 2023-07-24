
import { shareReplay, filter, tap, map, catchError} from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable , BehaviorSubject,of} from "rxjs";
import { Login } from "../models/login";
import { AppSettingService } from './appService';


@Injectable()
export class AuthentificationService {

    private subject = new BehaviorSubject<any>(undefined);
    _serUrl: string = "";
    opt;
    constructor( private http: HttpClient , private _setting: AppSettingService) { }

    private extractData(res:any){
        let body = res;
        return body || [];
    }

    login(login:string, password:string ) {
        this._serUrl = 'http://localhost/Projectangular2/api/v1/login_wservice';
        return this.http.post(this._serUrl, {login, password}).pipe(
            map( data => this.extractData(data)),
            catchError( error => of(error))
        );
    }

    logout(login:string) : Observable<any> {

        this._serUrl = 'http://localhost/Projectangular2/api/v1/logout';
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'http://localhost:4200/',
            'Access-Control-Allow-Methods':'POST'
        }); 
        let params = { login: login};
        this.opt = { 
            headers: header
        };
        return this.http.post(this._serUrl, params, this.opt).pipe(
            shareReplay(),
            tap(resp => this.subject.next(resp)),
            map( resp => this.cleanSession())
        );
    }

    cleanSession(){
        localStorage.removeItem("isConnected");
        localStorage.removeItem("app-cookies");
    }

    changePass(obj):Observable<any>{
        this._serUrl = 'http://localhost/Projectangular2/api/v1/changeuserpass';
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'http://localhost:4200/',
            'Access-Control-Allow-Methods':'POST'
        }); 
        this.opt = { 
            headers: header
        };
        let params = { 
            login: obj.inputUsername,
            oldpassword: obj.inputOldPassword,
            newpassword: obj.inputNewPassword 
        };
        return this.http.post(this._serUrl, params, this.opt).pipe(
            map( data => this.extractData(data)),
            catchError( error => of(error))
        );
    }

    saveUser(user):Observable<Object>{
        this._serUrl = this._setting.formatUrl(''); 
        let params = {
            "jsonrpc":"2.0",
            "method":"user.addUser",
            "parameter":user
        };
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        });
        this.opt = { 
            headers: header
        };
        return this.http.post(this._serUrl,params, this.opt).pipe(
            map( data => this.extractData(data) ),
            catchError( error => of(error))
        );
    }

    getAllUsers(){
        this._serUrl = this._setting.formatUrl(''); 
        let params = {
            "jsonrpc":"2.0",
            "method":"user.getAllUser",
            "parameter":{}
        };
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        });
        this.opt = { 
            headers: header,
            params:params,
            responseType: 'json',
            observer : 'response'
        };
        return this.http.get(this._serUrl,this.opt).pipe( 
            map( data => this.extractData(data) ),
            catchError( error => of(error))
        );
    }

    getUserById(id:number){
        this._serUrl = this._setting.formatUrl(''); 
        let params = {
            "jsonrpc":"2.0",
            "method":"user.getUserById",
            "parameter":{
                id:id
            }
        };
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        });
        this.opt = { 
            headers: header
        };
        return this.http.post(this._serUrl,params,this.opt).pipe( 
            map( data => this.extractData(data) ),
            catchError( error => of(error))
        );
    }

    savePermission(obj){
        this._serUrl = this._setting.formatUrl(''); 
        let params = {
            "jsonrpc":"2.0",
            "method":"user.addPermission",
            "parameter": obj
        };
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        });
        this.opt = { 
            headers: header
        };
        return this.http.post(this._serUrl,params, this.opt).pipe( 
            map( data => this.extractData(data) ),
            catchError( error => of(error))
        );
    }
}








