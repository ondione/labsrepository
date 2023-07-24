import {createFeatureSelector, createSelector} from '@ngrx/store';

import {PanierState} from '../reducers/paniers-reducer';
import * as fromPanier from '../reducers/paniers-reducer';

export const selectPanierState = createFeatureSelector<PanierState>("panier");

export const selectPanierItem = createSelector(
    selectPanierState,
    fromPanier.selectAll
);

export const selectAllPanier = createSelector(
    selectPanierState,
    PanierState => PanierState.entities
);

export const nbreTotalPanier = createSelector(
    selectPanierItem,
    panier => panier.filter(panier => panier.ref).length
);












