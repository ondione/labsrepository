import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy }  from '@angular/core';

@Component({

    selector: 'payment-button',
    template:`<div style="border-top:1px solid #ccc; margin:8px;" *ngIf="checkout">
    <table>
        <tr *ngIf="Panier && Panier.length!=0">
            <td class="icon_style"  (click)="showModal.emit({panier:Panier,op:'Cash'})" >
                <input type="image" name="submit" src="../../../assets/images/cash.png" width="50" height="50" style="border-radius: 10px; -moz-border-radius: 10px; -khtml-border-radius: 10px; -webkit-border-radius: 10px;" alt="Payer">
            </td>
            <td class="icon_style" style="margin:5px;height:25px;" (click)="showModal.emit({panier:Panier,op:'OM'})">
                <input type="image" name="submit" src="../../../assets/images/OM.jpg" width="50" height="50" style="border-radius: 10px; -moz-border-radius: 10px; -khtml-border-radius: 10px; -webkit-border-radius: 10px;" alt="Payer">
            </td>
            <td class="icon_style" style="margin:5px;height:25px;display:block;" (click)="showModal.emit({panier:Panier,op:'Tigo Cash'})">
                <input type="image" name="submit" src="../../../assets/images/tigoch.jpg" width="50" height="50" style="border-radius: 10px; -moz-border-radius: 10px; -khtml-border-radius: 10px; -webkit-border-radius: 10px;" alt="Payer">
            </td>
            <td class="right" style="padding-right:0px;">

            </td>
        </tr>
    </table>
</div>
<modal-view></modal-view>`,
changeDetection:ChangeDetectionStrategy.OnPush
})

export class PaymentButtonView {
    @Input()  Panier;
    @Input()  checkout;
    @Output() showModal:EventEmitter<any> = new EventEmitter();
}