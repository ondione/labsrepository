import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup , FormControl,Validators} from  '@angular/forms';
import { Router }  from '@angular/router';
import { User } from '../../../../models/user';
import { AuthentificationService } from '../../../../services/users.services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers:[AuthentificationService]
})
export class UsersComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  user = {};
  roles;

  constructor( private router : Router ,
    private userService : AuthentificationService
    ){ }

    ngOnInit() {
      this.user = {
        firstname: '',
        lastname: '',
        login: '',
        password: '',
        telephone: '',
        adresse: ''
      };

      this.roles = [
        { value: "client", description:"Client Role"},
        { value: "admin", description:"Admin Role"},
      ];

      this.registerForm = new FormGroup({
        $id: new FormControl(null),
        firstname: new FormControl('',[Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        login: new FormControl('', [ Validators.required, Validators.maxLength(25)]),
        password: new FormControl('',[Validators.required]),
        telephone: new FormControl('',[Validators.required]),
        adresse: new FormControl('',[Validators.required]),
        role: new FormControl('',[Validators.required]),
        isEnabled: new FormControl('',[Validators.required])
      });
    }

    onSubmit(f) {
      this.submitted = true;
      //Stop here if form is invalid
     // console.log(f.value, " date recu 1 ");
      if(f){
       // console.log(f.value, " date recu");
        this.saveUser(f.value);
      }
    }

    saveUser(form:FormGroup){
      let f = form.value;

      //console.log(form.value, " form values");
      //console.log(form , " form only ");


      let user: User = {
        firstname: f.firstname,
        lastname: f.lastname,
        login: f.login,
        password: f.password,
        telephone: f.telephone,
        adresse: f.adresse,
        role: f.role,
        isEnabled: ( f.isEnabled  && f.isEnabled == true) ? 'OUI':'NON'
      };

      this.userService.saveUser(user).subscribe( response =>{
        //console.log(response, " response recu ");
        if(response && response.hasOwnProperty("status") && response["status"] =="success"){
          //console.log( "user saved correctly");
          this.router.navigate(['/listeusers'])
        }
      });
    }

}
