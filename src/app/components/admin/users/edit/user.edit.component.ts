import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup , FormControl,Validators} from  '@angular/forms';
import { ActivatedRoute , ActivatedRouteSnapshot, Router } from '@angular/router';

import { AuthentificationService } from '../../../../services/users.services';
import { User } from '../../../../models/user';

@Component({
  selector:'app-root',
  templateUrl: './user.edit.component.html',
  styleUrls:[]
})

export class UserEditComponent implements OnInit {
   private id;
   selectedUser;
   editForm: FormGroup;
   roles;
   constructor( private userServ: AuthentificationService,private route: ActivatedRoute, private rte: Router){}

   ngOnInit() {

      this.editForm = new FormGroup({
         $id: new FormControl(null),
         firstname: new FormControl('',[Validators.required]),
         lastname: new FormControl('', [Validators.required]),
         login: new FormControl('', [ Validators.required, Validators.maxLength(25)]),
         telephone: new FormControl('',[Validators.required]),
         adresse: new FormControl('',[Validators.required]),
         role: new FormControl('',[Validators.required]),
         isEnabled: new FormControl('',[Validators.required])
      });

      this.route.paramMap.subscribe(paramMap => { 
         //console.log(paramMap.get('id'), " paraMap" );
         this.id = +paramMap.get('id'); // (+) converts string 'id' to a number
         this.retrieveUserById(this.id);
      });

      this.roles = [
         { value: "client", description:"Client Role"},
         { value: "admin", description:"Admin Role"},
      ];
   }

   retrieveUserById(id:number){
      this.userServ.getUserById(id).subscribe(resp =>{
         //console.log(resp, " response recu ");
         this.selectedUser = resp[0];
         this.editForm.patchValue({
            $id: this.selectedUser.id_user,
            firstname:this.selectedUser.firstname,
            lastname:this.selectedUser.lastname,
            login:this.selectedUser.login,
            telephone:this.selectedUser.telephone,
            adresse:this.selectedUser.adresse,
            role: this.selectedUser.role,
            isEnabled: this.selectedUser.actif_inactif
         });
        
      });
   }
}