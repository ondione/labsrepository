

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule }  from '@angular/common';
import { FormsModule , ReactiveFormsModule }      from '@angular/forms';
import { MaterialDesignModule }  from '../../shared/materialModule';

import { FactureComponent } from './factureComponent';
import { ListeFacture } from './listeFacture';
import { DetailFactureComponent } from './detailFacture';

const routes: Routes = [
    { path: '', component: ListeFacture},
    { path: 'facture/:id', component: DetailFactureComponent },
    { path: 'newFacture', component: FactureComponent },
];

@NgModule({
  imports: [
    FormsModule,  
    ReactiveFormsModule,
    CommonModule, 
    MaterialDesignModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: [ListeFacture, DetailFactureComponent, FactureComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ListeFacture]
})
export class factureLazyLoadingModule {}