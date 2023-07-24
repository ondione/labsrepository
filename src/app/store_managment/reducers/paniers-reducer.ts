import { IPanierItem } from '../../models/PanierItem' ;
import { createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import { PanierActions, PanierActionTypes } from '../actions/panier-action';


export interface PanierState extends EntityState<IPanierItem> {
    allPanierLoaded:boolean;

}

export const adapter : EntityAdapter<IPanierItem> = createEntityAdapter<IPanierItem>();


export const initialPanierState: PanierState = adapter.getInitialState({
    allPanierLoaded: true
});

export function panierReducer(state = initialPanierState , action: PanierActions): PanierState {

    switch(action.type) {

        case PanierActionTypes.AddInShoppingAction:
            return adapter.addOne(action.payload.panier, state);
            
        case PanierActionTypes.RemoveInShoppingAction:
            return adapter.removeOne(action.payload.id, state);

        case PanierActionTypes.ListShoppingAction:
             return state;

        case PanierActionTypes.EmptyShoppingAction:
            return adapter.removeAll(state);

        case PanierActionTypes.AddManyInShoppingAction:
            return adapter.addMany(action.payload.panier, state);

        default: {
            return state;
        }

    }
}


export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();











/* import { ContactActions, ContactAction} from '../actions/contacts-action';
import { contactType, IContactList }  from '../models/contacts';
import { Action } from 'redux';

const INITIAL_CONTACTS_STATE: IContactList = {
    contacts:[],
    contact:{},
    count:0,
    isadded:false,
    isdelete:false,
    isupdated:false
};

function fetContactAfterDeletion(state, action){
    return state.filter(contact => contact.id != action.payload);
}

function getPreviousContactState(state, action){
    let temporary = [];
    temporary.push(Object.assign({}, state, {  ...state, contacts: action.payload  }).contacts);
    return temporary;
}

function countStateContact(state){
    let stateContact =  Object.assign({}, state).contacts ;
    return stateContact.length;
}

export function createContacReducer( contacttype: contactType) {
    return function contactReducer(state: IContactList = INITIAL_CONTACTS_STATE, a: Action): IContactList {

        const action = a as ContactAction;
        if (!action.meta || action.meta.contactType !== contacttype) {
             return state;
        }
  
        switch (action.type) {
            case String(ContactActions.REQUEST_CONTACTS):
                return {
                    ...state,
                    contacts:null,
                    contact:{},
                    count:0,
                    isadded:false,
                    isdelete:false,
                    isupdated:false
                };
                
            case String(ContactActions.RECEIVE_CONTACTS):

                return {
                    ...state,
                    contacts: action.payload,
                    contact:{},
                    count:0,
                    isadded:false,
                    isdelete:false,
                    isupdated:false
                };
               
            case String(ContactActions.REQUEST_CONTACT):
                return {
                    ...state,
                    contacts:null,
                    contact: action.payload,
                    count:0,
                    isadded:false,
                    isdelete:false,
                    isupdated:false
                };
    
            case String(ContactActions.RECEIVE_CONTACT):
                return {
                    ...state,
                    contacts:null,
                    contact: action.payload,
                    count:0,
                    isadded:false,
                    isdelete:false,
                    isupdated:false
                };
    
            case String(ContactActions.RECEIVE_NUMBER_OF_CONTACTS):
                return {
                    ...state,
                    contacts:[],
                    contact: null,
                    count:countStateContact(state),
                    isadded:false,
                    isdelete:false,
                    isupdated:false
                };
    
            case String(ContactActions.REQUEST_ADD_CONTACT):
                return {
                    ...state,
                    contacts: null,
                    contact: action.payload,
                    count:0,
                    isadded:false,
                    isdelete:false,
                    isupdated:false
                };
               
            case String(ContactActions.RECEIVE_ADD_CONTACT): 
                return {
                    ...state,
                    contacts: getPreviousContactState(state, action.payload),
                    contact: {},
                    count: countStateContact(state),
                    isadded: true,
                    isdelete:false,
                    isupdated:false
                };
    
            case String(ContactActions.REQUEST_DELETE_CONTACT):
                return {
                    ...state,
                    contacts: [],
                    contact: action.payload,
                    count:0,
                    isadded: false,
                    isdelete:false,
                    isupdated:false
                };
               
            case String(ContactActions.RECEIVE_DELETE_CONTACT):

                return {
                    ...state,
                    contacts: fetContactAfterDeletion(state, action.payload),
                    contact: null,
                    count: countStateContact(state),
                    isadded: false,
                    isdelete:true,
                    isupdated:false
                };
        
            case String(ContactActions.REQUEST_UPDATE_CONTACT):
                return {
                    ...state,
                    contacts:null,
                    contact: action.payload,
                    count: countStateContact(state),
                    isadded: false,
                    isdelete:true,
                    isupdated:false
                };
               
            case String(ContactActions.RECEIVE_UPDATE_CONTACT):
                return {
                    ...state,
                    contacts: getPreviousContactState(state, action.payload),
                    contact: null,
                    count: countStateContact(state),
                    isadded: false,
                    isdelete:true,
                    isupdated:true
                };
    
            case String(ContactActions.RESET_CONTACTS):
                return {
                    ...state,
                    contacts: [],
                    contact: null,
                    count: 0,
                    isadded: false,
                    isdelete:false,
                    isupdated:false
                };
    
            default:
                return state;
        }
    }
}

/*function fetContactAfterDeletion(state, action){

    return state.filter(contact => contact.id != action.contact);
}

export default (state = InitilizeState.contacts, action: ContactAction = {type:"?"}) => {

    function indexOf(id: number) {
        return state.findIndex((contact) => contact.id === action.contact.id);
    }
    switch (action.type) {
        case String(ContactActions.REQUEST_CONTACTS):
            return {...state, isFetchingContacts: true};

        case String(ContactActions.RECEIVE_CONTACTS):
            return {...state, isFetchingContacts: false, list: action.contacts};

        case String(ContactActions.REQUEST_CONTACT):
            return {...state, isFetchingContact: true};

        case String(ContactActions.RECEIVE_CONTACT):
            return {...state, isFetchingContact: false, currentContact: action.contact};

        case String(ContactActions.RECEIVE_NUMBER_OF_CONTACTS):
            return {...state, count: action.count};

        case String(ContactActions.CURRENT_CONTACT):
            return {...state, current: action.currentIndex};

        case String(ContactActions.REQUEST_ADD_CONTACT):
           return { ...state, newContact: action.contact}
           
        case String(ContactActions.RECEIVE_ADD_CONTACT):
           return { ...state, isadded: action.isadded }

        case String(ContactActions.REQUEST_DELETE_CONTACT):
           return { ...state, newContact: action.contact}
           
        case String(ContactActions.RECEIVE_DELETE_CONTACT):
           return { ...state, list: fetContactAfterDeletion(state, action) }

        case String(ContactActions.REQUEST_UPDATE_CONTACT):
           return { ...state, updateContact: action.contact}
           
        case String(ContactActions.RECEIVE_UPDATE_CONTACT):
           return { ...state, isupdated: action.isupdated }



        case String(ContactActions.RESET_CONTACTS):
           return { ...state, list: null }

        default:
            return state;
    }
};

export const currentContactSelector = state => state.contacts.currentContact
export const ContactsCountSelector = state => state.contacts.count
export const isFetchingContactSelector = state => state.contacts.isFetchingContacts
export const contactList = state => state.contacts.list
export const isContactAdd = state => state.contacts.isadded
export const isUpdated = state => state.contacts.isupdated

*/ 


/* import {  PanierAction, PanierActions }  from   '../actions/panier-action';
import { panierType, IPanierItem , IPanierList } from '../models/PanierItem';
import { Action } from 'redux';
import * as Immutable from 'immutable'; 

//import { List } from 'immutable'; 


const  init_state  =  Immutable.Map({
    panierApp: [],
    total:0,
    nbre_items:0,
    isadded:false,
    isdelete:false,
    isupdated:false
});

//let temporary$$ = [];

function getPreviousPanierState(state, action){
   
  // console.log(Object.assign({}, state.panierApp), " before copy state");

    return Object.assign({},state,{ panierApp:[...state.panierApp , action.payload ] });

   // console.log(Object.assign({}, state.panierApp), " after copy state");
  
   // return temporary$$;
}

export function createPanierItemReducer( paniertype: panierType) {
    return function panierReducer( state = init_state , a: Action) :IPanierList{
      
        const action = a as PanierAction;
        if (!action.meta || action.meta.paniertype !== paniertype) {
            return Immutable.fromJS(state).toJS();
        }

        //console.log(state, " state ");
             
        switch(action.type){
        
            case String(PanierActions.REQUEST_ADD_INSHOPPING):

            //return  Immutable.fromJS(getPreviousPanierState(state, action)).toJS();

           // return getPreviousPanierState(state, action);
           
   console.log(Immutable.fromJS(state).toJS().panierApp, " previous") ;
        
            return Immutable.fromJS(

                Object.assign({}, ...state.toJS() , {
                    panierApp: [action.payload],
                    total:0,
                    nbre_items:0,
                    isadded:false,
                    isdelete:false,
                    isupdated:false
                })
            ).toJS();

              
                
            case String(PanierActions.RECEIVE_ADD_INSHOPPING):
                return Immutable.fromJS(state);

            case String(PanierActions.REQUEST_LIST_SHOPPING):
                return Immutable.fromJS(state);

            case String(PanierActions.RECEIVE_LIST_SHOPPING):
                return Immutable.fromJS(state);

            case String(PanierActions.REQUEST_REMOVE_INSHOPPING):

                // return state.toJS().delete(state.indexOf(action.payload));
                return Immutable.fromJS(state).filter(item => { return item.ref !== action.payload })

            case String(PanierActions.RECEIVE_REMOVE_INSHOPPING):
                return Immutable.fromJS(state);
            
            default:
                return Immutable.fromJS(state);
        }
    }
}

// import {fromJS } from 'immutable';

    const temporaryShopping = [];
    //import { PanierItem } from '../models/PanierItem';
    export const paniers = {
        panierApp:[]
    }

//function getPreviousShopping(state, action){
//    temporaryShopping.push(Object.assign({}, state, {  ...state, shopping: action.product  }).shopping);
//    return temporaryShopping;
// }

function getShoppingAfterDeletion(action){
   return  temporaryShopping.filter(prod => prod.ref!= action.product.ref);
}

export default ( state = [], action: PanierAction = {type:"?"}) => {

    switch(action.type){

        case String(PanierActions.REQUEST_ADD_INSHOPPING):
            return state.toJS().push(action.product) ;

        case String(PanierActions.RECEIVE_ADD_INSHOPPING):
           return { ...state, incard: true};

        case String(PanierActions.REQUEST_LIST_SHOPPING):
           return { ...state, isfetchable: true };

        case String(PanierActions.RECEIVE_LIST_SHOPPING):
       
        return { ...state, listshopping: true };

        case String(PanierActions.REQUEST_REMOVE_INSHOPPING):
           return { ...state, todelete:action.product};

        case String(PanierActions.RECEIVE_REMOVE_INSHOPPING):
           return { ...state, shopping:getShoppingAfterDeletion(action)};

        case String(PanierActions.REQUEST_EMPTY_SHOPPING):
           return { ...state, shopping:null};

        default:
           return state.toJS();
    }
};

export const shoppingList = state => state.panierApp.shoppingList;
export const addTocard    = state => state.panierApp.incard;

*/


 