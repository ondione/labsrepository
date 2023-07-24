import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFound }  from './components/PageNotFound';
import { LoginComponent }  from './components/users/LoginComponent'; 
import { ChangePass }  from './components/users/changePassword'; 
import { LogoutComponent }  from './components/users/logout'; 
import { AppHeader }  from './app.header'; 
import { AuthGuard } from  './app.guard';
import { GroupAddComponent } from './components/groupes/group-add/group-add.component'; 
import { GroupEditComponent } from './components/groupes/group-edit/group-edit.component';
import { GroupListComponent } from './components/groupes/group-list/group-list.component'; 
import { ParametrageComponent } from './components/parametrage/parametrage.component'; 
import { ListeProductComponent } from './components/products/listProducts.component';
import { ContactLazyLoadingModule }  from './components/contacts/contactLazyLoadingModule'; 

import { HomeComponent  } from './home';
import { ProductResolver } from './components/products/resolver';
import { ParametresGlobalComponent } from './components/parametrage/parametresGlobal'; 

import { LockScreenComponent }  from './components/LockScreenComponent';
import { GraphComponent} from './components/charts/graph';

import { ListeCommandeComponent }  from './components/commandes/listeCommandeComponent'; 

import { environment } from '../environments/environment';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'groupes', component: GroupListComponent , canActivate: [AuthGuard]},
  { path: 'addGroup', component: GroupAddComponent , canActivate: [AuthGuard]},
  { path: 'editGroup/:id', component: GroupEditComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent },
  { path: 'changepass', component: ChangePass, canActivate: [AuthGuard] },
  { path: 'settings', component: ParametrageComponent,  canActivate: [AuthGuard],
      children:[
        { 
          path: 'paramGeneral', 
          component: ParametresGlobalComponent , 
          canActivate: [AuthGuard]
        },
        { 
          path: '', 
          component: ParametresGlobalComponent , 
          canActivate: [AuthGuard]
        }
      ]
  },
 
  { path: 'products', 
    component: ListeProductComponent, 
    canActivate: [AuthGuard] ,
    runGuardsAndResolvers: 'always', 
    resolve: {
      test: ProductResolver 
    }
  },
  { path: 'charts', component: GraphComponent , canActivate: [AuthGuard]},
  { path: 'LockScreenPage', component: LockScreenComponent },
  { path: 'commandes', component: ListeCommandeComponent },
  { path: 'products/commande/:id', component: ListeProductComponent },
  { 
     path: 'listeFactures', 
     loadChildren:() => import('./components/factures/factureRouting').
     then(m => m.factureLazyLoadingModule) 
  },

  { path:'contacts', loadChildren: () => import('./components/contacts/contactLazyLoadingModule').
    then( m => m.ContactLazyLoadingModule ) 
  },
  { path: '**', component: PageNotFound },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' , enableTracing: false , useHash:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
