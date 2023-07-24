import { Produits } from '../../models/produits' ;
import { createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import { ProductActionTypes, ProductActions } from '../actions/products-action';

export interface ProductState extends EntityState<Produits> {
    allProductsLoaded:boolean;
}

export const adapter : EntityAdapter<Produits> = createEntityAdapter<Produits>();

export const initialProductState: ProductState = adapter.getInitialState({
    allProductsLoaded: true
});

export function productReducer(state = initialProductState , action: ProductActions): ProductState {

    switch(action.type) {
        case ProductActionTypes.AddProductAction:
            return adapter.addOne(action.payload.product, state);

        case ProductActionTypes.UpdateProductAction:
            return adapter.updateOne(action.payload.product, state);

        case ProductActionTypes.DeleteProductAction:
            return adapter.removeOne(action.payload.id , state);

        case ProductActionTypes.ListProductAction:
           return adapter.addAll(action.payload.products, state);
            
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



/* import { Action } from 'redux';
//import { ListeProductComponent } from '../components/productsComponent/listProducts.component';
import { ProductActions, ProduitAction } from '../actions/products-action';
import { IProduitList, produitType}  from '../models/produits';

export const INITILIZE_PRODUCT_STAT = {
    products:[],
    product:{},
    count:0,
    isadded:false,
    isdelete:false,
    isupdated:false
};
  
export function createProduitReducer( produitType: produitType) {
    return function produitReducer(state: IProduitList = INITILIZE_PRODUCT_STAT, a: Action): IProduitList {

        const action = a as ProduitAction;
        if (!action.meta || action.meta.produitType !== produitType) {
                return state;
        }

        switch(action.type){
            
            case String(ProductActions.REQUEST_PRODUCTS):
                return { 
                    ...state ,
                    products: action.payload,
                    product:{},
                    count:0,
                    isadded:false,
                    isdelete:false,
                    isupdated:false
                };

            case String(ProductActions.RECEIVE_PRODUCTS):
                return { 
                    ...state ,
                    products: action.payload,
                    product:{},
                    count:0,
                    isadded:false,
                    isdelete:false,
                    isupdated:false
                };

            case String(ProductActions.REQUEST_PRODUCT):
                return { 
                    ...state ,
                    products:state.products,
                    product:{},
                    count:0,
                    isadded:false,
                    isdelete:false,
                    isupdated:false
                };

            case String(ProductActions.REQUEST_ADD_PRODUCT):
                return { 
                    ...state ,
                    products: null,
                    product: action.payload,
                    count:0,
                    isadded:false,
                    isdelete:false,
                    isupdated:false
                };

            case String(ProductActions.RECEIVE_ADD_PRODUCT):
                return { 
                    ...state ,
                    products:state.products,
                    product:{},
                    count:0,
                    isadded:true,
                    isdelete:false,
                    isupdated:false
                };
            default:
                return state;
        }
    }
}

// Basic reducer logic.
/*(export const ProductComponentReducer: Reducer<any> = (state: any = {}, action: Action): {} => ({
  ...state,
    products: produitsReducer(state.tickets, action),
});
*/


/*import { ProductActions , ProductAction }  from   '../actions/products-action';

export default ( state=[], action: ProductAction = {type:"?"}) => {

    switch(action.type){

        case String(ProductActions.REQUEST_PRODUCTS):
           return { ...state , isfetchingProducts: true };

        case String(ProductActions.RECEIVE_PRODUCTS):
           return { ...state, listproduct: action.products};

        case String(ProductActions.REQUEST_PRODUCT):
           return { ...state, product: action.product };

        case String(ProductActions.REQUEST_ADD_PRODUCT):
           return { ...state, newProduct: action.product };

        case String(ProductActions.RECEIVE_ADD_PRODUCT):
           return { ...state, isadded: action.isadded}
        default:
           return state;
    }
};

export const productList = state =>  state.products.listproduct;
export const productAdded = state => state.products.isadded;
*/
