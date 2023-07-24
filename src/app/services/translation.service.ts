import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Translation } from '../models/translation';
import 'rxjs/';
import { Observable, of } from 'rxjs/';
import { map, catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../store_managment/reducers/index';
import { AddTranslationAction } from '../store_managment/actions/translation-actions';

@Injectable()
export class TranslationService {
    private translations: any[];
    private options : Object = [];
    constructor( private _http: HttpClient , private store :  Store<State> ){ }
   
    loadTranslation(): Observable<any> {  //: Observable <Translation>
        this.options = {
            headers:new HttpHeaders({ 'Content-Type': "application/json" })
        };

        return this._http.get('assets/settings/translations/appTranslation.json', this.options).pipe(
            map( trans => {
                trans =  <Object> trans
                this.translations = <any> trans ;
                this.saveTranslation();
            })
        );
    }

    saveTranslation(){
        var formatedLabel = this.formatLabels();
        this.store.dispatch(new AddTranslationAction({ translations: formatedLabel}));
    }

    formatLabels(){

        var trans = this.translations, 
            langs = Object.keys(Object.values(trans)[0]),
            k=1,
            labels = [];

        langs.forEach( value =>{
            if(value!=null && value!='undefined'){
                var lg = {}
                lg["id"] = k;
                lg[`${value}`] = this.labelFromLang(trans, value);
                labels.push(lg);
                k++;
            }
        });   

        
       return labels;
    }

    labelFromLang(trans, lang){

        var i = 1 , tabFormated = [];
        for(var key in trans) {  
            var element = trans[key];
            var curLang = `${lang}`;
            var index = `${key}`;
            var returnedTab = element[curLang];
            var arr = {};
            arr[`${key}`] = returnedTab;
            arr["id"] = i;
            if(returnedTab && returnedTab.length > 0){
              tabFormated.push(arr);
            }
           
            i++;
        }
        return tabFormated;
    }
}
