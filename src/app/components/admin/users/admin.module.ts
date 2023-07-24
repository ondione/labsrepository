import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule }      from '@angular/forms';


import { UsersComponent } from './add/users.component';
import { UserEditComponent } from './edit/user.edit.component';
import { ListeUserComponent } from './list/listeUser.component';
import { UserPermissionComponent } from './permissions/user_permission'; 
import { AdminComponent } from '../admin'; 
import {PageNotFoundAdmin } from '../PageNotFoundAdmin';

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
import { AuthentificationService } from '../../../services/index';
import { AdminLazyLoadingModule } from './adminLazyLoadingModule';

 
@NgModule({
    declarations:[ PageNotFoundAdmin, AdminComponent,UsersComponent, UserEditComponent,ListeUserComponent, UserPermissionComponent],
    exports:[ PageNotFoundAdmin, AdminComponent,UsersComponent, UserEditComponent,ListeUserComponent, UserPermissionComponent],
    imports:[ 
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule, 
        AdminLazyLoadingModule,
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
    providers:[ AuthentificationService],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AdminModule{}