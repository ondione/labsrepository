import { Component, Inject }  from '@angular/core';
import { Router }  from '@angular/router';



@Component({
    selector : 'app-root',
    templateUrl:'./templates/logout.html',

})

export class LogoutComponent  {

    constructor(  private route: Router ){}

    ngOnit(){
        this.logout();
    }

    logout(){
        localStorage.removeItem("isConnected");
        localStorage.removeItem("app-cookies");
        this.route.navigateByUrl('/login');
    }
}