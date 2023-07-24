
//import { Action } from '@ngrx/store';
import { Login } from '../../models/login';
import { Session } from '../../models/session';
import { User } from '../../models/user';
import { Permissions } from '../../models/permissions';
import { SessionUserData } from '../../models/sessionUserData';
import { AuthActions, AuthActionTypes} from '../actions/users-action';

export interface AuthState {
  loggedIn: boolean,
  user: Login,
  sessionData :Session,
  profil: User,
  permissions:Permissions,
  sessionUserData:SessionUserData,
  isLockScreen:boolean
}

export const initialAuthState: AuthState = {
  loggedIn: false,
  user: undefined,
  sessionData : null ,
  profil: null,
  permissions: null,
  sessionUserData:null,
  isLockScreen:false
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.AuthAction:
        let usrData = { username : action.payload.login , password: action.payload.password } ;
        
            return  { 
                loggedIn: false,
                user : usrData,
                sessionData: null,
                profil: null,
                permissions:null,
                sessionUserData: null,
                isLockScreen:false
            };

        case AuthActionTypes.LoginSuccessAction:
            
            return {
                loggedIn: true,
                user: action.payload.user,
                sessionData: action.payload.userSession,
                profil: action.payload.profil,
                permissions: action.payload.permissions,
                sessionUserData: action.payload.sessionUserData,
                isLockScreen:false
            };

        case AuthActionTypes.LogoutAction:
            return {
                loggedIn: false,
                user: undefined,
                sessionData: null,
                profil: null,
                permissions: null,
                sessionUserData:null,
                isLockScreen:false
            };

        case AuthActionTypes.LockScreen:
            case AuthActionTypes.UnLockScreen:
        //let islockScreen = action.payload.valueOf;
       // const  { loggedIn , user , sessionData,profil , permissions,sessionUserData, ...isLockScreen } = state;
        state.isLockScreen = <boolean>action.payload;
        return state;

        default:
        return state;
    }
}





/* import { SessionActions, SessionAction} from '../actions/users-action';
import { sessionType, ISessionList }  from '../models/session';
import { Action } from 'redux';

const INITIAL_USER_STATE: ISessionList = {
    user:[],
    isloggin:false,
    check_login:[],
    profil:[]
};


function getPreviousSessionState(state, action){
    let temporary = [];
    temporary = Object.assign({}, state, {  ...state, profil: action.payload  }).profil;
    return temporary;
}

function getPreviousUserState(state, action){
    let temporary = [];
    temporary = Object.assign({}, state, {  ...state, profil: action.payload  }).user;
    return temporary;
}

function getPreviousLoginCheckState(state, action){
    let temporary = [];
    temporary = Object.assign({}, state, {  ...state, profile: action.payload  }).login_check;
    return temporary;
}

export function createUserReducer( sessionType: sessionType) {
    return function userReducer(state: ISessionList = INITIAL_USER_STATE, a: Action): ISessionList {

        const action = a as SessionAction;
        if (!action.meta || action.meta.sessionType !== sessionType) {
             return state;
        }


        switch (action.type) {
            case String(SessionActions.REQUEST_LOGIN):
                return {
                    ...state,
                    user:action.payload,
                    isloggin:false,
                    check_login:null,
                    profil:null
                };
    
            case String(SessionActions.RECEIVE_LOGIN):
                return {
                    ...state,
                    user:action.payload,
                    isloggin:true,
                    check_login:null,
                    profil:null
                };
    
            case String(SessionActions.REQUEST_GET_PROFIL):
                return {
                    ...state,
                    user:getPreviousUserState(state, action),
                    isloggin:true,
                    check_login:null,
                    profil: action.payload
                };
    
            case String(SessionActions.RECEIVE_GET_PROFIL):
                return {
                    ...state,
                    user:getPreviousUserState(state, action),
                    isloggin:true,
                    check_login:action.payload,
                    profil:getPreviousSessionState(state, action)
                };
    
            case String(SessionActions.REQUEST_LOGIN_CHECK):
                return {
                    ...state,
                    user:getPreviousUserState(state, action),
                    isloggin:true,
                    check_login:action.payload,
                    profil:getPreviousLoginCheckState(state, action)
                };
            case String(SessionActions.RECEIVE_LOGIN_CHECK):
                return {
                    ...state,
                    user:null,
                    isloggin:true,
                    check_login:action.payload,
                    profil:getPreviousSessionState(state, action)
                };
    
            case String(SessionActions.RESET_SESSION):
                return {
                    ...state,
                    user:null,
                    isloggin:false,
                    check_login:null,
                    profil:null
                };
            default:
                return state;
        }





    }
}




/*export default (state = [], action: SessionAction = {type:"?"}) => {
    switch (action.type) {
        case String(SessionActions.REQUEST_LOGIN):
            return {...state, loginParam: action.user};

        case String(SessionActions.RECEIVE_LOGIN):
            return {...state, isloggin: action.isloggin};

        case String(SessionActions.REQUEST_GET_PROFIL):
            return {...state, user: action.user};

        case String(SessionActions.RECEIVE_GET_PROFIL):
            return {...state, profil: action.profil};

        case String(SessionActions.REQUEST_LOGIN_CHECK):
            return {...state,  isloggin: action.isloggin};

        case String(SessionActions.RECEIVE_LOGIN_CHECK):
            return {...state, check_login: action.check_login};

        case String(SessionActions.RESET_SESSION):
            return {...state, isloggin: null};
        default:
            return state;
    }
};

export const profilUser = state => state.session.isloggin
export const isloggin = state => state.session.isloggin
export const check_login = state => state.session.check_login
*/ 