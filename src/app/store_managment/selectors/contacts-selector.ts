import {createFeatureSelector, createSelector} from '@ngrx/store';
import { ContactState , getSelectedContacId } from '../reducers/contacts-reducer';
import * as fromContact from '../reducers/contacts-reducer';

export const selectContactsState = createFeatureSelector<ContactState>("contact");
export const selectContactById   = (contactid:number) => createSelector( selectContactsState, ContactState => ContactState.entities[contactid] );
export const selectAllContacts   = createSelector( selectContactsState, ContactState => ContactState.entities );
export const nbreTotalContact    = createSelector( selectContactsState, ContactState => ContactState.ids );
export const updatedContactResponse = () => createSelector( selectContactsState, ContactState => ContactState.responseUpdate );