import { Component, Input , Output, EventEmitter, ChangeDetectionStrategy }  from '@angular/core';

@Component({
    selector :'validate-shopping',
    template :`<div *ngIf="panier" class="form-row validateShop">
        <table class="table table-hover">
            <tr *ngIf="panier">
                <td>
                    <b>Continuer:</b>
                    <span (click)="continueProcess.emit(true)">
                        <button class="btn btn-light btn-circle btn-circle-md m-1">
                        <i class="fa fa-check green"></i>
                        </button>
                    </span>
                </td>
                <td style="padding-right:0px;"> &nbsp;</td>
                <td>
                    <b>Annuler</b> 
                    <span (click)="discardProcess.emit()">
                        <button class="btn btn-light btn-circle btn-circle-md m-1">
                        <i class="fa fa-recycle red"></i>
                        </button>
                    </span>
                </td>
            </tr>
        </table>
    </div>` ,
    styleUrls:['../../../assets/styles.css'],
    changeDetection : ChangeDetectionStrategy.OnPush
})

export class ValidateShoppingView {
   @Output() continueProcess : EventEmitter<any> = new EventEmitter();
   @Output() discardProcess : EventEmitter<any> = new EventEmitter();
   @Input()  panier;

}