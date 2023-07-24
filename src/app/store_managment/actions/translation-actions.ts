import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Translation } from '../../models/translation';

export enum TranslationActionTypes {
    AddTranslationAction    = '[Add Translation] Action',
    UpdateTranslationAction = '[Update Translation] Action',
    DeleteTranslationAction = '[Delete Translation] Action',
    ListTranslationAction   = '[List Translation] Action',
    SelectTranslationIndexdAction   = '[Select Translation By Id ] Action',
    SearchTranslationsAction   = '[Search Translation ] Action',
}

export class AddTranslationAction implements Action {
    readonly type = TranslationActionTypes.AddTranslationAction;
    constructor(public payload: { translations: any[] }) { }
}

export class UpdateTranslationAction implements Action {
    readonly type = TranslationActionTypes.UpdateTranslationAction;
    constructor(public payload: { translation: Update<Translation>}) { }
}

export class DeleteTranslationAction implements Action {
    readonly type = TranslationActionTypes.DeleteTranslationAction;
    constructor(public payload: { id: number }) { }
}

export class ListTranslationAction implements Action {
    readonly type = TranslationActionTypes.ListTranslationAction;
    constructor(public payload: { translations: Translation[]}) { }
}

export class SelectTranslationByIdAction implements Action {
    readonly type = TranslationActionTypes.SelectTranslationIndexdAction;
    constructor(public payload: { translationid: string}) { }
}

export type TranslationActions = AddTranslationAction | UpdateTranslationAction | DeleteTranslationAction | ListTranslationAction 
