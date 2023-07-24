import { Component, OnInit, Input } from '@angular/core';
import { AuthentificationService }  from '../../services/users.services';  
import { Store, select } from '@ngrx/store';
import { State } from '../../store_managment/reducers/index';   
import { sessionData } from '../../store_managment/selectors/session.selectors';   
import { LogoutAction } from '../../store_managment/actions/users-action';                                                                                                                                                                                                                                                                                                                                                        
@Component({
    selector: 'admin-header',
    templateUrl :'./admin.html',
    providers:[AuthentificationService]
})

export class AdminComponent implements OnInit {
    currentLogin = '';
    @Input() displayHeaderInfo;
    constructor(private logservice: AuthentificationService,
        private store:Store<State> ) {  }
    ngOnInit(){
        this.store.pipe(select(sessionData)).subscribe( response => {
            this.currentLogin = response.login
        });
    }

    logout(){
        this.logservice.logout(this.currentLogin);
        this.store.dispatch(new LogoutAction());
    }
}


