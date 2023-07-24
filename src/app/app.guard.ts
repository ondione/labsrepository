import { Injectable ,} from '@angular/core';
import { Router, CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthentificationService, sharedService  } from './services/index';

import { Store, select } from '@ngrx/store';
import { State } from './store_managment/reducers/index';
import { AuthAction, LogoutAction, LockScreenAction } from './store_managment/actions/users-action';
import { isLoggedIn, sessionUserData , sessionData } from './store_managment/selectors/session.selectors';
import { selectedParams } from './store_managment/selectors/appSetting-selector';
import { JwtModule , JwtHelperService} from '@auth0/angular-jwt';

/*
import { JwtHelperService } from "@auth0/angular-jwt";
const helper = new JwtHelperService();
const decodedToken = helper.decodeToken(myRawToken);
const expirationDate = helper.getTokenExpirationDate(myRawToken);
const isExpired = helper.isTokenExpired(myRawToken);
*/

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    isConnected :any;
    isExpired =  null;
    decodedToken = null;
    expirationDate = null;

    constructor(
      public auth: AuthentificationService, 
      public router: Router,
      private store:Store<State>,
      private shareServ: sharedService
    ) {
      var jwtHelper =  new JwtHelperService();
      this.store.select(sessionUserData).subscribe( resp =>{
        if(resp && resp.jwt){
          let token = resp.jwt;
          this.decodedToken = jwtHelper.decodeToken(token);
          const expirationDate = jwtHelper.getTokenExpirationDate(token);
          this.isExpired = jwtHelper.isTokenExpired(token);
          console.log(this.decodedToken , " decoded token");
          console.log(this.expirationDate , " expirationDate token");
          console.log(this.isExpired , " isExpired token");
        }
      });
     }

    canActivate(): boolean {
      this.isConnected = this.shareServ.isUserConnected();
      if(!this.isConnected  || this.isConnected == false ){
        this.store.dispatch(new LogoutAction());
        this.router.navigate(['/login']);
         return false;
      }else if(this.isExpired == true){
        this.store.dispatch(new LockScreenAction(true));
        this.router.navigate(['/LockScreenPage']);
        return true;
      }
      return true;
    }

    canLoad(): boolean {
      this.isUserConnected();
      if(!this.isConnected  || this.isConnected == false ){
        this.store.dispatch(new LogoutAction());
        this.router.navigate(['/login']);
        return false;
      }else if(this.isExpired == true){
        this.router.navigate(['/LockScreenPage']);
        return true;
      }
      return true;
    }

    isUserConnected(){
      this.store.select(isLoggedIn).subscribe( resp =>{
        if(resp == true){
          this.isConnected = resp;
        }
      })
    }
}

@Injectable()
export class RoleGuard implements CanActivate {
    isConnected :any;
    userrole:any;
    currentLogin;
  constructor(
    public auth: AuthentificationService,
    public router: Router,
    private store: Store<State>,
    private shareServ: sharedService
  ) { 

    this.store.pipe(select(sessionData)).subscribe( response => {
      if(response){
        this.currentLogin = response.login;
      }
    });
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.role;
    this.isConnected = this.shareServ.isUserConnected();
    this.store.pipe(select(sessionUserData)).subscribe( response => {
      if(response){
        console.log(response , " response ")
        this.userrole = response.userrole;
        if(!this.isConnected || this.userrole != expectedRole) {
          this.auth.logout(this.currentLogin);
          this.store.dispatch(new LogoutAction());
          this.router.navigate(['/login']);
          return false;
        }
      }
    });
    return true;
  }
}
