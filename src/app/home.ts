import {Component, OnInit ,AfterViewInit,Input ,Output, ChangeDetectionStrategy, EventEmitter, Inject} from '@angular/core';
import { AuthentificationService  } from './services/users.services';
import { Router } from '@angular/router';



@Component({
    selector:"app-root",
    template:` <!--header-view [isConnected]="isConnected" (logout)="logout()"></header-view-->`,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements  AfterViewInit{

    isConnected;
    sessionData;

    constructor( public auth: AuthentificationService, public router: Router) { }

    ngAfterViewInit(){
        let isconn = localStorage.getItem("isConnected");
        this.isConnected  = (isconn) ? isconn : false;
    }

    logout(){
        let login = this.sessionData["login"];
        this.auth.logout(login).subscribe( resp =>{
            console.log(resp ," response from logout")
            if(resp && resp["status"] == "success"){
             this.router.navigate(["/login"]);
            }
        });
    }

}