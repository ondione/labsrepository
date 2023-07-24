import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup , FormControl,Validators, ReactiveFormsModule }      from '@angular/forms';

import { ProduitsComponent } from './add/produits.component';
import { ListProduitWsComponent } from './list/list.component';
import { EditProduitComponent } from './edit/edit.component'; 


import { FlexLayoutModule } from '@angular/flex-layout';
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
  MatCheckboxModule ,
  MatExpansionModule,
  MatGridListModule,
  MatSelectModule,
  MatFormFieldModule,
  MatRadioModule,
  MatTableModule,
  MatTreeModule,
  MatPaginatorModule,

} from '@angular/material';
import { ProductServices, AuthentificationService } from '../../../services/index';
import { ProductLazyLoadingModule } from './adminProductLazyLoading';

import { AdminModule } from '../users/admin.module';

 
@NgModule({
    declarations:[ProduitsComponent,ListProduitWsComponent,EditProduitComponent ],
    exports:[ProduitsComponent,ListProduitWsComponent,EditProduitComponent],
    imports:[ 
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule, 
        ProductLazyLoadingModule,
        AdminModule,
        FlexLayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatDatepickerModule,
        MatListModule,
        MatNativeDateModule, 
        MatCardModule,
        MatInputModule,
        MatCheckboxModule ,
        MatExpansionModule,
        MatGridListModule,
        MatSelectModule,
        MatFormFieldModule,
        MatRadioModule,
        MatTableModule,
        MatTreeModule,
        MatPaginatorModule
    ],
    providers:[ ProductServices, AuthentificationService],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AdminProductModule{}