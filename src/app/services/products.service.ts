import { Injectable, Inject } from '@angular/core';
import { HttpClient ,HttpHeaders , HttpResponse } from '@angular/common/http';
import { AppSettingService } from './appService';


import { Observable, of ,forkJoin} from 'rxjs/';
import 'rxjs/';
import { map, catchError } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';

import { FormGroup , FormControl , Validators }  from '@angular/forms';


@Injectable()
export class ProductServices {
    private _serUrl = '';
    private header;
    private opt;

    constructor(
        private _http: HttpClient, 
        private _setting : AppSettingService
    ){
        this.header  = new Headers({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        });
    }

    form = new FormGroup({
        $id : new FormControl(null),
        ref : new FormControl(''),
        categorie : new FormControl(0),
        nom : new FormControl('test'),
        libelle : new FormControl(''),
        isexpired : new FormControl(''),
        date_expired : new FormControl(''),
        quantite_stock : new FormControl(''),
        PU : new FormControl(0)
    });

    private extractData(res:any){
        let body = res;
        return body || [];
    }

    getAllProducts(): Observable<ArrayBuffer>{
        return this._http.get('assets/settings/produits.json').pipe(
            map( (response) =>  this.extractData(response)),
            catchError(this.handleError)
        );
    }
   
    paymentProcess(_options, contact) :Observable<ArrayBuffer>{
        this._serUrl = this._setting.formatUrl(''); 
        let objParams = {
            "jsonrpc":"2.0",
            "method":"contacts.savePaymentObject",
            "parameter":{
                data: _options.params,
                id_client: contact.id,
                client: contact,
                provider: _options.provider,
                payAmount:_options.payAmount,
                canCheckBalance: _options.canCheckBalance
            }
        };

        let opt = { 
            headers:this.header
        };

        return this._http.post(this._serUrl,objParams, opt).pipe(

            map((response) => this.extractData(response) ),
            catchError(this.handleError)
        );
     
    }

    printpdfReceipe(pdfObject):Observable<ArrayBuffer>{
        this._serUrl = this._setting.formatUrl(''); 
        let objParams = {
            "jsonrpc":"2.0",
            "method":"pdftemplate.printPdf",
            "parameter":{
                data: pdfObject.params,
                client:pdfObject.contact,
                type : pdfObject.type
            }
        };
      
        let opt = { 
            headers: this.header
        };
      
        return this._http.post(this._serUrl,objParams, opt).pipe(
            map( (response) =>  this.extractData(response)),
            catchError(this.handleError)
        );
    }

    historiqueAchat(idClient:number):Observable<ArrayBuffer>{
        this._serUrl = this._setting.formatUrl(''); 
        let params = {
            "jsonrpc":"2.0",
            "method":"contacts.historiqueachat",
            "parameter":{
                id_client: idClient
            }
        };
        
        let opt = { 
            headers: this.header
        };
        
        return this._http.post(this._serUrl, params, opt).pipe(
            map( (response) =>  this.extractData(response)),
            catchError(this.handleError)
        );
    }

    removePanier(){
        localStorage.setItem('panier',null);
    }
    private handleError(error: Response){
        console.log(error);
        return of(error);
    }

    uploadFileToUrl(file){
        var fd = new FormData();
        fd.append('file', file);
        this._serUrl =  this._setting.formatUrl('uploadfiles');
        return  this._http.post(this._serUrl, fd).pipe(
            map((response: Response) => response ),
            //retryWhen(errors => errors.delay(2000)),
            catchError(this.handleError)
        );
    }

    saveProduct(product){
        this._serUrl = this._setting.formatUrl(''); 
        let params = {
            "jsonrpc":"2.0",
            "method":"products.addProduct",
            "parameter":product
        };

        let opt = { 
            headers: this.header
        };
      
        return this._http.post(this._serUrl, params, opt).pipe(

            map((response) => this.extractData(response) ),
            catchError(this.handleError)
        );
       
    }
    getAllProductsWs() {
        this._serUrl = this._setting.formatUrl(''); 
        let params = {
            "jsonrpc":"2.0",
            "method":"products.getAllProduct",
            "parameter":{}
        };
      
        this.opt = { 
            headers: this.header,
            params:  params,
            responseType: 'json',
            observer : 'response'
        };
      
        return this._http.get(this._serUrl, this.opt).pipe(
            map((response) => this.extractData(response) ),
            catchError(this.handleError)
        );
       
    }
    
    getProductById(id:number){

        this._serUrl = this._setting.formatUrl(''); 
        let params = {
            "jsonrpc":"2.0",
            "method":"products.getProductById",
            "parameter":{
                id: id
            }
        };
       
        this.opt = { 
            headers: this.header
        };

        return this._http.post(this._serUrl, params,this.opt)
        .pipe( 
            map( data => this.extractData(data) ),
            catchError( error=> of( error))
        ); 
    }
}