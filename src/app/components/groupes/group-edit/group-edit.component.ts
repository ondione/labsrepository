import { Component, OnInit ,ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute , ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable ,Subscription} from 'rxjs';
import { ContactService } from '../../../services/contacts.services';
import { GroupService } from '../../../services/groupe.services';
import { FormControl, FormGroup , Validators, FormBuilder }  from '@angular/forms';
import { Store, select } from '@ngrx/store';

import { Group } from '../../../models/groupe';

const INITIALIZE_GROUP : Group = {

  id_group:null,
  nom_group:'',
  libelle:'',

}

@Component({
  selector: 'app-root',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})



export class GroupEditComponent implements OnInit{

  private _subscription = new Subscription();
  idGroup:number;
  group = INITIALIZE_GROUP;
  listContacts;
  color;

  button_style = { 
    0:'btn-primary',
    1:'btn-secondary',
    2:'btn-success',
    3:'btn-danger',
    4:'btn-warning',
    5:'btn-info',
    6:'btn-light',
    7:'btn-dark'
  };

    constructor(
      private ctservice: ContactService, 
      private groupervice: GroupService,
      private activRoute: ActivatedRoute, 
      private changedetectorRef:ChangeDetectorRef,
      private route:Router) { }
      
    ngOnInit(){

      console.log(this.activRoute , " this.activRoute");

      if(this.activRoute.params){
          // this._subscription.add(
          this.activRoute.data
          .subscribe(params => {
            // Defaults to 0 if no query param provided.
            console.log(params , " data");
            this.color = params['color'];
            
          });

          
          this.activRoute.paramMap.subscribe( paramMap => { 
            this.idGroup = +paramMap.get('id');   // (+) converts string 'id' to a number
            this.getGroup( this.idGroup );
            this.ListeContactOfGroup(this.idGroup);
          })
          //);
      }
    }

    ListeContactOfGroup(groupId) {
      this.ctservice.contactsofgroup(groupId).subscribe( resp => {
        if(resp){
          this.listContacts = resp["listeContact"];
          this.changedetectorRef.detectChanges();
        }
      })
    }

   getGroup(id: number){
      this._subscription.add(
        this.groupervice.getGroupById(this.idGroup).subscribe( resp =>{
          if(resp && resp.hasOwnProperty("selected")){
            console.log(resp , "resp")
            this.group = resp["selected"][0];
        
          } 
        })
      );
    }

    ngOnDestroy(){
      this._subscription.unsubscribe();
    }
}