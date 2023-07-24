import { Injectable, Inject } from '@angular/core';
import { Actions, Effect,createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { tap, map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { defer } from 'rxjs/';

import { AuthActionTypes, AuthAction, LoginSuccessAction, LogoutAction ,UnLockScreenAction} from '../actions/users-action';
import { AuthentificationService } from '../../services/index';

//import { CryptoUtilities }  from '../../shared/crypto_Utils';
//import { JwtHelper } from 'angular2-jwt/angular2-jwt';

import { State } from '../reducers/index';
import { Store } from "@ngrx/store";
import { Contact } from '../../models/contact';

@Injectable()
export class UserAuthEffects {
    
    isAuthorize;
    login$ = createEffect( () =>
        this.actions$.pipe(
            ofType<AuthAction>(AuthActionTypes.AuthAction),
            mergeMap( <Actions> (action) => 
                this.loginservice.login(action.payload.login , action.payload.password)
                .pipe( 
                    map( isloggin => {
                        if(isloggin){
                            this.isAuthorize = false;
                            let homePage ='/login';
                            console.log
                            isloggin = Object.assign([], isloggin);
                            const { token, hasPerm, perms, status, login, ...profil } = isloggin;
                        
                            if( status == "success" ) {
                                let roleUser  = isloggin["role"];
                                homePage = (roleUser) ? this.getHomePage(roleUser) : '/home';
                                this.isAuthorize = true;
                                delete  isloggin["token"];

                                let sessionUserData = { jwt: token, isAuthorize:true, userrole: roleUser, hasPerm: hasPerm, perms: perms }; 
                                let userSession = {isAuthorize:true, jwt:token,login,isConnect:true,showLoginScreen:false};
                                let user = { username: action.payload.login, password: action.payload.password.replace(/[a-zA-Z0-9]/g,"*")};
                                this.store.dispatch(new LoginSuccessAction({ user, userSession, profil, permissions: perms[0], sessionUserData }));
                            }
                        }
                    }),
                    catchError(() => of(null))
                )
            )
        ),
        { dispatch: false }
    )

    unLockScreen$ = createEffect( () =>
        this.actions$.pipe( 
            ofType<UnLockScreenAction>(AuthActionTypes.UnLockScreen),
            tap(() => {
                this.store.dispatch(new LogoutAction());
            })
        ),
        { dispatch: false }
    );

    logout$ = createEffect( () =>
        this.actions$.pipe( 
            ofType<LogoutAction>(AuthActionTypes.LogoutAction),
            tap(() => {
                localStorage.removeItem("cookie-check");
                localStorage.removeItem("config");
                localStorage.removeItem("panier");
                localStorage.removeItem("loglevel:webpack-dev-server");
                this.router.navigateByUrl('/login');
            })
        ),
        { dispatch: false }
    );
    constructor(
        private actions$: Actions, 
        private router:Router, 
        private loginservice : AuthentificationService,
        private store: Store<State>
    ) {}


    getHomePage(role:string){
        switch(role){
            case "admin": {
                return "/admin";
            }
            case "client" :{
                return "/home";
            }
            default :
              return "/login";
        }
    }

    formatHomeUrl(home:string){
        
        if(!home.startsWith('/')){
            return '/'+home;
        } else{
            return home;
        }
    }
}
