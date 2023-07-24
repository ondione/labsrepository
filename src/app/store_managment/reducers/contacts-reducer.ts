
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Contact } from '../../models/contact' ;
import { ContactActionTypes , ContactActions } from '../actions/contacts-action';

export interface ContactState extends EntityState<Contact> {
    allContactsLoaded:boolean;
    selectedContactId:Contact;
    responseUpdate : any,
    responseAdded: any
}

export const adapter : EntityAdapter<Contact>  = createEntityAdapter<Contact>();

export const initialContactState: ContactState = adapter.getInitialState({
    allContactsLoaded: false,
    selectedContactId:null,
    responseUpdate : null,
    responseAdded: null
});

export function contactReducer(state = initialContactState , action: ContactActions): ContactState {
    switch(action.type) {

        case ContactActionTypes.AddContactAction:
            return adapter.addOne(action.payload.contact, state);

        case ContactActionTypes.UpdateContactAction:{
            const  { ids, entities, allContactsLoaded, ...rest  } = state;
            return adapter.updateOne(action.payload.contact , state);
        }

        case ContactActionTypes.UpdateContactSuccessAction:{
            const  { ids, entities, allContactsLoaded, ...rest  } = state;
            state.responseUpdate = action.payload.response; 
            return state;
        }
            
        case ContactActionTypes.DeleteContactAction:
            return adapter.removeOne(action.payload.contact.id , state);

        case ContactActionTypes.DeleteContactsAction:
            return adapter.removeMany(action.payload.contactIds, state);

        case ContactActionTypes.AddContactToGroupAction:
            return adapter.removeMany(action.payload.contactGrp, state);
                
        case ContactActionTypes.ListContactAction:{
            state.allContactsLoaded = true;
            return adapter.addAll(action.payload.contacts , state);
        }
    
        default: {
            return state;
        }
    }
}

export const getSelectedContacId = (state: ContactState) => state.selectedContactId; 
export const { selectAll, selectEntities, selectIds, selectTotal  } = adapter.getSelectors();
  // select the array of user ids
export const selectContactsIds = selectIds;
  // select the dictionary of user entities
export const selectContactsEntities = selectEntities;
  // select the array of users
export const selectAllContacts = selectAll;
  // select the total user count
export const selectContactsTotal = selectTotal;




