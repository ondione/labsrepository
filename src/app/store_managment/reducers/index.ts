import { routerReducer } from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { contactReducer, ContactState } from '../reducers/contacts-reducer';
import { PrintReducer, PrintState } from '../reducers/printObject-reducer';
import { GroupReducer, GroupState } from '../reducers/groups-reducer';
import { productReducer, ProductState } from '../reducers/products-reducer';
import { panierReducer, PanierState } from '../reducers/paniers-reducer';
import { translationReducer, TranslationState } from '../reducers/translation-reducer';
import { AppSettingsReducer, AppSettingState } from '../reducers/appSettings-reducer';
import { authReducer, AuthState } from '../reducers/user-reducers';
import { storeFreeze } from 'ngrx-store-freeze';


export interface State {
  auth: AuthState,
  contact: ContactState,
  printObject: PrintState,
  group: GroupState,
  panier: PanierState,
  product: ProductState,
  translation: TranslationState,
  appSetting: AppSettingState
}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer,
  contact: contactReducer,
  printObject:PrintReducer,
  group:GroupReducer,
  panier: panierReducer,
  product: productReducer,
  translation: translationReducer,
  appSetting: AppSettingsReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];


