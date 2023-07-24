

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProduitsComponent } from './add/produits.component';
import { ListProduitWsComponent } from './list/list.component';
import { EditProduitComponent } from './edit/edit.component'; 
import { AuthGuard, RoleGuard } from '../../../app.guard';

const routes: Routes = [
    { path: 'addproduct', component: ProduitsComponent },
    { path: 'listproducts', component: ListProduitWsComponent},
    { path: 'product/:id', component: EditProduitComponent},
   
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductLazyLoadingModule {}