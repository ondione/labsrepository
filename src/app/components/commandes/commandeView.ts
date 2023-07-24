import { Component , Input , Output}  from '@angular/core';

@Component({
    selector : "commande-view",
    template: `<div class="panel panel-default panier_class">
    <div class="panel-heading">
        <span><b>Details Commandes </b></span>
    </div>
    
    <div class="panel-body ">
        <table id="example" class="table table-responsive table-striped bordered" cellspacing="0" width="100%" style="float:left;">
            <thead>
                <tr [ngClass]="ent">
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Adresse</th>
                    <th>Telephone</th>
                    <th class="col-sm-5">Decription</th>
                </tr>
            </thead>
            <tbody *ngFor="let commande of commandes">
                <tr>
                    <td>{{commande.nom_client}}</td>
                    <td>{{commande.prenom_client}}</td>
                    <td>{{commande.adresse_client }}</td>
                    <td>{{commande.telephone_client}}</td>
                    <td>{{commande.description_cmd}}</td>  
                </tr>
            </tbody>
        </table>
    </div>
    </div>
    `,
    styles:[]
})

export class CommandeView {
    @Input() commandes
}