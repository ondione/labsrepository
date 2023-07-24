import { Component,OnDestroy } from '@angular/core';
import { ContactService, showAlertService } from '../../services/index';
import { Router } from '@angular/router';
import { FormControl, FormGroup , Validators, FormBuilder }  from '@angular/forms';
import { Contact } from '../../models/contact';
import { Observable , Subscription} from 'rxjs';

@Component({
    selector:"app-root",
    templateUrl:'./templates/contact-add.html',
    styles:[
        `div.formulaire_button{
            line-height: 70px; 
            text-align: center;
            border-top:1px solid #ccc;
        }
        .has-success{
            border:1px solid green;
        }
        .has-danger{
            border:1px solid red;
        }
        .help-block{
            color:red;
        }`
    ]
})

export class ContactAdd implements OnDestroy{
    private _subscription = new Subscription();
    file: any;
    isFileUploaded = false;

    contact: Contact = {
        id:0,
        nom :'',
        prenom:'',
        adresse:'',
        telephone:'',
        photo : null
    };

    constructor( 
        private ctservice: ContactService,
        private route: Router ,
        private alertService :showAlertService){}

    saveContact(contact){
        if(this.file){
            /*
            console.log(this.file, " value sent");
            var contactId = +contact.id;
            this.ctservice.uploadFileToUrl(this.file, contactId);*/
            
            var contactId = +contact.id;
            contact.photo = this.file.name;
            this.uploadContactPhoto(contactId).then( (response) =>{
              
                if(response == true){
                    this._subscription.add(
                        this.ctservice.addContact(contact).subscribe(resp =>{
                            
                            console.log(resp, " add contact")
                            if(resp && resp["reponse"] == "OK"){
                                this.alertService.success("Contact enregistré avec success",true);
                               // this.route.navigate(['/contacts']);
                            }
                        })
                    );
                }else{
                    this.alertService.error("Contact non enregitré avec success");
                }
            });
        }
    }

    uploadContactPhoto(contactId){
        return new Promise( (resolve, reject ) =>{
            this.ctservice.uploadFileToUrl(this.file, contactId).subscribe(response=>{
                if(response && response["status"] =="success"){
                   this.isFileUploaded = true;
                   resolve(this.isFileUploaded);
                }
            });
        });
    }

    uploadf($event){
        this.file = $event.target.files[0];
    }

    ngOnDestroy(){
        this._subscription.unsubscribe();
    }
}