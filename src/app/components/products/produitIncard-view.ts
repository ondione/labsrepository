
import { Component, Input, Output, EventEmitter , ChangeDetectionStrategy }  from '@angular/core';

@Component({
    selector:'panier-list',
    template:`
        <div class="card bg-light  panier_class" style="width:100%; height:auto">
            <div class="card-header">
                <span style="margin-right:2px;"><b>Details Panier </b></span>
                <span style="width:20px;"></span>
                <span style="padding-top:5px;" *ngIf="panierList.length > 0" >
                    Produits
                    <button class="btn btn-danger btn-circle btn-circle-sm m-1 white">{{panierList.length}}</button>
                </span>
                <span style="float:right">
                    <span><i class="fa fa-shopping-cart fa-2x tan">&nbsp;</i>&nbsp;</span>
                    <span class="red"><b> {{ totalPanier | formatNumber:'CFA'}}  </b></span>
                </span>
            </div>
            <div class="card-body">
                <table class="table table-hover">
                    <thead class="thead-light">
                        <th class="center">Nom</th>
                        <th class="center">Libelle</th>
                        <th class="center">Nbre</th>
                        <th class="center">PU</th>
                        <th class="center">Total</th>
                        <th></th>
                    </thead>
                    <tbody>
                        <tr *ngFor="let pan of panierList">
                            <td class="left">{{ pan.nom }}</td>
                            <td class="left">{{ pan.libelle }}</td>
                            <td class="center">{{ pan.nbre}}</td>
                            <td class="right">{{ pan.PU | formatNumber:'CFA' }}</td>
                            <td class="right"><b>{{ 1 * pan.PU}}</b></td>
                            <td (click)="sendProductToRemove(pan)"><i class="fa fa-remove fa-1x red">&nbsp;</i></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>`,
    styleUrls:['../../../assets/styles.css'],
    changeDetection:ChangeDetectionStrategy.Default
})

export class PanierListView {
    @Input()  panierList;
    @Input()  totalPanier;
    @Output() removePanItem: EventEmitter<any> = new EventEmitter();
    sendProductToRemove(prod){
        return this.removePanItem.emit(prod);
    }
}