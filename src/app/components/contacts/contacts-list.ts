import { 
        Component, 
        EventEmitter,
        Output,
        ViewChild,
        TemplateRef, 
        ChangeDetectionStrategy,
        ChangeDetectorRef,
        OnInit ,  OnDestroy, OnChanges, AfterViewInit , AfterViewChecked, AfterContentInit,AfterContentChecked, ElementRef,
        Pipe, PipeTransform ,ViewRef, Inject
    } from '@angular/core';
import { ContactService } from '../../services/contacts.services';
import { GroupService } from '../../services/groupe.services';
import { Router } from '@angular/router';
import { modalTemplate  }  from '../helpers/modal/modal_template';
import { NgbModal , NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable , Subscription } from 'rxjs';
import { ModalTemplateComponent } from '../../utilities/modal_template';
import { Contact } from '../../models/contact';
import { CustomerFilterContact } from '../../helper';
import { takeUntil, map } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import { State } from '../../store_managment/reducers/index';
import { listContactAction ,deleteContactAction, deleteContactsAction, getAllContactAction } from '../../store_managment/actions/contacts-action';
import { ImprimeContactListInPdfAction , ExportContactListInCsvAction, ResetPrintAction } from '../../store_managment/actions/printObject-action';
import { selectAllContacts , selectContactById  } from '../../store_managment/selectors/contacts-selector';
import { imprimeData, selectAll  } from '../../store_managment/selectors/printObject-selector';
import { PrintObject } from 'src/app/models/printObject';
import { selectUrls , selectedParams  } from '../../store_managment/selectors/appSetting-selector';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
   selector:"app-root",
   templateUrl :"./templates/contacts-list.html",
   styleUrls:['./templates/contacts-list.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ContactList implements OnInit{

    private _subscription = new Subscription();
    listContacts;
    cts;
   
    @ViewChild( 'content' , { read:"", static:false}) modalView : NgbModalRef ;
    @ViewChild( 'contentGroup' , { read:"", static:false}) modalViewGroup : NgbModalRef ;
  
    title: string = '';
    message ="";
    css_style ='success';
    isloading:boolean = true;
    groups;

    selectedGroup;
    selectedList = [];

    /* Pagination ***/
    page = 1;
    itemPerPage = 5;
    collectionsize = 0;
    maxsize = 2 ;
    pagesize = 5 ;

    isSearch:boolean = false;
    refresh = '';
    searchedCustomer :  Contact[]= [];
  
    constructor(private ctsservice : ContactService,private route: Router,
        private modalService: NgbModal,private changedetectorRef:ChangeDetectorRef,private groupService: GroupService,private el: ElementRef,
        private customerFilterContact: CustomerFilterContact,private store: Store<State>
    ){}

    ngOnInit(){
       this.getAllContacts();
       this.getGroups();
    }

    selected(id){
        if(this.selectedList.indexOf(id)==-1){
            this.selectedList.push(id);
        }
    }

    deleteSelected(){
        if(this.selectedList.length >0){
            this.deleteContacts(this.selectedList);
        }
    }

    pageChange(page:number){
        this.page = page;
        let start = (page-1) * this.itemPerPage ;
        let end = page * this.itemPerPage;
        this.cts = null;
       
        if(this.isSearch === true){
            this.cts = this.searchedCustomer.slice(start, end);
        }else{
            this.cts = this.listContacts.slice(start, end);
        }
        if (!(this.changedetectorRef as ViewRef).destroyed) {
            this.changedetectorRef.detectChanges();
        }
    }
   
    getGroups(){
        this.groupService.getListGroups().subscribe( resp=>{
            if(resp && resp["allgroup"] ){
                this.groups = resp["allgroup"];
            }
        })
    }

    getAllContacts(){
        this.isloading = true;
        this.store.dispatch( new getAllContactAction());  
        this.store.select(selectAllContacts).subscribe( resp =>{
            if(resp && resp!= null){
                this.listContacts = Object.values(resp);
                this.collectionsize =  this.listContacts.length;
                this.maxsize = ( this.collectionsize > 0 ) ? Math.ceil(this.collectionsize / this.itemPerPage) + 2 : 0 ;
                this.cts =  this.listContacts.slice(0, this.itemPerPage) ;
    
                setTimeout( () =>{
                    this.isloading = false;
                    if (!(this.changedetectorRef as ViewRef).destroyed) {
                        this.changedetectorRef.detectChanges();
                    }
                }, 3000); 
            }
        });
    }

    deleteContacts(ids){
        let options: NgbModalOptions = {
            size: 'sm'
        };
        this.title   ='Confirm Dialog Modal';
        this.message ="Voulez vous supprimer la selection";
        this.css_style ='success';
        this.modalService.open( this.modalView, options).result.then( (rc)=>{
            if(rc == 'confirm'){
                this._subscription.add(
                    this.store.dispatch(new deleteContactsAction({contactIds:ids}))
                );
                this.ngOnInit();
            }
        }); 
    }

    deleteOnContact(contact){

        let options: NgbModalOptions = {
            size: 'lg'
        };

        let id :number = contact.id;
        this.title   ='Confirm Dialog Modal';
        this.message ="Voulez vous supprimer l'\n enregistrement "+`${contact.id}`;
        this.css_style ='success';

        this.modalService.open( this.modalView, options).result.then( (rc)=>{

            if(rc == 'confirm'){
                this._subscription.add(
                    this.store.dispatch(new deleteContactAction({contact:contact})),
                );
                this.ngOnInit();
            }
        }); 
    }

    changeStatus(contact){
       contact.is_active =  ( contact.is_active =='OUI') ? contact.is_active ='NON' : ( ( contact.is_active =='NON') ? contact.is_active ='OUI':  contact.is_active ='NON'  );
       this.ctsservice.updateContact(contact).subscribe( result =>{
            if(result && result["status"] == "success" && result["reponse"] == "OK"){
                this.ngOnInit();
            }
        })
    }

    addToGroup( cts){

        let options: NgbModalOptions = {
            size: 'sm'
        };

       // let id :number = contact.id;
        this.title   ='Add Contact to Group';
        this.message ="Voulez vous supprimer l'\n enregistrement ";
        this.css_style ='success';
        var obj = {
            contactId:+cts.id,
            groupId: null
        };

        this.modalService.open( this.modalViewGroup, options).result.then( (rc)=>{
            if(rc == 'confirm'){
                obj.groupId = +this.selectedGroup;
              
                this._subscription.add(
                    this.ctsservice.contactToGroup(obj).subscribe(resp => {
                        if(resp && resp["reponse"] == "OK"){
                            console.log(resp, " contact supp");
                            this.ngOnInit();
                        }
                    })
                );
            }
        }); 
    }


    refreshSearch(){
        this.refresh = '';
        this.collectionsize = this.listContacts.length;
        this.maxsize = ( this.collectionsize > 0 ) ? Math.ceil(this.collectionsize / this.itemPerPage): 0 ;
        this.cts = this.listContacts.slice(0,this.itemPerPage);
    }

    searchContact(search:string){
        this.isSearch = true;
        let conts: Contact[] = this.listContacts;

        if(search && search!=""){
            this.searchedCustomer = <Contact[]> this.customerFilterContact.transform(conts , search);
            console.log(this.searchedCustomer , " this.searchedCustome ");
            this.collectionsize = this.searchedCustomer.length;
            this.maxsize = ( this.collectionsize > 0 ) ? Math.ceil((this.collectionsize / this.itemPerPage)) : 0 ;
            this.cts = this.searchedCustomer.slice(0, this.itemPerPage) ;

            if (!(this.changedetectorRef as ViewRef).destroyed) {
                this.changedetectorRef.detectChanges();
            }

        }else{
            this.collectionsize = this.listContacts.length;
            this.maxsize = ( this.collectionsize > 0 ) ? Math.ceil(this.collectionsize / this.itemPerPage): 0 ;
            this.cts = this.listContacts.slice(0,this.itemPerPage);
        }
    }

    imprimeListeContacts(){
        this.store.dispatch(new ResetPrintAction());
        this.store.dispatch(new ImprimeContactListInPdfAction());
        this.getDataToBePrint(1).subscribe( dataToPrint => { 
            if(dataToPrint && dataToPrint["type"] =="pdf"){
                var blobFile = dataToPrint["blobFile"];
                var filename = dataToPrint["filename"];
                this.openOrDownloadPDF(filename, blobFile); 
            }
        });
    }

    getDataToBePrint(id): Observable<PrintObject> {
        return this.store.select(selectAll(id));
    }

    openOrDownloadPDF(filename, blob){

        blob = blob+'\n';
        if (navigator.msSaveOrOpenBlob) {
            // IE specific download.
            navigator.msSaveOrOpenBlob(blob);
        } else {
            const downloadLink = document.createElement("a");
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
            downloadLink.setAttribute("href", blob);
            
            downloadLink.target = '_blank';
            downloadLink.setAttribute("download", filename);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    }

    exportListContactCsv(){
        this.store.dispatch(new ResetPrintAction());
        this.store.dispatch(new ExportContactListInCsvAction());
        this.getDataToBePrint(2).subscribe( dataToPrint => { 
          
            if(dataToPrint && dataToPrint["type"] =="csv"){
                var blobFile = dataToPrint["blobFile"];
                var filename = dataToPrint["filename"];
                this.openOrDownloadPDF(filename, blobFile);
            }
        });
    }

    ngOnDestroy(){
        this._subscription.unsubscribe();
        this.changedetectorRef.detach();
    }
}