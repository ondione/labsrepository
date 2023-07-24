import {Component, OnInit ,Input ,Output, ChangeDetectionStrategy, EventEmitter} from '@angular/core';
import { AuthentificationService }  from './services/users.services';

@Component({
    selector:'header-view',
    template:`<nav  class="navbar navba navbar-expand-lg navbar-light bg-light" style="background-color: #e3f2fd;" *ngIf="isConnected">
    <a class="navbar-brand" [routerLink]="['/home']">App Shopping checkout</a>
    <button (click)="isCollapsed = !isCollapsed" [attr.aria-expanded]="!isCollapsed" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent" [ngbCollapse]="isCollapsed">
        <ul class="navbar-nav mr-auto" >
            <li class="nav-item active">
               <a class="nav-link" [routerLink]="['/home']">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
                <a class="nav-link" [routerLink]="['/contacts']">Clients <span class="sr-only"></span></a>
            </li>
            <li class="nav-item active">
               <a class="nav-link" [routerLink]="['/groupes']">Groupes <span class="sr-only"></span></a>
            </li>

            <li class="nav-item active">
                <a class="nav-link" [routerLink]="['/products']">Produits <span class="sr-only"></span></a>
            </li>

            <li class="nav-item active">
                <a class="nav-link" [routerLink]="['/listeFactures']">Facturation <span class="sr-only"></span></a>
            </li>

            <li class="nav-item active">
                <a class="nav-link" [routerLink]="['/commandes']">Liste Commandes <span class="sr-only"></span></a>
            </li>
        </ul>
    </div>

    <ul class="navbar-nav mr-auto">
        <li class="nav-item" ngbDropdown display="dynamic" placement="bottom-right">
            <a class="nav-link" style="cursor: pointer" ngbDropdownToggle id="navbarDropdown3" role="button">
                Parametrage
            </a>
            <div ngbDropdownMenu aria-labelledby="navbarDropdown3" class="dropdown-menu">
                <a class="nav-link red dropdown-item" [routerLink]="['/changepass']">Changer Mot de passe<span class="sr-only">(current)</span></a>
                <a class="nav-link red dropdown-item" (click)="logout.emit()">Deconnexion<span class="sr-only">(current)</span></a>
                 <a class="nav-link red dropdown-item" [routerLink]="['/settings']">App Settings<span class="sr-only">(current)</span></a>
            </div>
        </li>
    </ul>
  </nav>
  <div class="row" style="margin-bottom:60px;"> </div>
    <div class="form-row">
        <div class="form-group col-md-1"></div>
        <div class="form-group col-md-10">
           <alert></alert>
            <router-outlet></router-outlet>
        </div>
        <div class="form-group col-md-1"></div>
   </div>`,
  styles:[]
})

export class AppHeader{
    @Input() isConnected;
    @Input() permissions;
    @Output() logout : EventEmitter<any> = new EventEmitter();
    isCollapsed = true;
    @Input() displayHeaderInfo;
    @Input() isScreenLocked;
}
