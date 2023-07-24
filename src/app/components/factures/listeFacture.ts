
import {Component, OnInit, ChangeDetectionStrategy , ChangeDetectorRef , ViewRef}  from '@angular/core';
import { FactureService } from '../../services/facture.service';
import * as _ from 'underscore';

@Component({
    selector : 'app-root',
    templateUrl : `./listeFacture.html`,
    styleUrls:['./facture.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListeFacture implements OnInit {
    listefactures;
    isloading:boolean = true;

    /* Pagination ***/
    page = 1;
    itemPerPage = 5;
    collectionsize = 0;
    maxsize = 2 ;
    pagesize = 5 ;

    factures=[];

    constructor(private factureServ : FactureService, private changedetectorRef:ChangeDetectorRef){}
    ngOnInit(){
        this.fetchAllFactures();
    }
    fetchAllFactures(){
        this.isloading = true;
        this.factureServ.getListFacture().
        subscribe( listefactures => {
           
            this.listefactures = this.formatFactureData(listefactures["listeFacture"]);
            console.log( this.listefactures, " liste factures recu ");

          
            this.collectionsize =  this.listefactures.length;
            this.maxsize = ( this.collectionsize > 0 ) ? Math.ceil(this.collectionsize / this.itemPerPage) + 2 : 0 ;
            this.factures =  this.listefactures.slice(0, this.itemPerPage) ;

            setTimeout( () =>{
                this.isloading = false;
                if (!(this.changedetectorRef as ViewRef).destroyed) {
                    this.changedetectorRef.detectChanges();
                }
            }, 3000);
        });
    }

    formatFactureData(data){
        
        _.each(data , function(element){
            let total1 = 0;
            let invoiceData = JSON.parse(element.facture_data);
            _.each(invoiceData , function(elmt){
                let pu = elmt.PU;
                let nbre = elmt.nbre;
                total1 = total1 + ( pu * nbre);
            });
            element.total = total1;
        });
        return data;
    }

    ngOnDestroy(){
        this.changedetectorRef.detach();
    }
}