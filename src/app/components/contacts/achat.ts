import { Component, ElementRef ,ViewChild, ChangeDetectorRef }  from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServices }  from '../../services/products.service';
import { sharedService } from '../../services/shared.service';

import { select, Store} from '@ngrx/store';

import { State } from '../../store_managment/reducers/index';
import { listContactAction} from '../../store_managment/actions/contacts-action';
import { selectContactById }  from '../../store_managment/selectors/contacts-selector';

@Component({
    selector:'my-app',
    templateUrl:'./achat.html',
    styleUrls:['../../../assets/styles.css'],
    providers:[ProductServices]
})

export class AchatClient{

    parentRouteId: number;
    private sub: any;
    histAchat;
    page = 1;
    itemPerPage = 5;
    collectionsize = 0;
    maxsize = 0 ;
    pagesize = 10 ;
    histPurchase;
    currentContact;

    @ViewChild('content', {read: null, static:false}) elemRef : ElementRef;
  
    constructor(
        private route: ActivatedRoute,
        private productService: ProductServices,
        private shareserv: sharedService,
        private store: Store<State>,
        private changedetect: ChangeDetectorRef
    ) {}
  
    ngOnInit() {
        //Get parent ActivatedRoute of this route.
        this.sub = this.route.parent.params.subscribe(params => {
           this.parentRouteId = +params['id'];
        });
        this.historiqueAchat(this.parentRouteId);
        this.store.pipe(select(selectContactById(this.parentRouteId))).subscribe(c => {
            this.currentContact =  c;
        });
    }

    historiqueAchat(id){
        this.productService.historiqueAchat(id).subscribe(resp =>{
            if(resp){
                let response = resp;
                this.histAchat = response;

                console.log(response , " response acha s");
                this.collectionsize = this.histAchat.length;
                this.maxsize = ( this.collectionsize > 0 ) ? Math.ceil(this.collectionsize / this.itemPerPage) + 2 : 0 ;
                this.histPurchase = response.slice(0,this.itemPerPage) ;
                this.changedetect.detectChanges();
            }
        });
    }

    pageChange(page:number){
        this.page = page;
        let start = (page-1) * this.itemPerPage ;
        let end = page * this.itemPerPage;
        this.histPurchase = null;
        this.histPurchase = this.histAchat.slice(start, end);
    }
    print(){

        let date = new Date();
        let filename=`${'payment-'+date.getFullYear()+'-'+date.getMonth()+'-'+date.getDay()+'-'+date.getHours()+'-'+date.getMinutes()+'-'+date.getSeconds() }`;
        let params = this.histAchat;
        let contact = this.currentContact;
        let type = "report";

        return this.productService.printpdfReceipe({ params, contact, type}).subscribe(data => {
            if( data["message"] === "Pdf successfully generated" && data["status"] === "OK") {
                let blob = data["blobFile"];
                this.shareserv.generatePDF(filename,blob);
            }
        })
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }
}
