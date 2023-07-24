import { createFeatureSelector, createSelector} from '@ngrx/store';
import { PrintState  } from '../reducers/printObject-reducer';


export const selectPrintState = createFeatureSelector<PrintState>("printObject");
export const imprimeData      = createSelector( selectPrintState, PrintState => PrintState.entities );
export const selectAll   = (id:number) => createSelector( selectPrintState, PrintState => PrintState.entities[id] );