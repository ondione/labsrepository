import { Injectable, Inject } from '@angular/core';
import { HttpClient , HttpHeaders , HttpResponse } from '@angular/common/http';
import { map, catchError, tap , mergeMap } from 'rxjs/operators';
import { Observable, of , forkJoin} from 'rxjs/';
import { selectUrls } from '../store_managment/selectors/appSetting-selector';
import { Store, select } from '@ngrx/store';
import { State } from '../store_managment/reducers/index';


@Injectable()
export class AppSettingService{
    private _config: Setting;
    private _serUrl = '';
    private baseUrl = 'http://localhost/Projectangular2/api/v1/';
    opt;
    constructor(  private _http: HttpClient ,  private store: Store<State>) { 
        this.getSetting();
    }
    private extractData(res:any){
        let body = res;
        return body || [];
    }
   
    getSetting() {
        var localSettingsUrl = 'http://localhost:4200/assets/settings/appSetting.json';
        var other_settings_apiUrl= `${this.baseUrl+'generalparameters'}`;
    
        let header = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'http://localhost:4200/',
            'Access-Control-Allow-Methods':'GET'
        }); 
        let params = {  };
        this.opt = { 
            headers: header
        };
        const localSettings =  this._http.get(localSettingsUrl, this.opt).pipe(res =>this.extractData(res) );
        const otherSettings =  this._http.get(other_settings_apiUrl, this.opt).pipe(res =>this.extractData(res));
        
        return forkJoin([localSettings, otherSettings])
        .pipe( 
            map( data => data),
            catchError( error => of(error))
        );
    }

    getConfig(){
        if(localStorage.getItem('config')){
            this._config = JSON.parse(localStorage.getItem('config'));
        }
        return this._config;
    }
    private handleError(error: Response){
        return Observable.throw(error);
    }
  
    formatUrl( url: string ) {
        let config = this.store.select(selectUrls).subscribe(urls =>{
            this._config = urls;
        })
        return this._config.api_base_url3 + url;
    }

    formatPhpApiUrl( url: string ) {
        this.store.select(selectUrls).subscribe(urls =>{
            console.log(urls , " urls")
            this._config = urls;
        });
        return this._config.api_base_url2 + url;
    }

}
export interface Setting {
    api_base_url: string;
    api_base_url2: string;
    api_base_url3: string;
}