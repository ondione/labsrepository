import { Component, Injectable,OnInit, Inject} from '@angular/core';
import { ActivatedRoute , ActivatedRouteSnapshot, Router } from '@angular/router';
import { BehaviorSubject} from 'rxjs';
import { FormBuilder, FormGroup , FormControl,Validators} from  '@angular/forms';
import { AuthentificationService }  from '../../../../services/users.services';
import { sharedService }  from '../../../../services/shared.service';
import { debounceTime } from 'rxjs/operators';
import { Observable, Subject} from 'rxjs/';
import * as CryptoJS from 'crypto-ts';




@Component({
  selector: 'app-root',
  templateUrl: './user_permission.html',
  styles:[`.alert {
    width:13%,
    margin-bottom: 50px;
    height: 40px;
    padding:10px;
  }`]
})
export class UserPermissionComponent implements OnInit{
  /*panelOpenState = false;*/
  private id;
  saveForm : FormGroup;
  displayAlert = false;
  alertmessage = new Subject<string>();
  
  successMessage :string;
  alerttypeCss : string  ='';
  alertdismiss : boolean = false;
 
  constructor(
    private route: ActivatedRoute,
    private userSer : AuthentificationService,
    private shareserv: sharedService
    ){}

  ngOnInit(){
    this.route.paramMap.subscribe(paramMap => { 
     // console.log(paramMap.get('id'), " paraMap" );
      this.id = +paramMap.get('id'); // (+) converts string 'id' to a number
    });

    let hasperm  =  this.shareserv.hasPerms();

    this.saveForm = new FormGroup({
      $id: new FormControl(null),
      adduser: new FormControl(''),
      upduser: new FormControl(''),
      lisuser: new FormControl(''),
      deluser: new FormControl(''),
      disuser: new FormControl(''),
      addcontact: new FormControl(''),
      updcontact: new FormControl(''),
      liscontact: new FormControl(''),
      delcontact: new FormControl(''),
      addprod: new FormControl(''),
      updprod: new FormControl(''),
      lisprod: new FormControl(''),
      delprod: new FormControl(''),
      addhist: new FormControl(''),
      lishist: new FormControl('')
    });
    let permissions = this.shareserv.getPerms();
      //console.log(permissions , hasperm , " permi  has perm selected");

    if(hasperm == true){

      
      this.saveForm.patchValue({
        $id: this.id,
        adduser: permissions.adduser,
        upduser: permissions.upduser,
        lisuser: permissions.lisuser,
        deluser: permissions.deluser,
        disuser: permissions.disuser,
        addcontact: permissions.addcontact,
        updcontact: permissions.updcontact,
        liscontact: permissions.liscontact,
        delcontact: permissions.delcontact,
        addprod: permissions.addprod,
        updprod: permissions.updprod,
        lisprod: permissions.lisprod,
        delprod: permissions.delprod,
        addhist: permissions.addhist,
        lishist: permissions.lishist
      });
    }
    //this.saveForm.patchValue({$id: this.id});
  }

  savePermission(f){
    
      let perm = f.value;
      let params = {id_user:this.id,permissions:perm};
      this.userSer.savePermission(params).subscribe( r=> {
        if(r){
          let cookie = JSON.parse(localStorage.getItem('cookie-check'));
          cookie.perms = params.permissions;
          localStorage.setItem('cookie-check',JSON.stringify(cookie));
          let alert_param = {
            message: "Enregistrement Effectué avec success",
            style: "success",
            time :15000
          };
          this.showAlert(alert_param);
        }
      });
  }

  showAlert(params){
    this.alertmessage.next(params.message);
    this.alertmessage.subscribe( (message) => {
      this.successMessage = message;
      this.displayAlert = true;
      this.alerttypeCss = params.style;
    });   

    this.alertmessage.pipe( debounceTime(params.time) ).subscribe(() => {
      this.successMessage = null;
      this.displayAlert = false;
    });
  }


}