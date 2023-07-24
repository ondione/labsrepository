

import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule }  from '@angular/common';
import { FormsModule }      from '@angular/forms';

import { ContactList }  from './contacts-list';
import { ContactAdd }  from './contact-add';
import { ContactDetail }  from './contact-detail'; 

import { AchatClient } from './achat';
import { DetailClient } from './detailClient';
//import { MapComponent } from './geolocalization/mapComponent';
//import { CustomMapComponent } from './geolocalization/googleMapComponent';
import { AuthGuard  } from '../../app.guard';
import { MaterialDesignModule }  from '../../shared/materialModule';
import { customMatDialogComponent }  from '../../modal/customMatDialog';

const routes: Routes = [

  { path: '', component: ContactList },
  { path: 'newContact',  component: ContactAdd},
  { path: 'contact/:id', component: ContactDetail,
    children :[
      { path: 'detailClient', component: DetailClient },
      { path: 'achat', component: AchatClient },
      //{ path: '', outlet:'mapgoogle', component: MapComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule, 
    FormsModule, 
    CommonModule,
    MaterialDesignModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ContactList,
    ContactAdd, 
    ContactDetail, 
    DetailClient, 
    AchatClient,  
    customMatDialogComponent
  ],
  exports:[customMatDialogComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    ContactList, 
    customMatDialogComponent
  ]
})
export class ContactLazyLoadingModule {
  static entry = ContactList;
}