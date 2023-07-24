import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProductState} from '../reducers/products-reducer';
import * as fromProduct from '../reducers/products-reducer';
import { State } from '../reducers/index';
import { Produits }from '../../models/produits';

export const selectProductState = createFeatureSelector<ProductState>("product");
export const selectContactById = (ref:number) => createSelector(selectProductState, ProductState => ProductState.entities[ref]);
export const selectAllProducts = createSelector(selectProductState, ProductState => ProductState.entities);
export const selectAllFromreducer = createSelector(selectProductState,fromProduct.selectAll);


export const productData   = ( state: ProductState ) => state.entities;
export const searchProduct = ( categorie :string , search:string ) => createSelector (
    selectProductState,
    selectProductState => Object.values(selectProductState.entities).filter( prod => { 

        categorie = categorie.toLowerCase();
        search = search.toLowerCase();
        console.log( selectProductState.entities , " ProductState");
        console.log( categorie , search , " categorie search");

        if(categorie && search ){
            return  prod.categorie.toLowerCase() == categorie && prod.libelle.toLowerCase().includes(search)
        }else if(categorie && !search){
            return  prod.categorie.toLowerCase() == categorie
        }else if(search && !categorie){
            return prod.libelle.toLowerCase().includes(search)
        } else{
            return productData;
        }
    })
);



export const nbreTotalProducts= createSelector(
    selectAllProducts,
    nbre => selectAllProducts.length
);









