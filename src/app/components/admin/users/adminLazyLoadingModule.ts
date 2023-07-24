

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from '../admin';
import { UsersComponent } from './add/users.component';
import { UserEditComponent } from './edit/user.edit.component';
import { ListeUserComponent } from './list/listeUser.component';
import { UserPermissionComponent } from './permissions/user_permission'; 
import { AuthGuard, RoleGuard } from '../../../app.guard';
import { PageNotFoundAdmin } from '../PageNotFoundAdmin';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate:[RoleGuard] , data :{  role : 'admin' } },
  { path: 'adduser', component: UsersComponent },
  { path: 'listeusers', component: ListeUserComponent,canActivate: [AuthGuard]  },
  { path: 'user/:id', component: UserEditComponent, canActivate: [AuthGuard]},
  { path: 'permissions/:id',component : UserPermissionComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AdminLazyLoadingModule {}