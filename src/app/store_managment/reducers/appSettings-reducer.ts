
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action , createReducer, on } from '@ngrx/store';
import { AppSettings } from '../../models/appSettings' ;
import { AppSettingsActionTypes , AppSettingsActions } from '../actions/appSettings-action';

export interface AppSettingState extends EntityState<AppSettings> {
    allSettingsLoaded:boolean;
}

export const adapter : EntityAdapter<AppSettings>  = createEntityAdapter<AppSettings>();

export const initialAppSettingState: AppSettingState = adapter.getInitialState({
    allSettingsLoaded: false
});

export function AppSettingsReducer(state = initialAppSettingState , action: AppSettingsActions): AppSettingState {
    switch(action.type) {

        case AppSettingsActionTypes.AddAppSettingSuccessAction:{
            let data = action.payload.appSetting;
            return adapter.addAll(action.payload.appSetting, state);
        }
            
        default: {
            return state;
        }
    }
}

export const { selectAll, selectEntities, selectIds } = adapter.getSelectors();
  // select the array of user ids
export const selectContactsIds = selectIds;
  // select the dictionary of user entities
export const selectContactsEntities = selectEntities;
  // select the array of users
export const selectAllContacts = selectAll;

