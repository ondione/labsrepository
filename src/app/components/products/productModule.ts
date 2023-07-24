import { NgModule, CUSTOM_ELEMENTS_SCHEMA}  from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule }  from '@angular/forms';
import { ModalModule } from '../../modal/modalModule';

import { PanierListView }  from './produitIncard-view';
import { TotalPanierView }  from './totalInCart-view';

import { ListeProductComponent }  from './listProducts.component';
import { ListProduitView }  from './listProduit-view';
import { PaymentButtonView }  from './paymentView';
import { modalView }  from '../../modalView';
import { ProductSerachView }  from './serachProduct';
import { ValidateShoppingView }  from './ValidateShoppingView';
import { CommandeView }  from '../commandes/commandeView';


import { ProductServices  } from '../../services/products.service';
import { ContactService  } from '../../services/contacts.services';
import { DropdownModule } from '../../directives/typeScript/dropdown.module';

import { FormatStringToNumber   } from '../../helper';

//import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatDatepickerModule,
  MatListModule,
  MatNativeDateModule, 
  MatCardModule,
  MatInputModule,
  MatBadgeModule 
  } from '@angular/material';

  import { SpeedDialFabComponent } from '../../fabComponents/speed-dial-fab.component';
  import { ProductResolver } from './resolver';
 


@NgModule({
    declarations: [ 
        PanierListView,
        TotalPanierView, 
        ListeProductComponent,
        ListProduitView, 
        PaymentButtonView , 
        modalView, 
        ProductSerachView ,
        ValidateShoppingView ,
        CommandeView,
        SpeedDialFabComponent,
        FormatStringToNumber
    ],
    exports: [ 
        PanierListView, 
        TotalPanierView, 
        ListeProductComponent, 
        ListProduitView, 
        PaymentButtonView, 
        modalView ,
        ProductSerachView, 
        ValidateShoppingView,
        CommandeView,
        SpeedDialFabComponent,
        FormatStringToNumber
    ],
    imports: [ 
        CommonModule, 
        ModalModule, 
        FormsModule, 
        DropdownModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatDatepickerModule,
        MatListModule,
        MatNativeDateModule, 
        MatCardModule,
        MatInputModule,
        MatBadgeModule 
      
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers:[ ProductServices , ContactService ,ProductResolver ]
})
export class ProductModule{ }