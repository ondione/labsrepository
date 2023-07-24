
import { Component, OnInit,ViewChild , ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup , FormControl, Validators} from  '@angular/forms';
import { Facture } from '../../models/facture';
import { Router }  from '@angular/router';
import { NgbModal , NgbModalRef,  NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FactureService } from '../../services/facture.service';
import { ProductServices } from '../../services/products.service';
import * as _ from 'underscore';
import { Store, select } from '@ngrx/store';
import { State } from '../../store_managment/reducers/index';
import { selectedParams  } from '../../store_managment/selectors/appSetting-selector';

@Component({
  selector: 'app-root',
  templateUrl: './factureComponent.html',
  styleUrls: ['./factureComponent.css']
})
export class FactureComponent implements OnInit {

  facture : Facture = {
    id_fact:null,
    id_client:'',
    num_fact:'',
    facture_data:null,
    clientData:null,
    date_enreg:''
  };

  registerForm: FormGroup;

  @ViewChild( 'content' , { read:"", static:false}) modalView : NgbModalRef ;
  products;
  title;
  selectedArticles$ = [];
  tobeDisplayed$ = [];
  typeClient;
  totalAchat$ = 0;
  tauxTva;
  montantTva$ = 0;

  constructor(
    private factureServ : FactureService,
    private prodservice : ProductServices,
    private route: Router,
    private modalService: NgbModal,
    private changedetect : ChangeDetectorRef,
    private store: Store<State>

  ) { }

  ngOnInit() {
    this.getProducts();

    this.typeClient = [
        { value: "Individuel", libelle:"Client Individuel"},
        { value: "Entreprise", libelle:"Client Entreprise"},
        { value: "Grossiste", libelle:"Client Grossiste"},
        { value: "Detaillant", libelle:"Client DetaillantS"},
      ];

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

      this.store.select(selectedParams).subscribe( settingsParams  =>{
        this.tauxTva = settingsParams["taux_tva"] || 0;
      });
  }

  getProducts(){
    this.prodservice.getAllProducts().subscribe( produits => {
      this.products =  produits;
    });
  }

  SelectArticles(){
    let options: NgbModalOptions = {
        size: 'lg'
    };

    this.title   = 'Selectionner Produit';
    this.modalService.open( this.modalView, options).result.then( (rc)=>{
      console.log(rc, " rc ")
      if(rc == 'confirm'){

      }
    }); 
  }

  addInSelection(prod){
    prod.nbre = 1;
    this.selectedArticles$.push(prod);
    this.tobeDisplayed$ = this.formatSelected();
    this.changedetect.detectChanges();
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

  getImgClass(img){
    switch(img){
      case '/assets/images/1.png':
      return { 'img1': true };
      case '/assets/images/2.png':
      return { 'img2': true };
      case '/assets/images/3.png':
      return { 'img3': true };
      case '/assets/images/4.png':
      return { 'img4': true };
      case '/assets/images/5.png':
      return { 'img5': true };
    }
  }

  formatSelected(){
    var elements =  this.selectedArticles$, refs = _.uniq(_.pluck(elements , "ref")),newTab =  [];
    _.each(refs , (ref) =>{
      var tb = _.where(elements , { ref });
      let prod = tb[0]; prod["nbre"] = tb.length;
      newTab.push(prod);
    });
    return _.uniq(newTab);
  }

  saveInvoice(form){
    let invoceData = { 
      id_fact:0,
      id_client:'',
      num_fact:"",
      date_enreg:null,
      clientData: form.value,
      facture_data: this.selectedArticles$
    };
    console.log(invoceData , " invoceData" )
    this.factureServ.addFacture(invoceData).subscribe( response =>{
      if( response && response["status"] == "success" ){
        this.route.navigateByUrl("/listeFactures");
      }
    });
  }
}
