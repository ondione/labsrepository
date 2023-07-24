
import { createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import { TranslationActionTypes , TranslationActions } from '../actions/translation-actions';
import { Translation } from '../../models/translation' ;

export interface TranslationState extends EntityState<Translation> {
    allTranslationLoaded:boolean;
}

export const adapter : EntityAdapter<Translation> = createEntityAdapter<Translation>();

export const initialTranslationState: TranslationState = adapter.getInitialState({
    allTranslationLoaded: true
});

export function translationReducer(state = initialTranslationState , action: TranslationActions): TranslationState {

    switch(action.type) {

        case TranslationActionTypes.AddTranslationAction:
            return adapter.addMany(action.payload.translations, state);

        case TranslationActionTypes.UpdateTranslationAction:
            return adapter.updateOne(action.payload.translation , state);

        case TranslationActionTypes.DeleteTranslationAction:
            return adapter.removeOne(action.payload.id , state);

        case TranslationActionTypes.ListTranslationAction:
            return adapter.addAll(action.payload.translations , state);

        default: {
            return state;
        }
    }
}

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();

 