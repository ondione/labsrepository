import { Action } from '@ngrx/store';
import { Login }   from '../../models/login';
import { Session }  from '../../models/session';
import { User } from '../../models/user';
import { Permissions } from '../../models/permissions';
import { SessionUserData } from '../../models/sessionUserData';

export enum  AuthActionTypes{
    AuthAction = '[Auth] Action',
    LoginSuccessAction = '[Login Success] Action',
    LogoutAction = '[Logout] Action',
    LockScreen = '[LockScreen] Action',
    UnLockScreen = '[UnLockScreen] Action',
    GetSessionAction = '[Session ] Action',
    GetPermissionsAction = '[GetPermission ] Action'
}

export class AuthAction implements Action {
    readonly type = AuthActionTypes.AuthAction;
    constructor(public payload: { login: string, password: string }) { }
}

export class LoginSuccessAction implements Action {
    readonly type = AuthActionTypes.LoginSuccessAction;
    constructor(public payload: { 
        user: Login , 
        userSession: Session, 
        profil: User , 
        permissions: Permissions, 
        sessionUserData: SessionUserData
    }) { }
}

export class LogoutAction implements Action {
    readonly type = AuthActionTypes.LogoutAction;
}

export class GetSessionAction implements Action {
    readonly type = AuthActionTypes.GetSessionAction;
}

export class GetPermissionsAction implements Action {
    readonly type = AuthActionTypes.GetPermissionsAction;
}

export class LockScreenAction implements Action {
    readonly type = AuthActionTypes.LockScreen;
    constructor(public payload: boolean ) { }
}
export class UnLockScreenAction implements Action {
    readonly type = AuthActionTypes.UnLockScreen;
    constructor(public payload: boolean ) { }
}

export type AuthActions = AuthAction | LoginSuccessAction | LogoutAction | GetSessionAction | GetPermissionsAction | LockScreenAction | UnLockScreenAction