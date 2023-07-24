
import { Component, OnInit, ChangeDetectionStrategy}  from '@angular/core';
import { CommandeService }  from '../../services/commandes.service';


@Component({
    selector : 'app-root',
    template : `<ng-template [ngTemplateOutlet]="isloading === true ? template1 : template2 ">
            
        </ng-template>
        <ng-template #template1>
                <div class="form-group">
                    <div class="col-sm-4"></div>
                    <div class="col-sm-3 center_loader blue">
                        <img src= "assets/images/ajax-loader.gif" width="120" height="120" />
                    </div>
                    <div class="col-sm-4"></div>
                </div>
        </ng-template>
        <ng-template #template2>
    <div style="margin-top:25px;" class="col-sm-12 col-sm-offset-2">
    <table id="example" class="table table-responsive table-striped bordered" cellspacing="0" width="100%" style="float:left;">
        <thead>
            <tr [ngClass]="ent">
                <th>Nom</th>
                <th>Prenom</th>
                <th>Adresse</th>
                <th>Telephone</th>
                <th class="col-sm-5">Decription</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody *ngFor="let commande of commandes">
            <tr>
                <td>{{commande.nom_client}}</td>
                <td>{{commande.prenom_client}}</td>
                <td>{{commande.adresse_client }}</td>
                <td>{{commande.telephone_client}}</td>
                <td>{{commande.description_cmd}}</td>
                <td style="height:28px;" ng-class="actionbtn">
                    <a [routerLink] = "['/products/commande/',commande.id_cmd]"> 
                        <button class="btn btn-light btn-circle btn-circle-sm m-1">
                            <i class="fa fa-pencil-square-o fa-1x blue"> </i>
                        </button>
                    </a> 
                    &nbsp;&nbsp;
                    <a>
                        <button class="btn btn-light btn-circle btn-circle-sm m-1">
                            <i class="fa fa-trash fa-1x red"> </i>
                        </button>
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
    </div>
    </ng-template>`,
    styleUrls:['./commandes.css'],
    //changeDetection: ChangeDetectionStrategy.onPush
})

export class ListeCommandeComponent implements OnInit {
    commandes=[];
    isloading:boolean = false;

    constructor(private cmdService : CommandeService){}

    ngOnInit(){
        this.fetchAllCommandes();
    }

    fetchAllCommandes(){
        this.isloading = true;
        this.cmdService.getListCommandes().
        subscribe( commandes => {
            console.log( commandes, " commandes recu ");
           this.commandes = commandes;

           setTimeout( () =>{
                this.isloading = false;
               
            }, 3000);
        });
    }

    ngOnDestroy(){
       
    }

}