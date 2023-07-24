import { Injectable } from '@angular/core';
import { Actions, createEffect,Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { tap, map, mergeMap, switchMap, catchError } from 'rxjs/operators';


import { 
    getAllContactAction,
    getContactByIdAction, 
    addContactAction, 
    updateContactAction, 
    deleteContactAction, 
    deleteContactsAction, 
    uploadFileToUrlAction, 
    listContactAction,
    ContactActionTypes, 
    ContactActions ,
    updateContactSuccessAction
} from '../../store_managment/actions/contacts-action';


import { Contact }  from '../../models/contact';
import { Store, select } from '@ngrx/store';
import { State } from  '../../store_managment/reducers/index';
import { ContactService } from '../../services/contacts.services';
import { GroupService } from '../../services/groupe.services';

@Injectable({providedIn: 'root'})
export class ContactsEffects {

   
    loadContacts$ = createEffect( () =>
        this.actions$.pipe(
            ofType<getAllContactAction>(ContactActionTypes.GetAllContactAction),
            mergeMap( () => this._contactService.getListContacts()
                .pipe(
                    map( response => this.store.dispatch( new listContactAction({ contacts: response["allcontact"] }))),
                    catchError(() => of(null))
                )
            )
        ),
        { dispatch: false }
    );

    updateContact$ = createEffect(() =>
        this.actions$.pipe(
            ofType<updateContactAction>(ContactActionTypes.UpdateContactAction),
            mergeMap(<Actions> (action)  => this._contactService.updateContact(action.payload.contact)
                .pipe(
                    map(contact => { 
                        console.log( contact , " respons effect side ")
                        this.store.dispatch( new updateContactSuccessAction({response: contact}));
                        //new updateContactAction({contact:action.payload.contact});
                    }),
                    catchError(() => of(null))
                )
            )
        ),
        { dispatch: false }
    );

    deleteContact$ = createEffect(() =>
        this.actions$.pipe(
            ofType<deleteContactAction>(ContactActionTypes.DeleteContactAction ),
            mergeMap(<Actions> (action) => this._contactService.deleteContact(action.payload.contact)
                .pipe(
                    map(contacts => {  new listContactAction({ contacts })}),
                    catchError(() => of(null))
                )
            )
        ),
        { dispatch: false }
    );

    deleteContacts$ = createEffect(() =>
        this.actions$.pipe(
            ofType<deleteContactsAction>(ContactActionTypes.DeleteContactsAction),
            mergeMap(<Actions> (action) => this._contactService.deleteContacts(action.payload.contactIds)
                .pipe(
                    map(contacts => {  new listContactAction({ contacts })}),
                    catchError(() => of(null))
                )
            )
        ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private _contactService: ContactService,
        private store: Store<State>
    ) {}
}