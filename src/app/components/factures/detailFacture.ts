
import { Component, OnInit,ViewChild , ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup , FormControl,Validators} from  '@angular/forms';
import { Facture } from '../../models/facture';
import { Router , ActivatedRoute , ActivatedRouteSnapshot  }  from '@angular/router';
import { NgbModal , NgbModalRef,  NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FactureService } from '../../services/facture.service';
import * as _ from 'underscore';
import { Store, select } from '@ngrx/store';
import { State } from '../../store_managment/reducers/index';
import { selectedParams  } from '../../store_managment/selectors/appSetting-selector';
import { Observable , Subscription} from 'rxjs';
import { SecurityService } from '../../services/securityService';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './detailFacture.html',
  styleUrls: []
})
export class DetailFactureComponent implements OnInit {

    private _subscription = new Subscription();
    idFacture;
    detailFacture;
    tobeDisplayed$;
    facture : Facture = {
        id_fact:null,
        id_client:'',
        num_fact:'',
        facture_data:null,
        clientData:null,
        date_enreg:''
    };
    registerForm: FormGroup;
    tauxTva;
    montantTva$;
    typeClient;
    safeValue: SafeHtml;

    constructor(
        private factureServ : FactureService,
        private route: Router,
        private modalService: NgbModal,
        private changedetect : ChangeDetectorRef,
        private store: Store<State>,
        private activRoute: ActivatedRoute,
        private secure: SecurityService
    ) { 
        this.safeValue = this.secure.getSafeHtml('Template <script>alert("0wned")</script> <b>Prevent cross-site scripting </b>');
    }

    ngOnInit() {

        this.registerForm = new FormGroup({
            $id: new FormControl(null),
            prenom: new FormControl('',[Validators.required]),
            nom: new FormControl('', [Validators.required]),
            email: new FormControl('', [ Validators.required,  Validators.maxLength(25)]),
            telephone: new FormControl('',[Validators.required]),
            adresse: new FormControl('',[Validators.required]),
            type: new FormControl('',[Validators.required]),
            tva: new FormControl('',null),
            ninea: new FormControl('',null)
        });

        if(this.activRoute.params){
            this._subscription.add(
                this.activRoute.paramMap.subscribe(paramMap => { 
                    this.idFacture = +paramMap.get('id'); // (+) converts string 'id' to a number
                    this.getDetailFacture(this.idFacture);
                })
            );
        }

        this.typeClient = [
            { value: "Individuel", libelle:"Client Individuel"},
            { value: "Entreprise", libelle:"Client Entreprise"},
            { value: "Grossiste", libelle:"Client Grossiste"},
            { value: "Detaillant", libelle:"Client DetaillantS"},
        ];

       

        this.store.select(selectedParams).subscribe( settingsParams  =>{
            this.tauxTva = settingsParams["taux_tva"] || 0;
        });
    }

    getDetailFacture(idFacture){
        this.factureServ.getFactureById(idFacture).subscribe(resp =>{
            if(resp){
                console.log(resp , " detail fature");
    
                this.detailFacture = resp["detailFacture"][0];
                this.tobeDisplayed$ = JSON.parse(this.detailFacture.facture_data);

                console.log(this.tobeDisplayed$ , " this.tobeDisplayed$")

                this.registerForm.patchValue({
                    $id: this.detailFacture.id,
                    prenom:this.detailFacture.prenom,
                    nom:this.detailFacture.nom,
                    email:this.detailFacture.email,
                    telephone:this.detailFacture.telephone,
                    adresse:this.detailFacture.adresse,
                    type: this.detailFacture.typeClient,
                    tva: this.detailFacture.tauxTva,
                    ninea: this.detailFacture.ninea
                });
            }
        })
    }

    calculTotalAchat(){
        return _.reduce(this.tobeDisplayed$, function(memo, obj){ 
          return memo + obj["nbre"] * obj["PU"]; 
        }, 0);
    }
    
    calculMontantTva(){  
        var mnt = 0, mntTva = 0;
        _.each(this.tobeDisplayed$,function(element){
          mnt = mnt + (element["nbre"] * element["PU"]);
        });
        if(this.tauxTva > 0){
          mntTva =  ( mnt * this.tauxTva ) / 100;
        }
        this.montantTva$ = mntTva;
        return mntTva;
    }
    
    calculMontantTotalTTC(){
        var mntTVA = this.calculMontantTva(), mntHT = this.calculTotalAchat(), mntTTC = 0;
        if(mntHT > 0){
          mntTTC = mntHT + mntTVA;
        }
        return  mntTTC;
    }

    ngOnDestroy(){
        this._subscription.unsubscribe();
    }
}
