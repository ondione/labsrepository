import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, APP_INITIALIZER, LOCALE_ID} from '@angular/core';
//import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule }  from '@angular/router';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialDesignModule }  from './shared/materialModule';
import { BootstrapModule }  from './shared/boostrapModule';

import { AdminModule } from  './components/admin/users/admin.module';
import { AdminProductModule }  from './components/admin/produits/adminProductModule';
import { JwtModule , JwtHelperService , JWT_OPTIONS} from '@auth0/angular-jwt';
import { ContactLazyLoadingModule }  from './components/contacts/contactLazyLoadingModule'; 
import { AdminLazyLoadingModule } from './components/admin/users/adminLazyLoadingModule';
import { ProductLazyLoadingModule } from './components/admin/produits/adminProductLazyLoading';
import { factureLazyLoadingModule }  from './components/factures/factureRouting'; 
import { ProductModule }  from './components/products/productModule';

import {  
  AppSettingService, 
  ContactService, 
  ProductServices, 
  CommandeService , 
  TranslationService ,
  sharedService,
  FactureService,
  GroupService,
  AuthentificationService,
  InterceptService
} from './services/index';
import { AppComponent } from './app.component';
import { AppHeader }  from './app.header';

import { PageNotFound }  from './components/PageNotFound';
import { LockScreenComponent }  from './components/LockScreenComponent';
//import { modalTemplate  }  from './components/helpers/modal/modal_template';
import { LoginComponent }  from './components/users/LoginComponent'; 
import { ChangePass }  from './components/users/changePassword'; 
import { LogoutComponent }  from './components/users/logout'; 
//import { ModalTemplateComponent } from './utilities/modal_template';
import { AuthGuard, RoleGuard} from  './app.guard';
import { HomeComponent } from './home';
import { 
  EqualValidator,
  MyDirective, 
  PhoneNumberPipe,
  FirstLetterUpperCase, 
  FormatStringToNumber, 
  KeysPipe, 
  EmptyInputDirective,
  CustomerFilterContact
}  from './helper';

import { GroupEditComponent } from './components/groupes/group-edit/group-edit.component';
import { GroupAddComponent } from './components/groupes/group-add/group-add.component';
import { GroupListComponent } from './components/groupes/group-list/group-list.component';
import { FactureComponent } from './components/factures/factureComponent';
import { ListeFacture } from './components/factures/listeFacture';
import { DetailFactureComponent } from './components/factures/detailFacture';
import { AdminComponent }  from './components/admin/admin';
import { showAlertComponent }  from './modal/showAlertComponent';
import { ListeCommandeComponent } from './components/commandes/listeCommandeComponent';

import { StoreModule, ActionReducer, MetaReducer} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterStateSerializer, StoreRouterConnectingModule } from "@ngrx/router-store";
/** custom Reducers */
import { contactReducer } from './store_managment/reducers/contacts-reducer';
import { PrintReducer   } from './store_managment/reducers/printObject-reducer';
import { GroupReducer } from './store_managment/reducers/groups-reducer';
import { panierReducer } from './store_managment/reducers/paniers-reducer';
import { productReducer } from './store_managment/reducers/products-reducer';
import { AppSettingsReducer } from './store_managment/reducers/appSettings-reducer';
import { authReducer } from './store_managment/reducers/user-reducers';
/** fin  **/

import { reducers, State } from './store_managment/reducers/index';
import { EffectsModule } from '@ngrx/effects';
import { 
  ContactsEffects, 
  PrintObjectEffects, 
  GroupsEffects, 
  AppSettingsEffects,
  UserAuthEffects, 
} from './store_managment/effects/index';

// All imports
import { syncStoreWithStorage, NgrxStorePersistConfiguration } from './store_managment/reducers/persistStore';
import { ParametrageComponent } from './components/parametrage/parametrage.component';
import { ParametresGlobalComponent } from './components/parametrage/parametresGlobal'; 

import { CustomSerializer }  from './shared/utils';
import { environment } from '../environments/environment';

import { Store } from '@ngrx/store';
import { addAppSettingsAction } from './store_managment/actions/appSettings-action';

import { storageSyncMetaReducer } from 'ngrx-store-persist';
import { AppRoutingModule } from './app-routing.module';
import { NgrxRouterStoreModule } from './store_managment/routers/storeRouterModule';
import { Router }  from '@angular/router';
import { getMergedRoute } from './store_managment/routers/storeRouteSelector';

import { AgmCoreModule } from '@agm/core';


import { GoogleChart } from './components/charts/googleChartsDirectives';
import { GraphComponent } from './components/charts/graph';

//translation
//import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
//import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
/*export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}*/

const configuration: NgrxStorePersistConfiguration = {
  key: 'APP_KEY',
  storage: sessionStorage,
  afterInit: (state, action) => {
  }
};

export function AppInit(appsSetting: AppSettingService, translationServ: TranslationService){
  return async () => await appsSetting.getSetting().subscribe( response =>{
    translationServ.loadTranslation();
  });
}

export function getToken(sharedService:sharedService){
  return async () => await sharedService.getUserToken().subscribe( response =>{
    return response;
  });
}

function storePersist(reducer: ActionReducer<any>): ActionReducer<any> {
  return syncStoreWithStorage(configuration)(reducer);
}
const metaReducers: MetaReducer<State>[] = [storePersist];



@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    AppHeader,
    //AdminComponent,
    PageNotFound,
    //modalTemplate,
    LogoutComponent,
    HomeComponent,
    //ModalTemplateComponent,
    EqualValidator,
    MyDirective,
    PhoneNumberPipe,
    FirstLetterUpperCase,
    KeysPipe,
    EmptyInputDirective,
    CustomerFilterContact,
    ChangePass,
    GroupEditComponent,
    GroupAddComponent,
    GroupListComponent,
    ParametrageComponent,
    ParametresGlobalComponent,
    showAlertComponent,
    LockScreenComponent,
    GoogleChart,
    GraphComponent,
    ListeCommandeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    BootstrapModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ProductModule, 
    AdminModule,
    StoreModule.forFeature('contact', contactReducer),
    StoreModule.forFeature('printObject', PrintReducer),
    StoreModule.forFeature('group', GroupReducer),
    StoreModule.forFeature('panier', panierReducer),
    StoreModule.forFeature('product', productReducer),
    StoreModule.forFeature('appSetting', AppSettingsReducer),
    StoreModule.forFeature('auth', authReducer),
    //StoreModule.forRoot(reducers, { metaReducers }), // persist without indexdb
    StoreModule.forRoot(reducers, { metaReducers: [storageSyncMetaReducer] }), // persist with indexdb
    EffectsModule.forRoot([
      UserAuthEffects, 
      ContactsEffects, 
      PrintObjectEffects, 
      GroupsEffects, 
      AppSettingsEffects
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    NgrxRouterStoreModule,
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB0D_5re4Me94c7rsJwyL3tmpHNNWcHxiA',
      libraries: ['geometry','places']
    }),
    JwtModule
  ],
  providers: [
    ContactService,
    AuthentificationService,
    AuthGuard,
    RoleGuard,
    GroupService,
    ProductServices,
    AppSettingService,
    CustomerFilterContact,
    FirstLetterUpperCase, 
    InterceptService,
    CommandeService ,
    TranslationService,
    sharedService,
    FactureService,
    { provide: APP_INITIALIZER, useFactory: AppInit, deps: [ AppSettingService, TranslationService], multi: true  },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true },
    JwtHelperService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA],
  bootstrap: [LoginComponent]
})
export class AppModule { 
  constructor(private store: Store<State>, private route:Router){
    this.store.dispatch(new addAppSettingsAction());
  }
}
