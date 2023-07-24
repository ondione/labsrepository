import { Component, Input, ChangeDetectionStrategy }  from '@angular/core'

@Component({
    selector: 'total-panier',
    template:`<div  *ngIf="totalPanier" class="form-row totalShop">
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-md-auto">
                    <span *ngIf="objectIspayment && objectIspayment.ispaid" class="ispaidStyle">Payé par</span>
                </div>
                <div class="col col-lg-4">
                    <span *ngIf="objectIspayment && objectIspayment.ispaid" class="{{objectIspayment.style}} ispaidStyle"> 
                        <input type="image" name="submit" src="../../../assets/images/{{objectIspayment.icon}}" width="40" height="40" style="border-radius: 10px; -moz-border-radius: 10px; -khtml-border-radius: 10px; -webkit-border-radius: 10px;" alt="Payer">
                    </span>
                </div>
                <div class="col col-lg-2"><b>Total:</b></div>
                <div class="col col-lg-3"><b>{{ totalPanier | formatNumber:'CFA'}}</b></div>
            </div>
        </div>
    </div>`,

    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TotalPanierView {
    @Input() totalPanier: number;
    @Input() objectIspayment;
}