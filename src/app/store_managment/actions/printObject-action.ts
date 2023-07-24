import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { PrintObject } from '../../models/printObject' ;

export enum PrintObjectActionTypes {
    ImprimeContactListInPdfAction = '[Request Imprime Contacts  PDF ] Action',
    ImprimeContactListInPdfResponseAction = '[Set Imprime PDF Data] Action',
    ExportContactListInCsvAction = '[Export Contacts List in Csv ] Action',
    ExportContactListInCsvResponseAction = '[Response Export Contacts List in Csv ] Action',
    ResetPrintAction = '[Clean Print Objet] Action'
}

export class ImprimeContactListInPdfAction implements Action {
    readonly type = PrintObjectActionTypes.ImprimeContactListInPdfAction;
}

export class ImprimeContactListInPdfResponseAction implements Action {
    readonly type = PrintObjectActionTypes.ImprimeContactListInPdfResponseAction;
    constructor(public payload:{ printObject: any}) { }
}

export class ExportContactListInCsvAction implements Action {
    readonly type = PrintObjectActionTypes.ExportContactListInCsvAction;
}

export class ExportContactListInCsvResponseAction implements Action {
    readonly type = PrintObjectActionTypes.ExportContactListInCsvResponseAction;
    constructor(public payload: { printObject: any} ) {}
}

export class ResetPrintAction implements Action {
    readonly type = PrintObjectActionTypes.ResetPrintAction;
}

export type PrintObjectActions = ResetPrintAction | ImprimeContactListInPdfAction| ExportContactListInCsvAction| ImprimeContactListInPdfResponseAction| ExportContactListInCsvResponseAction