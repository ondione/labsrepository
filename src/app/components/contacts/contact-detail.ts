import { Component, OnInit ,ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute , ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable ,Subscription} from 'rxjs';
import { ContactService } from '../../services/contacts.services';
import { Contact } from '../../models/contact';
import { FormControl, FormGroup , Validators, FormBuilder }  from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { State } from '../../store_managment/reducers/index';
import { updateContactAction } from '../../store_managment/actions/contacts-action';
import { selectAllContacts , selectContactById, updatedContactResponse  } from '../../store_managment/selectors/contacts-selector';
import { getSelectedContacId   } from '../../store_managment/reducers/contacts-reducer';
import { MatDialog, MatDialogRef , MatDialogConfig} from  '@angular/material';
import { customMatDialogComponent }  from '../../modal/customMatDialog';



const INITIALIZE_CONTACT : Contact = {

    id:0,
	nom:'',
	prenom:'',
	adresse:'',
	telephone:'',
    photo:'',
    is_active:"OUI"
}

@Component({
    selector:"app-root",
    templateUrl:'./templates/contact-detail.html',
    styleUrls:['../../../assets/styles.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ContactDetail implements OnInit{

    selectedContact$ : Observable<Contact>;
    private _subscription = new Subscription();
    idContact:number;
    tobeUpdatedcontact = INITIALIZE_CONTACT;
    groupList;
    options = { data: {}, disableClose: Boolean , autoFocus: Boolean};

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
        private activRoute: ActivatedRoute, 
        private changedetectorRef:ChangeDetectorRef,
        private route:Router,
        private store: Store<State>,
        private  dialog:  MatDialog){}
       

    ngOnInit(){

        if(this.activRoute.params){

            this._subscription.add(
                this.activRoute.paramMap.subscribe(paramMap => { 
                    this.idContact = +paramMap.get('id'); // (+) converts string 'id' to a number
                    this.getContact(this.idContact);
                    this.getContactGroupList(this.idContact);
                })
            );
        }
    }

    getContactGroupList(contactId){

        this.ctservice.listecontacttogroup(contactId).subscribe(resp =>{
            if(resp){
                this.groupList = resp["contactGroup"];
                this.changedetectorRef.detectChanges();
            }
        })
    }

    getContact(id: number){
       
        this._subscription.add(
            
            this.ctservice.getContactById(this.idContact).subscribe( resp =>{
                if(resp){
                    resp.map((obj) =>{
                        if(obj.hasOwnProperty("selected")){
                            this.tobeUpdatedcontact = obj.selected[0];
                        }
                        if(obj.hasOwnProperty("contactGroup")){
                            this.groupList = obj.contactGroup;
                    
                        }
                    })
                    this.changedetectorRef.detectChanges();
                } 
            })
        );
    }

    Updatecontact(cont){

        const contact =  cont.value;
  
        contact.is_active  = ( contact.is_active  &&  ( contact.is_active == "true" || contact.is_active == '1')) ? "OUI": "NON";
        this.store.dispatch( new updateContactAction({contact}));
        this._subscription.add(
            this.store.pipe( select( updatedContactResponse()))
            .subscribe( result  =>{
            
                if(result!=null && !result.hasOwnProperty("error") && result.reponse =="OK"){
                    this.options.data = {
                        id: 1,
                        title: 'Mise à jour Contact',
                        content: 'Contact mise à jour avec success',
                        class:"green"
                    };
                }else{
                    this.options.data = {
                        id: 1,
                        title: 'Mise à jour Contact',
                        content: 'Echec mise à jour Contact ',
                        class:"red"
                    };
                }

                this.openDialog(this.options);
                //this.route.navigate(['/contacts']);
            })
            /*this.ctservice.updateContact(contact).subscribe( result =>{
                if(result && result["status"] == "success" && result["reponse"] == "OK"){
                    this.route.navigate(['/contacts']);
                }
            })*/
        );
    }

    ngOnDestroy(){
        this._subscription.unsubscribe();
    }
    openDialog(options) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = options.disableClose;
        dialogConfig.autoFocus = options.autoFocus;
        dialogConfig.data = options.data;
        this.dialog.open(customMatDialogComponent, dialogConfig);
    }
}