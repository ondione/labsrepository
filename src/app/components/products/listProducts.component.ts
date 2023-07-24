import {  
    Component, 
    OnInit, 
    Renderer2,
    ElementRef ,
    Directive, 
    AfterViewInit, 
    ChangeDetectorRef ,
    ChangeDetectionStrategy
} from '@angular/core';

import { ActivatedRoute , ActivatedRouteSnapshot, Router } from '@angular/router';
import { ConfirmService } from '../../modal/testModal';
import * as _ from 'underscore';
import { ProductServices } from '../../services/products.service'; 
import { ContactService } from '../../services/contacts.services'; 

import { IPanierItem } from '../../models/PanierItem';
import { Produits } from '../../models/produits';
import { Contact } from '../../models/contact';
import { Commande } from '../../models/commandes';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { select, Store} from '@ngrx/store';
import { State } from '../../store_managment/reducers/index';

import { ListProductAction } from '../../store_managment/actions/products-action';
import { 
    RemoveInShoppingAction, 
    AddManyInShoppingAction, 
    AddInShoppingAction, 
    UpdateShoppingAction , 
    EmptyShoppingAction
}  from '../../store_managment/actions/panier-action';
import { searchProduct , selectAllProducts}  from '../../store_managment/selectors/products.selectors';
import { selectAllPanier, selectPanierItem } from '../../store_managment/selectors/paniers.selectors';
import { CommandeService } from '../../services/commandes.service';
import { FormatStringToNumber }  from '../../helper';

@Directive({
    selector: '[listdropdown]'
  })
  export class ListDropdownDirective implements OnInit {
    constructor( private renderer: Renderer2, 
        private el: ElementRef) {}
    ngOnInit() {
        this.renderer.addClass(this.el.nativeElement, 'wild');
    }
}

@Component({
    selector: 'app-root',
    templateUrl:'./template/listProducts.component.html',
    styleUrls:['./styles/listProducts.component.css' ],
    providers:[ProductServices, ContactService, ConfirmService ,FormatStringToNumber],
    changeDetection:ChangeDetectionStrategy.OnPush
})

export class ListeProductComponent implements OnInit, AfterViewInit {
    products$;
    pan_en_cours$;
    newTab;
    totalAchat$: number;
    emptyStore;
    auth;
    modalOptions;
    currentRate = 0;
    search_val='Saisir le libelle de la recherche';
    liste_option = '';
    catsl= '';
    checkout:boolean = false;
    ispanier:boolean = false;
    paymentObject = { 
        style:'', 
        op:'', 
        ispaid:'',
        icon:'' 
    };
    contacts;
    paymentCleaner = new Subject<string>();
    allproduct;

    categorie_list = [ 
        { value:'Alimentaire'},
        { value:'Informatique'}, 
        { value:'Electromenager'}, 
        { value:'Habillement'}, 
        { value:'Immobilier'}, 
        { value:'Education'}
    ];
    panier;
    id: number;
    commandes:any;
    constructor(
        private modalService: ConfirmService,
        private produitService: ProductServices,
        private el: ElementRef,
        private render : Renderer2,
        private changedetectref: ChangeDetectorRef,
        private contactService :ContactService,
        private store: Store<State>,
        private route: ActivatedRoute,
        private rte: Router,
        private commandeService : CommandeService
    ) { }

    ngOnInit() {
        this.fetchAllProduct(); 

        let pn = this.selectPanierFromStore();
        if(pn && pn!=null){
            this.getCurrenTPanier();
        }
        this.checkcardPanier();
        this.paymentObject = { 
            style:'', 
            op:'', 
            ispaid:'',
            icon:'' 
        };

        if(this.route.params){
            this.route.paramMap.subscribe(paramMap => { 
               
                let currentPath = this.route["_routerState"].snapshot.url.toString();
                let regexp = new RegExp('/commande/', 'g');
            
                if(currentPath.match(regexp) != null){
                    this.id = +paramMap.get('id');
                   
                    this.commandeService.getCommandeById(this.id).subscribe( cmd => { 
                          this.commandes = cmd;
                    });
                }
            });
        }


        this.paymentCleaner.next('OK');
        this.contactService.getListContacts().subscribe( resp => {
            if(resp && resp.hasOwnProperty("status") && resp["status"]=="success"){
                this.contacts = resp["allcontact"];
            }
        });

        
    }

    ngAfterViewInit(){
        //this.generateList();
        this.changedetectref.detectChanges();
    }

    cantcontinue(bool:boolean){
       this.checkout = bool;
    }

    cantdiscard(){
        this.ispanier = false;
        this.checkout = false;
    }

    getObjectPay(obj){

        this.paymentObject = obj;
        if(obj.ispaid == "true"){
            this.ispanier = false;
            this.checkout = false;
        }
        let timerbounce = 0;

        this.paymentCleaner.subscribe( (mess) => {
            if(mess=='OK'){
                timerbounce = 8000;
            }
        });   
 
        this.paymentCleaner.pipe( debounceTime(timerbounce)).subscribe(() => {
            
        });
    }

    SelectedCat(cat){
        this.catsl = cat;
    }

    searchProduct(element){
        let categorie = this.catsl.toString();
        let search = element;
  
        this.store.pipe(select(selectAllProducts)).subscribe( recu =>{
            let allProduct = Object.values(recu);
            this.products$ = _.filter(allProduct , function(prod){
                categorie = categorie.toLowerCase();
                search = search.toLowerCase();
                if(categorie && search ){
                    return  prod.categorie.toLowerCase() == categorie && prod.libelle.toLowerCase().includes(search)
                }else if(categorie && !search){
                    return  prod.categorie.toLowerCase() == categorie
                }else if(search && !categorie){
                    return prod.libelle.toLowerCase().includes(search)
                } else{
                    return [];
                }
            })
        }); 

    }

    generateList(selected? :string){

        if(selected){
        }else{
        }
        const ul = this.render.createElement('ul');
        this.render.setAttribute(ul, 'dropdownMenu','');
        this.render.addClass(ul, 'dropdown-menu');
        this.render.addClass(ul, 'inline');
        this.render.setAttribute(ul, 'aria-labelledby','simple-dropdown');
        this.render.setAttribute(ul, 'role','menu');
        //var taille =  this.categorie_list.length;

        this.categorie_list.forEach((elm) => {
          
            const li = this.render.createElement('li');
            //this.render.setProperty(li, '(click)','SelectedCat('+`${elm.value}`+')');
            this.render.listen(li, 'click', this.SelectedCat);
            let text = this.render.createText(`${elm.value}`);
            this.render.appendChild(li, text);
            //this.render.appendChild(li, this.render.createText('\n'));
            this.render.appendChild(ul, li);
            const sepli = this.render.createElement('li');
            this.render.addClass(sepli, 'divider');
            this.render.appendChild(ul, sepli);
        });
        let selector = this.el.nativeElement.querySelector('#liste_option1');
        //this.render.appendChild(selector, ul);
        this.render.setStyle( selector,'z-index','1000');
    }

    fetchAllProduct(){
        this.produitService.getAllProducts().
        subscribe( produits => {
           this.products$ =  produits;
           this.allproduct =  produits;
           this.store.dispatch(new ListProductAction({products: this.allproduct}));
           this.changedetectref.detectChanges();
       });
    }
    getCurrenTPanier(){
        let panier = this.selectPanierFromStore();
        if(panier && panier.length > 0 ){
            this.newTab = [panier];
           console.log(panier, " panier en cours");
            panier = JSON.parse(panier);
            this.store.dispatch(new AddManyInShoppingAction({panier:this.cleanData(panier)}))
        }
    }

    addInCart1(product){
        this.store.dispatch(new AddInShoppingAction({panier:<IPanierItem>product}));
        let curselectedItem =  [this.selectPanierFromStore()];
        if(curselectedItem && curselectedItem!= null ){
            let objP =  curselectedItem;
            this.newTab = objP;
            this.newTab.push(product);
        
            this.replacePanierSTore(this.newTab);
        }else{
        
            this.replacePanierSTore([product]);
        }
        this.checkcardPanier();
    }

    checkcardPanier(){
       
        this.store.pipe(select(selectAllPanier)).subscribe( toadd =>{
            this.newTab = this.cleanData(toadd);
            this.replacePanierSTore(toadd);
            this.totalAchat$ = this.calculAchat(<IPanierItem[]>this.newTab);
            if(this.newTab.length > 0){
                this.ispanier = true;
            }
        });
    }

    cleanData(tab){
        if (Array.isArray(tab)) {
            return tab;
        }else{
            return Object.values(tab);
        }
    }

    ajoutPanier(prod: Object) {
        this.pan_en_cours$.push(prod);
        let curTab = _.uniq(this.pan_en_cours$);
        let disPan = _.countBy(this.pan_en_cours$, 'nom');
        prod['nbre'] = 1;
        let temptab = (this.newTab!= null && this.newTab.length > 0) ? this.newTab : [prod];
        let formated = this.formatPanData(temptab, prod, disPan, curTab);
        return formated;
    }

    curPanier() {
        let tab;
        this.store.pipe(select(selectAllPanier)).subscribe( toadd =>{
          tab = toadd;
        });
       return tab;
    }

    calculAchat(tab: IPanierItem[]) {
        let total = 0;
        _.each(tab, function(element) {
            total = total + parseFloat(element['PU']) * parseFloat('1');
        });
        return total;
    }

    removeInCard(product:any) {
        if(product && product != null){
            let ref = product.ref;
            let id  = product.id;
            this.store.dispatch( new RemoveInShoppingAction({id}));
            let tab = this.curPanier();
            _.each(tab, function(element, index) {
                if (element.ref == ref) {
                    tab.splice(index, 1);
                    return;
                }
            });

            this.replacePanierSTore(tab);
            this.newTab =  this.cleanData(tab);
            this.totalAchat$ = this.calculAchat(<IPanierItem[]>this.newTab);
            this.checkcardPanier();
        }
    }

    formatPanData(temptab: Object[], prod: Object, disPan: any, curTab: Object[]) {
        let tab: Object[] = [];
        let toadd: Object[] = [];

        if (temptab.length > 0) {
            let occ = 0;
            _.each(temptab, function(t) {
                if (t['ref'] === prod['ref']) {
                    t['nbre'] = t['nbre'] + 1;
                    occ++;
                }
            });
            if (occ === 0) {
                prod['nbre'] = 1;
                temptab.push(prod);
            }
            toadd = temptab;
        } else {
            _.each(disPan, function(value, index) {
                _.each(curTab, function(element) {
                    if (element['nom'] === index) {
                        element['nbre'] = value;
                        tab.push(element);
                    }
                });
            });
            toadd = tab;
        }
        this.newTab = toadd;
        this.totalAchat$ = this.calculAchat(<IPanierItem[]>toadd);
        return toadd;
    }
  

    show(event:any) {
       
        let Tab = event.panier;
        let idOp = event.op;
        this.totalAchat$ = this.calculAchat(Tab);
        let options = {
            message: 'Payment Facture',
            title: 'Payment par ' + idOp,
            contenu: this.totalAchat$,
            style: this.getOpIcon(idOp),
            params: Tab,
            ispaid: false,
            isPayable:false,
            contacts:this.contacts,
            contact: null,
            provider: idOp,
            payAmount:this.totalAchat$,
            canCheckBalance: (idOp!="Cash") ? true : false
        };

        console.log(options , " option recu 1")
        this.modalService.confirm(options).then((rst) => {
            console.log(options , " option recu 2")
            if(rst == "confirmed"){
                let obj ={
                    style :options.style.color,
                    op :idOp,
                    ispaid : 'true',
                    icon : options.style.img
                }
                this.getObjectPay(obj);
                this.store.dispatch(new EmptyShoppingAction());
            }else if(rst == "rejected"){
                let obj ={
                    style :options.style.color,
                    op :idOp,
                    ispaid : 'false',
                    icon : options.style.img
                }
                this.getObjectPay(obj);
            }
        });  
    }

    getOpIcon(idOp: string) {
        switch (idOp) {
            case 'Cash':
                return { color: 'green', img: 'cash.png', btn: 'success' };
            case 'OM':
                return { color: 'orange', img: 'OM.jpg', btn: 'warning' };
            case 'Tigo Cash':
                return { color: 'blue', img: 'tigoch.jpg', btn: 'primary' };
        }
    }

    selectPanierFromStore(){
        let tab;
        this.store.pipe(select(selectAllPanier)).subscribe( toadd =>{
            tab = toadd;
        });
        return tab;
    }
    replacePanierSTore(panier){
       this.store.dispatch(new UpdateShoppingAction({panier: panier}));
    }
}
