import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTranslation from '../reducers/translation-reducer';
import { TranslationState } from '../reducers/translation-reducer';


export const selectItemTranslateState = createFeatureSelector<TranslationState>("translation");

export const selectAllFromReducer = createSelector(
    selectItemTranslateState,
    fromTranslation.selectAll
);

export const selectTranslationById = (label:string) => createSelector(
    selectItemTranslateState,
    TranslationState => TranslationState.entities[label]
);

export const selectAllItems = createSelector(
    selectItemTranslateState,
    TranslationState => TranslationState.entities
);

export const selectDescriptionByIndex = (index:string) => createSelector(
    fromTranslation.selectAll,
    translations => translations.filter( (trans) => {
        return  trans.description[0] == index
    })
);




