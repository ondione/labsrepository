import { Component, Inject} from '@angular/core';
import { AuthentificationService }  from '../../services/users.services';
import { Router } from '@angular/router';
import { EqualValidator }  from '../../helper';



@Component({
    selector: 'app-root',
    templateUrl: './templates/changePassword.html',
    providers:[EqualValidator] 
})

export class ChangePass {
    inputUsername ='';
    inputOldPassword='';
    inputNewPassword='';
    isConnected;
    sessionData;
    constructor( private auth: AuthentificationService, private route : Router) { }
    ngOnInit() {
        this.sessionData =  localStorage.getItem("app-cookies");
    }

    changepass(form){
       console.log(form.value, " form value " );
       return this.auth.changePass(form.value).subscribe( resp => {
         // status: "success", message: "password successfully update", reponse: "OK"
         this.sessionData
            if(resp['status'] == "success" && resp["reponse"] === "OK"){
                let login = this.sessionData["login"];
                this.auth.logout(login);
                
                this.route.navigate(['/login']);
            }
       });
    }
    displayLog(e){
        if(e){
            return ( e == null || e.validateEqual == true) ? true : false;
        }
    }
}