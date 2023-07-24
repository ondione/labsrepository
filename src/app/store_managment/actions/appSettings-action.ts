import { Action } from '@ngrx/store';
import { AppSettings } from '../../models/appSettings' ;

export enum AppSettingsActionTypes {
    AddAppSettingsAction = '[request App Settings] Action ',
    AddAppSettingSuccessAction = '[Set App Settings ] Action',
}

export class addAppSettingsAction implements Action {
   public readonly type = AppSettingsActionTypes.AddAppSettingsAction;
}

export class addAppSettingSuccessAction implements Action {
    readonly type = AppSettingsActionTypes.AddAppSettingSuccessAction;
    constructor(public payload: { appSetting: AppSettings[]}) { }
}

export type AppSettingsActions = addAppSettingsAction | addAppSettingSuccessAction
