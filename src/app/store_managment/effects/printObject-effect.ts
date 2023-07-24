import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map, mergeMap, switchMap, catchError, toArray } from 'rxjs/operators';
import { of } from 'rxjs';
import { 
    ImprimeContactListInPdfAction,
    ImprimeContactListInPdfResponseAction,
    ExportContactListInCsvAction,
    ExportContactListInCsvResponseAction,
    ResetPrintAction,
    PrintObjectActionTypes, 
    PrintObjectActions

} from '../../store_managment/actions/printObject-action';

import { Store, select } from '@ngrx/store';
import { State } from  '../../store_managment/reducers/index';
import { ContactService } from '../../services/contacts.services';
import { PrintObject }  from '../../models/printObject';

@Injectable()
export class PrintObjectEffects {
 
    imprimePdf$ = createEffect( () =>
        this.actions$.pipe(
            ofType(PrintObjectActionTypes.ImprimeContactListInPdfAction),
            tap( () => this.contactService.imprimeContactList().
                subscribe( response =>{
                    this.store.dispatch( new ImprimeContactListInPdfResponseAction({ printObject: response}))
                }),
                catchError(() => of(null))
            )  
        ),
       { dispatch: false }
    );

    exportCsv$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PrintObjectActionTypes.ExportContactListInCsvAction),
            tap( () => this.contactService.exportCsvfile().
                subscribe( response =>{
                    this.store.dispatch( new ExportContactListInCsvResponseAction({ printObject: response}))
                }),
                catchError(() => of(null))
            )  
        ),
        { dispatch: false }
    );

    resetPrintObject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PrintObjectActionTypes.ResetPrintAction),
            tap( /*(printObject) =>  new ResetPrintAction()*/)
        ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private contactService: ContactService,
        private store: Store<State>
    ) {}
}