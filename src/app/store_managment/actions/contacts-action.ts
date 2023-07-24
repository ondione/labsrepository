import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Contact }  from '../../models/contact';
import { PrintObject } from '../../models/printObject';

export enum ContactActionTypes {
    GetAllContactAction = '[get All Contact ] Action ',
    GetContactByIdAction   = '[get Contact By Id ] Action',
    AddContactAction    = '[Add Contact] Action',
    UpdateContactAction = '[Update Contact] Action',
    UpdateContactSuccessAction = '[Update Contact Success] Action',
    DeleteContactAction = '[Delete a Contact] Action',
    DeleteContactsAction = '[Delete Contacts] Action',
    AddContactToGroupAction = '[Add Contact to Group ] Action',
    ListContactOfGroupAction = '[List Contact of a Group ] Action',
    UploadFileToUrlAction = '[Upload Contact Photo ] Action',
    ListContactAction = '[List Contact] Action'
}

export class getAllContactAction implements Action {
   public readonly type = ContactActionTypes.GetAllContactAction;
}

export class getContactByIdAction implements Action {
    readonly type = ContactActionTypes.GetContactByIdAction;
    constructor(public payload: { contactid: number}) { }
}

export class addContactAction implements Action {
    readonly type = ContactActionTypes.AddContactAction;
    constructor(public payload: { contact: Contact}) { }
}

export class updateContactSuccessAction implements Action {
    readonly type = ContactActionTypes.UpdateContactSuccessAction;
    constructor(public payload: { response: Update<any>}) { }
}

export class updateContactAction implements Action {
    readonly type = ContactActionTypes.UpdateContactAction;
    constructor(public payload: { contact: Update<Contact>}) { }
}

export class deleteContactAction implements Action {
    readonly type = ContactActionTypes.DeleteContactAction;
    constructor(public payload: { contact: Contact}) { }
}

export class deleteContactsAction implements Action {
    readonly type = ContactActionTypes.DeleteContactsAction;
    constructor(public payload: { contactIds: string[] }) { }
}

export class addContactToGroupAction implements Action {
    readonly type = ContactActionTypes.AddContactToGroupAction;
    constructor(public payload:{ contactGrp: any }) { }
}

export class listContactOfGroupAction implements Action {
    readonly type = ContactActionTypes.ListContactOfGroupAction;
    constructor(public payload: { idGrp: number } ) { }
}

export class uploadFileToUrlAction implements Action {
    readonly type = ContactActionTypes.UploadFileToUrlAction;
    constructor(public payload: Object ) { }
}

export class listContactAction implements Action {
    readonly type = ContactActionTypes.ListContactAction;
    constructor(public payload: { contacts: any }) { }
}

export type ContactActions = getAllContactAction | getContactByIdAction | addContactAction | updateContactAction | updateContactSuccessAction | deleteContactAction | deleteContactsAction| addContactToGroupAction|
                            listContactOfGroupAction | uploadFileToUrlAction | listContactAction
                      

