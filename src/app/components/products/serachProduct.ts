import { Component,  Output, EventEmitter }  from '@angular/core';

@Component({
    selector:'product-search',
    template: `
    <div class="form-row">
        <div class="form-group col-md-2"></div>
        <div class="input-group col-md-6 mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" (click)="searchProduct.emit(search);">
                    <button class="btn btn-light btn-circle btn-circle-xs m-1"><i class="fa fa-search black"></i></button>
                </span>
            </div>
            <input type="text" name="search" [(ngModel)]="search" class="form-control" EmptyInput />
        </div>
        <div class="form-group col-md-4"></div>
    </div>`,
styleUrls:['../../../assets/styles.css'],
})

export class ProductSerachView{
    @Output() searchProduct:EventEmitter<any> = new EventEmitter();
   // @Input()  argument: Object;
}