import {  Component ,Input, Output, EventEmitter, ChangeDetectionStrategy }  from '@angular/core';

@Component({
    selector:'produit-list',
    template:`
        <div fxLayout.xs="column wrap" fxLayout="row wrap" fxLayoutGap="10px" ngClass.gt-xs="ml-10" *ngFor="let prod of products">
            <div class="form-row">
                <div class="col-sm-4" *ngFor="let prod of products">
                    <mat-card  fxFlex.sm="1 1 calc(50%-10px)" fxFlex.md="1 1 calc(33%-10px)" fxFlex.gt-md="1 1 calc(25%-10px)">
                        <mat-card-header class="mathead">
                            <div mat-card-avatar 
                                [ngClass]="getImgClass(prod.image)">
                            </div>
                            <mat-card-title fxFlex="40%" fxLayout.gt-xs="row" fxLayout.xs="column" class="blue bold">{{ prod.nom }}</mat-card-title>
                            <mat-card-subtitle  fxFlex="60%" class="black">{{ prod.libelle }}</mat-card-subtitle>
                        </mat-card-header>
                        <img mat-card-image [src]="prod.image"  width="100%">
                        <mat-card-content>
                            <p></p>
                        </mat-card-content>
                        <mat-card-actions>
                            <span fxFlex="30%" (click)="sendProduct(prod)">
                                <button class="btn btn-light btn-circle btn-circle-md m-1">
                                   <i class="fa fa-shopping-cart tan"></i>
                                </button>
                            </span>
                            <span fxFlex="70%" style="margin-top:10px;"> Prix: <b>{{ prod.PU | formatNumber:'CFA' }}</b></span>
                        </mat-card-actions>
                    </mat-card>
                    <span>&nbsp;</span>
                </div>
            </div>
        </div>`,
        styles:[`
            .mat-card-title{
               font-size:12px;
               font-weight:bold;
            }
            .mat-card-subtitle{
                font-size:12px;
            }
            mat-card-title span:first {
                width : 80%;
                color :red;
            }
            .star {
                font-size: 1.5rem;
                color: #b0c4de;
                }
                .filled {
                color: #1e90ff;
                }
                .bad {
                color: #deb0b0;
                }
                .filled.bad {
                color: #ff1e1e;
                }
                mat-card-title, mat-card-footer{
                font-size: 10px;
            }
            .example-card {
                max-width: 300px;
                font-size:11px;
            }

            .example-card .mathead{
                font-size:9px; 
            }
              
            .img1 {
                background-image: url('/assets/images/1.png');
                background-size: cover;
            }
            .img2 {
                background-image: url('/assets/images/2.png');
                background-size: cover;
            }
            .img3 {
                background-image: url('/assets/images/3.png');
                background-size: cover;
            }
            
            .img4 {
                background-image: url('/assets/images/4.png');
                background-size: cover;
            }
            .img5 {
                background-image: url('/assets/images/5.png');
                background-size: cover;
            }

            .green{
                color: green;
            }
            .blue{
                color: blue;
            }
            .red{
                color: red;
            }
            .orange{
                color:orange;
            }
            .bold{
                font-weight:bold;
            }
            .gray{
                color:gray,
            }
            .white{
                color:white;
            }
                    
.btn-circle {
    width: 45px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    padding: 0;
    border-radius: 50%;
}
  
.btn-circle i {
    position: relative;
    top: -1px;
}
  
.btn-circle-sm {
    width: 35px;
    height: 35px;
    line-height: 35px;
    font-size: 0.9rem;
}
  
.btn-circle-lg {
    width: 55px;
    height: 55px;
    line-height: 55px;
    font-size: 1.1rem;
}
  
.btn-circle-xl {
    width: 70px;
    height: 70px;
    line-height: 70px;
    font-size: 1.3rem;
}

.btn-circle-xs {
    width: 18px;
    height: 16px;
    line-height: 16px;
    font-size: 1.1rem;
}`
        ],
    changeDetection:ChangeDetectionStrategy.OnPush
})

export class ListProduitView {
    @Input() products = [];
    @Output() AddInCart:EventEmitter<any> = new EventEmitter();
    selected = 0;
    hovered  = 0;
    readonly = false;
    currentRate = 6;

    sendProduct(prod){
        this.AddInCart.emit(prod);
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
}