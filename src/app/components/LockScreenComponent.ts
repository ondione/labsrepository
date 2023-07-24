import { Component,Input } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { State } from '../store_managment/reducers/index';
import { UnLockScreenAction } from '../store_managment/actions/users-action';

@Component({
 
   selector:"app-root",
   template :`<div class="form-row col-sm-12">
   <div>Lock Screen Page </div>

     <div>
        <a class="nav-link" (click)="unLockScreen()">Deverrouiller <span class="sr-only">(current)</span></a>
     </div>
   </div>`,
   styles:[]
})

export class LockScreenComponent {
  constructor(  private store:Store<State> ){}
  unLockScreen(){
    console.log("fired")
    this.store.dispatch(new UnLockScreenAction(false));
  }
}