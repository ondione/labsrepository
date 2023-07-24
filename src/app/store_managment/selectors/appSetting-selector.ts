import { createFeatureSelector, createSelector} from '@ngrx/store';
import { AppSettingState  } from '../reducers/appSettings-reducer';
import * as fromAppSettings from '../reducers/contacts-reducer';

export const selectAppSettingState = createFeatureSelector<AppSettingState>("appSetting");
export const selectAllSetting   = createSelector( selectAppSettingState, AppSettingState => AppSettingState.entities );
export const selectContactById   = (id:number) => createSelector( selectAppSettingState, AppSettingState => AppSettingState.entities[id] );
export const selectUrls  = createSelector( selectAppSettingState, 
    AppSettingState => { 

    console.log(AppSettingState.entities[1] , " app sett ")
        const { id, params, ...urls } = AppSettingState.entities[1];
        return urls;
    });

export const selectedParams  = createSelector( selectAppSettingState, AppSettingState => AppSettingState.entities[1].params);
          