import { Injectable } from '@angular/core';
import { Actions, createEffect,Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { tap, map, mergeMap, switchMap, catchError } from 'rxjs/operators';


import { 
    getAllContactAction,
    getContactByIdAction, 
    addContactAction, 
    updateContactAction, 
    deleteContactAction, 
    deleteContactsAction, 
    uploadFileToUrlAction, 
    listContactAction,
    ContactActionTypes, 
    ContactActions 
} from '../../store_managment/actions/contacts-action';

import { addAppSettingSuccessAction , addAppSettingsAction ,AppSettingsActionTypes} from '../actions/appSettings-action';
import { AppSettings }  from '../../models/appSettings';
import { Store, select } from '@ngrx/store';
import { State } from  '../../store_managment/reducers/index';
import { AppSettingService } from '../../services/appService';


@Injectable({providedIn: 'root'})
export class AppSettingsEffects {
    
    loadAppSettings$ = createEffect( () =>
        this.actions$.pipe(
            ofType<addAppSettingsAction>(AppSettingsActionTypes.AddAppSettingsAction),
            mergeMap( () => this._appSettingsService.getSetting()
                .pipe(
                    map( response => {
                        let items = [{...response[0], params: response[1].params[0] , id:1 }];
                        this.store.dispatch( new addAppSettingSuccessAction({ appSetting: <AppSettings[]>items }))
                    }),
                    catchError(() => of(null))
                )
            )
        ) , { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private _appSettingsService: AppSettingService,
        private store: Store<State>
    ) {}
}