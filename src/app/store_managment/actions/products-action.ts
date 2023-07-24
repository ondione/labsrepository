import { Action } from '@ngrx/store';
import { Produits }   from '../../models/produits';
import { Update } from '@ngrx/entity';

export enum ProductActionTypes{
    AddProductAction    = '[Add Product] Action',
    UpdateProductAction = '[Update Product] Action',
    DeleteProductAction = '[Delete Product] Action',
    ListProductAction   = '[List Product] Action',
    SelectByIdAction    = '[List One Product] Action',
    SearchProductAction = '[Search Product] Action'
}

export class AddProductAction implements Action {
    readonly type = ProductActionTypes.AddProductAction;
    constructor(public payload: { product: Produits}) { }
}

export class UpdateProductAction implements Action {
    readonly type = ProductActionTypes.UpdateProductAction;
    constructor(public payload: { product: Update<Produits>}) { }
}

export class DeleteProductAction implements Action {
    readonly type = ProductActionTypes.DeleteProductAction;
    constructor(public payload: {id: number}) { }
}

export class ListProductAction implements Action {
    readonly type = ProductActionTypes.ListProductAction;
    constructor(public payload: {products: Produits[]}) { }
}

export class SelectByIdAction implements Action {
    readonly type = ProductActionTypes.SelectByIdAction;
    constructor(public payload: {id: number}) { }
}

export class SearchProductAction implements Action {
    readonly type = ProductActionTypes.SearchProductAction;
    constructor(public payload: {categorie:string, search: string}) { }
}

export type ProductActions = AddProductAction    | 
                             UpdateProductAction | 
                             DeleteProductAction |
                             ListProductAction   |
                             SelectByIdAction    |
                             SearchProductAction