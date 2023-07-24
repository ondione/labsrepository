import { Component , OnInit, AfterViewInit,AfterContentInit, AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Inject}  from '@angular/core';
import { FormControl, FormGroup , Validators, FormBuilder }  from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthentificationService }  from '../../services/users.services';
import { Router }  from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from '../../store_managment/reducers/index';
import { AuthAction, LogoutAction } from '../../store_managment/actions/users-action';
import { addAppSettingsAction } from '../../store_managment/actions/appSettings-action';
import { isLoggedIn , sessionUserData, getScreenLockStatus} from '../../store_managment/selectors/session.selectors';

//import {TranslateService} from '@ngx-translate/core';

@Component({
    selector : 'app-root',
    templateUrl:'./templates/login.html',
    styles:[],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent  {
    isConnected;
    userRole;
    isAuth = false;
    
    clientHeader = false;
    adminHeader = false;
    displayHeaderInfo;
    isScreenLocked =  false;
    constructor(
        private _http:HttpClient, 
        private authservice: AuthentificationService, 
        private route: Router , 
        private changedetectorRef :ChangeDetectorRef,
        private store:Store<State>,
       //translate: TranslateService
    ){

        //translate.setDefaultLang('en');
        // the lang to use, if the lang isn't available, it will use the current loader to get them
       // translate.use('en');
    }

    ngOnInit(){
       this.isUserConnected();
       this.displayHeaderInfo = this.displayHeaderForRole();
    }
    ngAfterViewInit(){
        this.isUserConnected();
        this.displayHeaderInfo = this.displayHeaderForRole();
       //console.log(this.displayHeaderInfo, " this.displayHeaderInfo ")
    }
    ngAfterContentInit(){
        this.displayHeaderInfo = this.displayHeaderForRole();
    }

    login_appli(f){
        let login = f.value.username;
        let password = f.value.password;
        this.store.dispatch(new AuthAction({login, password}));
        this.store.select(sessionUserData).subscribe( resp =>{
            if(resp){
                this.userRole = resp["userrole"];
                let homePage = (this.userRole) ? this.getHomePage(this.userRole) : '/login';
                this.isConnected = resp;
                this.displayHeaderInfo = this.getSuitenableHeader(this.userRole);
                this.route.navigateByUrl(homePage);
             
                this.ngOnInit();
            }
        });
    }

    isUserConnected(){
        this.store.select(isLoggedIn).subscribe( resp =>{
            if(resp == true){
                this.isConnected = resp;
                this.changedetectorRef.detectChanges();
            }
        });
    }

    isUserIsAuth(){
        this.store.select(isLoggedIn).subscribe( resp =>{
            if(resp && resp == true){
                this.isAuth = true;
            }else{
                this.isAuth = false;
            }
        });
        return  this.isAuth;
    }

    logout(){
        this.isConnected = false;
        localStorage.removeItem("isConnected");
        localStorage.removeItem("app-cookies");
        sessionStorage.removeItem("APP_KEY");
        this.route.navigateByUrl('/login');
        this.store.dispatch(new LogoutAction());
        this.store.dispatch(new addAppSettingsAction());
        this.ngOnInit();
    }

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

    getSuitenableHeader(role){
        let clientHeader = false;
        let adminHeader  = false;
        let isScreenLocked = true;
        if( role == "client"){
            clientHeader = true;
            adminHeader  = false
        }else if(role == "admin"){
            clientHeader = false;
            adminHeader  = true;
        }
        return { clientHeader: clientHeader , adminHeader: adminHeader, isScreenLocked };
    }
    displayHeaderForRole(){
        this.store.select(sessionUserData).subscribe( resp =>{
            if(resp){
                this.userRole = resp["userrole"];
                if( this.userRole == "client"){
                    this.clientHeader = true;
                    this.adminHeader  = false
                }else if(this.userRole == "admin"){
                    this.clientHeader = false;
                    this.adminHeader  = true;
                }
            }
            
        });
        this.store.select(getScreenLockStatus).subscribe( resp=>{
            if(resp){
                console.log(resp , " lockscreen ")
                this.isScreenLocked = resp;
            }
        });
        return { clientHeader: this.clientHeader , adminHeader: this.adminHeader , isScreenLocked : this.isScreenLocked };
    }
}