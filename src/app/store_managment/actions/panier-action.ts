import { Action } from '@ngrx/store';
import { IPanierItem }   from '../../models/PanierItem';

export enum PanierActionTypes {
    AddInShoppingAction = '[Add In Shopping ] Action',
    RemoveInShoppingAction = '[Remove In Shopping ] Action',
    EmptyShoppingAction = '[Empty Shopping] Action',
    ListShoppingAction = '[List Shopping] Action',
    AddManyInShoppingAction = '[Add Many Shopping] Action',
    UpdateShoppingAction = '[Update all Shopping item] Action'
}

export class AddInShoppingAction implements Action {
    readonly type = PanierActionTypes.AddInShoppingAction;
    constructor(public payload: { panier: IPanierItem}) { }
}

export class RemoveInShoppingAction implements Action {
    readonly type = PanierActionTypes.RemoveInShoppingAction;
    constructor(public payload: { id: number}) { }
}

export class EmptyShoppingAction implements Action {
    readonly type = PanierActionTypes.EmptyShoppingAction;
}

export class ListShoppingAction implements Action {
    readonly type = PanierActionTypes.ListShoppingAction;
}

export class AddManyInShoppingAction implements Action {
    readonly type = PanierActionTypes.AddManyInShoppingAction;
    constructor(public payload: { panier: any[] }) { }
}

export class UpdateShoppingAction implements Action {
    readonly type = PanierActionTypes.UpdateShoppingAction;
    constructor(public payload: { panier: any[] }) { }
}

export type PanierActions = AddInShoppingAction    | 
                            RemoveInShoppingAction | 
                            EmptyShoppingAction    |
                            ListShoppingAction     |
                            AddManyInShoppingAction |
                            UpdateShoppingAction






/* import { Injectable } from "@angular/core";
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { IPanierItem, panierType  } from '../models/PanierItem';
import 'rxjs/add/operator/map';

// Flux-standard-action gives us stronger typing of our actions.
type Payload = IPanierItem[];
interface MetaData { paniertype: panierType; };
export type PanierAction = FluxStandardAction<Payload,MetaData>;


@Injectable()
export class PanierActions  {

    static REQUEST_ADD_INSHOPPING = 'REQUEST_ADD_INSHOPPING';
    static RECEIVE_ADD_INSHOPPING = 'RECEIVE_ADD_INSHOPPING';

    static REQUEST_LIST_SHOPPING = 'REQUEST_LIST_SHOPPING';
    static RECEIVE_LIST_SHOPPING = 'REQUEST_LIST_SHOPPING';

    static REQUEST_EMPTY_SHOPPING = 'REQUEST_EMPTY_SHOPPING';
    static RECEIVE_EMPTY_SHOPPING = 'RECEIVE_EMPTY_SHOPPING';

    static REQUEST_REMOVE_INSHOPPING = 'REQUEST_REMOVE_INSHOPPING';
    static RECEIVE_REMOVE_INSHOPPING = 'RECEIVE_REMOVE_INSHOPPING';


    @dispatch()
    requestAddShopping = ( paniertype: panierType, payload:Payload ): PanierAction => ({
        type: PanierActions.REQUEST_ADD_INSHOPPING,
        meta: { paniertype },
        payload
    });

    @dispatch()
    receiveAddShopping = ( paniertype: panierType ): PanierAction => ({
        type: PanierActions.RECEIVE_ADD_INSHOPPING,
        meta: { paniertype },
        payload:null                
    });

    @dispatch()
    requestDeleteInShopping = ( paniertype: panierType, payload:Payload ): PanierAction => ({
        type: PanierActions.REQUEST_REMOVE_INSHOPPING,
        meta:{ paniertype },
        payload              
    });

    @dispatch()
    receiveDeleteInShopping = ( paniertype: panierType, payload:Payload ): PanierAction => ({
        type: PanierActions.RECEIVE_REMOVE_INSHOPPING,
        meta:{ paniertype },
        payload                            
    });

    @dispatch()
    requestListShopping = ( paniertype: panierType, payload:Payload ): PanierAction => ({
        type: PanierActions.REQUEST_LIST_SHOPPING,
        meta:{ paniertype },
        payload                 
    });

    @dispatch()
    receiveListShopping = ( paniertype: panierType, payload:Payload ): PanierAction => ({
         type: PanierActions.RECEIVE_LIST_SHOPPING,
         meta:{ paniertype },
         payload     
    });

    @dispatch()
    resetShopping(){
        return {
            type: PanierActions.REQUEST_EMPTY_SHOPPING
        };
    }
}; */